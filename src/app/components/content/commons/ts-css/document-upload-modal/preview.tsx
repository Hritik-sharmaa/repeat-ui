"use client";

import { useState, useRef, useEffect } from "react";
import "./style.css";

const ACCEPTED_DOC_TYPES = ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt";
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

type DocumentUploadModalProps = {
  buttonText?: string;
  className?: string;
};

export function DocumentUploadModal({
  buttonText = "Upload document",
  className,
}: DocumentUploadModalProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
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

  function validateFile(f: File): string {
    const ext = "." + (f.name.split(".").pop()?.toLowerCase() ?? "");
    const allowed = ACCEPTED_DOC_TYPES.replace(/\s/g, "").split(",");
    if (!allowed.includes(ext))
      return "Unsupported file type. Please upload a document file.";
    if (f.size > MAX_SIZE_BYTES)
      return "File is too large. Maximum size is 10MB.";
    return "";
  }

  function onSelected(f: File | null) {
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

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    onSelected(f);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    onSelected(f);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
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
        className={`document-upload-btn${className ? ` ${className}` : ""}`}>
        {buttonText}
      </button>

      {open && (
        <div
          className="document-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="upload-doc-title"
          aria-describedby="upload-doc-description">
          <div
            className="document-modal-backdrop"
            onClick={() => {
              setOpen(false);
              setFile(null);
              setError("");
              setIsUploading(false);
              setUploadComplete(false);
            }}
            aria-hidden="true"
          />

          <div className="document-modal" onClick={(e) => e.stopPropagation()}>
            <div className="document-modal-header">
              <h2 id="upload-doc-title" className="document-modal-title">
                Upload Document
              </h2>
              <p id="upload-doc-description" className="document-modal-desc">
                Choose a document to upload. Supported formats include PDF,
                Word, PowerPoint, Excel, and text files up to 10MB.
              </p>
            </div>

            <div className="document-modal-content">
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
                className={`document-dropzone${isDragging ? " dragging" : ""}${
                  file ? " selected" : ""
                }`}
                aria-label="Choose a file or drag and drop to upload">
                <div className="document-dropzone-inner">
                  <div className="document-dropzone-icon">
                    {isUploading ? (
                      <div
                        className="animate-spin"
                        style={{
                          width: 24,
                          height: 24,
                          border: "2px solid #2563eb",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                        }}></div>
                    ) : uploadComplete ? (
                      <svg
                        className="animate-pulse"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="green"
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
                        width="24"
                        height="24"
                        fill="none"
                        stroke="#2563eb"
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
                    <p className="document-file-selected">
                      {isUploading
                        ? "Uploading..."
                        : uploadComplete
                        ? "Upload Complete!"
                        : file
                        ? "File Selected"
                        : "Drop your file here"}
                    </p>
                    <p className="document-file-status">
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
                    <div className="document-file-info">
                      <p className="document-file-name">{file.name}</p>
                      <p className="document-file-size">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {!isUploading && !uploadComplete && (
                <div className="document-modal-inputs">
                  <label htmlFor="doc-file" className="document-input-label">
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
                    className={`document-input${error ? " error" : ""}`}
                  />

                  {error ? (
                    <div className="document-error">
                      <svg
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p id="doc-file-error">{error}</p>
                    </div>
                  ) : (
                    <p id="doc-file-help" className="document-help">
                      Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX,
                      TXT (Max 10MB)
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="document-modal-actions">
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
                className="document-cancel-btn">
                Cancel
              </button>

              {!uploadComplete && (
                <button
                  type="button"
                  onClick={onUpload}
                  disabled={!file || !!error || isUploading}
                  className="document-upload-action-btn">
                  {isUploading ? (
                    <>
                      <div
                        className="animate-spin"
                        style={{
                          width: 16,
                          height: 16,
                          border: "2px solid #fff",
                          borderTop: "2px solid transparent",
                          borderRadius: "50%",
                          marginRight: 8,
                        }}></div>
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
