"use client";

import { useState, useRef, ChangeEvent, DragEvent, useEffect } from "react";

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isLoading: boolean;
}

export default function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="glass-panel upload-area flex-center flex-col" style={{ padding: '3rem', minHeight: '300px' }}>
                {/* Static placeholder to prevent layout shift */}
            </div>
        );
    }

    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === "application/pdf") {
            setFileName(file.name);
            onFileSelect(file);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const onButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div
            className={`glass-panel upload-area flex-center flex-col ${dragActive ? "active" : ""
                } ${isLoading ? "disabled" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            style={{ padding: '3rem' }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                style={{ display: 'none' }}
                onChange={handleChange}
                disabled={isLoading}
            />

            {fileName ? (
                <div className="flex-col flex-center animate-fade-in">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon mb-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--primary)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <p style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--foreground)' }}>
                        {fileName}
                    </p>
                    <p className="mt-4" style={{ color: 'var(--primary)' }}>
                        {isLoading ? "Processing..." : "Ready to upload"}
                    </p>
                </div>
            ) : (
                <div className="flex-col flex-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon mb-4"
                        style={{ stroke: dragActive ? 'var(--primary)' : '#94a3b8', transition: 'stroke 0.3s' }}
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--foreground)' }}>
                        Drag & Drop PDF here
                    </p>
                    <p style={{ fontSize: '0.9rem' }}>
                        or <span className="button-link">browse file</span>
                    </p>
                </div>
            )}
        </div>
    );
}
