"use client";

import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { PropDoc } from "@/registry/catalog";
import { cn } from "@/lib/utils";

export default function PropTable({ data }: { data: PropDoc[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  if (!data || data.length === 0) return null;
  const hasOptions = data.some((prop) => prop.options);

  const toggle = (name: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
      <div className="thin-scrollbar mt-5 overflow-x-auto rounded-2xl border border-line">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line bg-surface font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
            <tr>
              <th className="px-4 py-3 font-normal">Prop</th>
              <th className="px-4 py-3 font-normal">Type</th>
              <th className="px-4 py-3 font-normal">Default</th>
              <th className="px-4 py-3 font-normal">Description</th>
              {hasOptions && <th className="px-4 py-3 font-normal">Options</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.map((prop) => {
              const nested = prop.properties && prop.properties.length > 0;
              const open = expanded.has(prop.name);
              return (
                <Fragment key={prop.name}>
                  <tr className="align-top">
                    <td className="px-4 py-3.5">
                      <code className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[13px] text-accent">{prop.name}</code>
                    </td>
                    <td className="px-4 py-3.5">
                      {nested ? (
                        <button
                          type="button"
                          onClick={() => toggle(prop.name)}
                          aria-expanded={open}
                          className="inline-flex items-center gap-1 font-mono text-[13px] text-muted hover:text-fg">
                          {prop.type}
                          <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
                        </button>
                      ) : (
                        <code className="font-mono text-[13px] text-muted">{prop.type}</code>
                      )}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[13px] text-muted">{prop.default || "-"}</td>
                    <td className="px-4 py-3.5 leading-relaxed">{prop.description}</td>
                    {hasOptions && (
                      <td className="px-4 py-3.5 font-mono text-[13px] text-muted">
                        {prop.options ? prop.options.join(" | ") : "-"}
                      </td>
                    )}
                  </tr>
                  {nested && (
                    <tr>
                      <td colSpan={hasOptions ? 5 : 4} className="p-0">
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden">
                              <div className="border-t border-line bg-surface px-4 py-3">
                                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                                  {prop.type} fields
                                </p>
                                <dl className="divide-y divide-line">
                                  {prop.properties!.map((field) => (
                                    <div key={field.name} className="grid gap-1 py-2 sm:grid-cols-[10rem_10rem_1fr]">
                                      <dt className="font-mono text-[13px]">
                                        {field.name}
                                        {field.optional && <span className="text-subtle">?</span>}
                                      </dt>
                                      <dd className="font-mono text-[13px] text-muted">
                                        {field.type}
                                        {field.default ? ` = ${field.default}` : ""}
                                      </dd>
                                      <dd className="text-muted">{field.description}</dd>
                                    </div>
                                  ))}
                                </dl>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
