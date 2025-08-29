"use client";

import { useState, useRef, useEffect } from "react";

const ACCEPTED_DOC_TYPES = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt";
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export function DocumentUploadModal({
  buttonText = "Upload document",
  className,
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const inputRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setFile(null);
        setError("");
        setIsUploading(false);
        setUploadComplete(false);
      }
    }
    if (open) {
      window.addEventListener("keydown", onKeyDown);
      const id = requestAnimationFrame(() => closeBtnRef.current?.focus());
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        cancelAnimationFrame(id);
      };
    }
  }, [open]);

  function validateFile(f) {
    const ext = "." + (f.name.split(".").pop()?.toLowerCase() ?? "");
    const allowed = ACCEPTED_DOC_TYPES.replace(/\s/g, "").split(",");
    if (!allowed.includes(ext))
      return "Unsupported file type. Please upload a document file.";
    if (f.size > MAX_SIZE_BYTES)
      return "File is too large. Maximum size is 10MB.";
    return "";
  }

  function onSelected(f) {
    if (!f) {
      setFile(null);
      setError("");
      setIsUploading(false);
      setUploadComplete(false);
      return;
    }
    const err = validateFile(f);
    setError(err);
    setFile(err ? null : f);
    setIsUploading(false);
    setUploadComplete(false);
  }

  function onInputChange(e) {
    const f = e.target.files?.[0] ?? null;
    onSelected(f);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    onSelected(f);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  async function onUpload() {
    if (!file) return;

    setIsUploading(true);
    setUploadComplete(false);

    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);

      setTimeout(() => {
        setOpen(false);
        setFile(null);
        setError("");
        setUploadComplete(false);
      }, 2000);
    }, 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open document upload modal"
        className={`inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-5 text-base font-semibold text-white shadow-md cursor-pointer transition-all duration-150 hover:scale-105 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary/60 ${className}`}>
        {buttonText}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-doc-title"
          aria-describedby="upload-doc-description">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setFile(null);
              setError("");
              setIsUploading(false);
              setUploadComplete(false);
            }}
            aria-hidden="true"
          />

          <div
            className={`relative z-10 w-full max-w-lg rounded-xl border bg-white text-black p-8 shadow-2xl focus:outline-none flex flex-col max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <h2 id="upload-doc-title" className="text-2xl font-bold mb-2">
                Upload Document
              </h2>
              <p id="upload-doc-description" className="leading-relaxed">
                Choose a document to upload. Supported formats include PDF,
                Word, PowerPoint, Excel, and text files up to 10MB.
              </p>
            </div>

            <div className="space-y-6">
              <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    inputRef.current?.click();
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`rounded-lg border-2 border-dashed p-8 text-center cursor-pointer select-none transition-all duration-200 hover:border-primary hover:bg-primary/5 ${
                  isDragging
                    ? "border-primary bg-primary/10 scale-[1.02]"
                    : "border-muted-foreground/30"
                } ${file && "border-green-500 bg-green-50/50"}`}
                aria-label="Choose a file or drag and drop to upload">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {isUploading ? (
                      <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
                    ) : uploadComplete ? (
                      <svg
                        className="w-6 h-6 text-green-600 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    )}
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-black mb-1">
                      {isUploading
                        ? "Uploading..."
                        : uploadComplete
                        ? "Upload Complete!"
                        : file
                        ? "File Selected"
                        : "Drop your file here"}
                    </p>
                    <p className="text-sm text-black">
                      {isUploading
                        ? "Please wait while your file is being uploaded"
                        : uploadComplete
                        ? "Your document has been successfully uploaded"
                        : file
                        ? "Click to change file"
                        : "or click to browse"}
                    </p>
                  </div>

                  {file && !isUploading && !uploadComplete && (
                    <div className="mt-3 p-3 rounded-lg border">
                      <p className="text-sm font-medium ">{file.name}</p>
                      <p className="text-xs mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {!isUploading && !uploadComplete && (
                <div className="space-y-2">
                  <label
                    htmlFor="doc-file"
                    className="block text-sm font-medium">
                    Choose File
                  </label>
                  <input
                    ref={inputRef}
                    id="doc-file"
                    type="file"
                    accept={ACCEPTED_DOC_TYPES}
                    onChange={onInputChange}
                    aria-invalid={!!error}
                    aria-describedby={
                      error ? "doc-file-error" : "doc-file-help"
                    }
                    className={`block w-full cursor-pointer rounded-lg border px-3 py-2.5 text-sm transition-colors file:mr-3 file:rounded-md file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-medium file:cursor-pointer hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                      error && "border-destructive"
                    }`}
                  />

                  {error ? (
                    <div className="flex items-start space-x-2 mt-2">
                      <svg
                        className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p
                        id="doc-file-error"
                        className="text-sm text-destructive">
                        {error}
                      </p>
                    </div>
                  ) : (
                    <p id="doc-file-help" className="text-xs mt-2">
                      Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX,
                      TXT (Max 10MB)
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-end space-x-3">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => {
                  setOpen(false);
                  setFile(null);
                  setError("");
                  setIsUploading(false);
                  setUploadComplete(false);
                }}
                disabled={isUploading}
                className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium bg-neutral-200 transition-colors focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-300`}>
                Cancel
              </button>

              {!uploadComplete && (
                <button
                  type="button"
                  onClick={onUpload}
                  disabled={!file || !!error || isUploading}
                  className={`inline-flex h-10 items-center justify-center rounded-lg px-6 text-sm font-medium bg-zinc-900 text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-primary disabled:hover:shadow-sm`}>
                  {isUploading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    "Upload Document"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
