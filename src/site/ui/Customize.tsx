"use client";

import { useId } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import type { Control } from "@/registry/catalog";
import { Segmented } from "@/site/ui/Segmented";
import { CopyButton } from "@/site/ui/CopyButton";
import { codeTheme } from "@/site/ui/codeTheme";
import { cn } from "@/lib/utils";

export type ControlValue = string | number | boolean;
export type ControlValues = Record<string, ControlValue>;

export const controlDefaults = (controls: Control[]): ControlValues =>
  Object.fromEntries(controls.map((c) => [c.prop, c.default]));

const label = (c: Control) => c.label ?? c.prop.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

// The JSX a visitor would write to get what they see: the text content, plus the props they changed.
export function usageCode(name: string, importPath: string, controls: Control[], values: ControlValues, required: string[] = []) {
  const attrs = [
    ...required,
    ...controls
      .filter((c) => c.prop !== "children" && (c.type === "text" || values[c.prop] !== c.default))
      .map(({ prop }) => {
        const v = values[prop];
        if (v === true) return prop;
        return typeof v === "string" ? `${prop}="${v}"` : `${prop}={${v}}`;
      }),
  ];
  const children = controls.some((c) => c.prop === "children") ? String(values.children) : null;
  // Up to two props fit on one line; more go one per line.
  const tag =
    attrs.length <= 2
      ? `<${name}${attrs.map((a) => " " + a).join("")}${children ? `>${children}</${name}>` : " />"}`
      : `<${name}\n  ${attrs.join("\n  ")}${children ? `>\n  ${children}\n</${name}>` : "\n/>"}`;
  return `import ${name} from "${importPath}";\n\n${tag}`;
}

export function Customize({
  controls,
  values,
  onChange,
  onReset,
  usage,
}: {
  controls: Control[];
  values: ControlValues;
  onChange: (prop: string, value: ControlValue) => void;
  onReset: () => void;
  usage: string;
}) {
  const changed = controls.some((c) => values[c.prop] !== c.default);
  return (
    <div className="relative border-t border-line">
      <div className="flex items-center justify-between py-1.5 pl-5 pr-2">
        <span className="inline-flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal className="size-3.5 text-(--tint)" />
          Customize
        </span>
        <button
          type="button"
          onClick={onReset}
          disabled={!changed}
          className="group inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs text-muted transition-colors hover:bg-surface-2 hover:text-fg disabled:pointer-events-none disabled:opacity-40">
          <RotateCcw className="size-3.5 transition-transform duration-500 group-hover:-rotate-180" />
          Reset
        </button>
      </div>
      <div className="grid gap-x-6 gap-y-5 border-t border-line px-5 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {controls.map((c) => (
          <Field key={c.prop} control={c} value={values[c.prop]} onChange={(v) => onChange(c.prop, v)} />
        ))}
      </div>
      <div className="relative border-t border-line">
        <CopyButton text={usage} label="Copy usage" className="absolute right-2 top-2 z-10" />
        <div className="thin-scrollbar overflow-x-auto">
          <SyntaxHighlighter language="tsx" style={codeTheme} customStyle={{ padding: "16px 20px", background: "transparent" }}>
            {usage}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

function Field({ control: c, value, onChange }: { control: Control; value: ControlValue; onChange: (v: ControlValue) => void }) {
  const id = useId();
  const title = (
    <label htmlFor={id} className="text-xs font-medium text-muted">
      {label(c)}
    </label>
  );

  if (c.type === "boolean") {
    return (
      <div className="flex items-center justify-between gap-3">
        {title}
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={value === true}
          onClick={() => onChange(!value)}
          className={cn(
            "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
            value ? "border-(--tint) bg-(--tint)" : "border-line-strong bg-surface-2"
          )}>
          <span
            className={cn(
              "absolute left-0.5 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-white shadow transition-transform",
              value && "translate-x-4"
            )}
          />
        </button>
      </div>
    );
  }

  if (c.type === "number") {
    const n = Number(value);
    const fill = ((n - c.min) / (c.max - c.min)) * 100;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {title}
          <span className="font-mono text-xs tabular-nums text-fg">
            {n}
            {c.unit}
          </span>
        </div>
        <input
          id={id}
          type="range"
          min={c.min}
          max={c.max}
          step={c.step ?? 1}
          value={n}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-input w-full"
          style={{ "--fill": `${fill}%` } as React.CSSProperties}
        />
      </div>
    );
  }

  if (c.type === "color") {
    return (
      <div className="space-y-2">
        {title}
        <div className="flex h-9 items-center gap-2 rounded-lg border border-line bg-bg px-1.5 focus-within:border-line-strong">
          <span className="relative size-6 shrink-0 overflow-hidden rounded-md border border-line" style={{ background: String(value) }}>
            <input
              type="color"
              aria-label={`${label(c)} picker`}
              value={toHex(String(value))}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 size-full cursor-pointer opacity-0"
            />
          </span>
          <input
            id={id}
            value={String(value)}
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
            className="min-w-0 flex-1 bg-transparent font-mono text-xs outline-none"
          />
        </div>
      </div>
    );
  }

  if (c.type === "select") {
    return (
      <div className="space-y-2">
        {title}
        {c.options.length <= 4 ? (
          <div>
            <Segmented
              size="sm"
              label={label(c)}
              value={String(value)}
              onChange={onChange}
              options={c.options.map((o) => ({ value: o, label: o }))}
            />
          </div>
        ) : (
          <select
            id={id}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-full rounded-lg border border-line bg-bg px-2.5 text-sm outline-none focus:border-line-strong">
            {c.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {title}
      <input
        id={id}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-full rounded-lg border border-line bg-bg px-2.5 text-sm outline-none focus:border-line-strong"
      />
    </div>
  );
}

// <input type="color"> only takes #rrggbb.
function toHex(color: string) {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color;
  if (/^#[0-9a-f]{3}$/i.test(color)) return "#" + [...color.slice(1)].map((ch) => ch + ch).join("");
  return "#000000";
}
