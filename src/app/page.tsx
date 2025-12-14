"use client";

import { useState, useRef, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import ResponseDisplay from "@/components/ResponseDisplay";
import IntermediateDisplay from "@/components/IntermediateDisplay";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [intermediateData, setIntermediateData] = useState<any>(null);
  const [response, setResponse] = useState<string>("");
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (response && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [response]);

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setResponse(""); // Clear previous response
    setIntermediateData(null); // Clear previous intermediate data

    try {
      const res = await fetch("http://localhost:5678/webhook/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // The first endpoint returns the intermediate object
      const data = await res.json();
      console.log(data);
      setIntermediateData(data);

    } catch (error) {
      console.error("Upload failed:", error);
      setResponse(`Error: ${error instanceof Error ? error.message : "Upload failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    if (!intermediateData) return;

    setVerificationLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5678/webhook/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intermediateData),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const textData = await res.text();
      try {
        const jsonData = JSON.parse(textData);
        let csvContent = "";

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          // If it's an array, check the first element
          if (jsonData[0] && jsonData[0].csv) {
            csvContent = jsonData[0].csv;
          } else {
            csvContent = JSON.stringify(jsonData, null, 2);
          }
        } else if (jsonData && jsonData.csv) {
          // If it's an object, check the 'csv' key directly
          csvContent = jsonData.csv;
        } else {
          // Fallback: pretty print the JSON
          csvContent = typeof jsonData === 'object' ? JSON.stringify(jsonData, null, 2) : textData;
        }

        setResponse(csvContent);
      } catch {
        setResponse(textData); // Fallback if not valid JSON
      }

    } catch (error) {
      console.error("Verification failed:", error);
      setResponse(`Error: ${error instanceof Error ? error.message : "Verification failed"}`);
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <main className="page-container">
      {/* Background decoration */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="content-wrapper animate-fade-in">
        <div className="text-center">
          <h1 className="title-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
            Invoice Parser
          </h1>
          <p style={{ fontSize: '1.25rem' }}>
            Transform your PDF invoices into structured data instantly.
          </p>
        </div>

        <FileUpload onFileSelect={handleFileUpload} isLoading={loading} />

        <IntermediateDisplay
          data={intermediateData}
          onProceed={handleProceed}
          isLoading={verificationLoading}
        />

        <div ref={resultsRef}>
          <ResponseDisplay data={response} />
        </div>
      </div>
    </main>
  );
}
