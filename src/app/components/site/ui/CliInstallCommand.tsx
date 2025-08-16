"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CliInstallCommandProps {
  componentName: string;
  variant?: string;
  className?: string;
}

export default function CliInstallCommand({
  componentName,
  variant = "ts-tailwind",
  className = "",
}: CliInstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const command = `npx @hritik-sharmaa/repeat-ui add ${componentName} --variant ${variant}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`mt-6 p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <Terminal className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Install with CLI</h3>
      </div>

      <div className="flex items-center gap-3">
        <code className="flex-1 text-sm font-mono bg-slate-900 dark:bg-slate-950 text-white px-4 py-3 rounded-lg border border-slate-700 overflow-x-auto">
          <span className="text-slate-500">$</span> {command}
        </code>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
            copied
              ? "bg-green-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
          }`}
          title={copied ? "Copied!" : "Copy command"}>
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
