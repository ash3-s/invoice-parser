"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import ResponseDisplay from "@/components/ResponseDisplay";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await fetch("http://localhost:5678/webhook-test/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      // Expecting a JSON response with a 'csv' field
      const textData = await res.text();
      try {
        const jsonData = JSON.parse(textData);
        if (jsonData.csv) {
          setResponse(jsonData.csv);
        } else {
          setResponse(textData); // Fallback if no csv key
        }
      } catch {
        setResponse(textData); // Fallback if not valid JSON
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setResponse(`Error: ${error instanceof Error ? error.message : "Upload failed"}`);
    } finally {
      setLoading(false);
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
        <ResponseDisplay data={response} />
      </div>
    </main>
  );
}
