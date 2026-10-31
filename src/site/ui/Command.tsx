import { CopyButton } from "@/site/ui/CopyButton";
import { cn } from "@/lib/utils";

// A one-line shell command with a copy button.
export function Command({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface py-1.5 pl-4 pr-1.5", className)}>
      <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px]">
        <span className="text-subtle">$ </span>
        {text}
      </code>
      <CopyButton text={text} label="Copy command" />
    </div>
  );
}
