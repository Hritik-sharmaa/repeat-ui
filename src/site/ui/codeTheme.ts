import type { CSSProperties } from "react";

// A Prism theme for react-syntax-highlighter that reads the --code-* colours from globals.css,
// so code follows light and dark mode without re-rendering.
const c = (name: string): CSSProperties => ({ color: `var(--code-${name})` });

export const codeTheme: Record<string, CSSProperties> = {
  'code[class*="language-"]': {
    color: "var(--fg)",
    background: "none",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    lineHeight: "1.7",
    whiteSpace: "pre",
    tabSize: 2,
  },
  'pre[class*="language-"]': {
    color: "var(--fg)",
    background: "none",
    margin: 0,
    overflow: "auto",
  },
  comment: { ...c("comment"), fontStyle: "italic" },
  prolog: c("comment"),
  doctype: c("comment"),
  cdata: c("comment"),
  punctuation: c("punct"),
  operator: c("punct"),
  keyword: c("keyword"),
  atrule: c("keyword"),
  boolean: c("number"),
  number: c("number"),
  constant: c("number"),
  string: c("string"),
  char: c("string"),
  "attr-value": c("string"),
  regex: c("string"),
  function: c("fn"),
  "class-name": c("fn"),
  tag: c("tag"),
  selector: c("tag"),
  "attr-name": c("attr"),
  property: c("attr"),
  builtin: c("tag"),
  variable: { color: "var(--fg)" },
};
