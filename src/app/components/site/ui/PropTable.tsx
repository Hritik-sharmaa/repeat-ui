"use client";

import { useState } from "react";

type PropData = {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
  properties?: NestedProperty[];
};

type NestedProperty = {
  name: string;
  type: string;
  optional: boolean;
  default?: string;
  description: string;
};

export default function PropTable({ data }: { data: PropData[] }) {
  const [expandedProps, setExpandedProps] = useState<Set<string>>(new Set());

  if (!data || data.length === 0) return null;

  const hasOptions = data.some((prop) => prop.options);

  const toggleExpanded = (propName: string) => {
    const newExpanded = new Set(expandedProps);
    if (newExpanded.has(propName)) {
      newExpanded.delete(propName);
    } else {
      newExpanded.add(propName);
    }
    setExpandedProps(newExpanded);
  };

  return (
    <div className="w-full mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Props Table</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Configuration options and properties for this component.
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border-theme">
        <div className="overflow-x-auto">
          <table className="w-full table-theme border-collapse">
            <thead className="table-header-theme">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-700">
                  Prop
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-700">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-700">
                  Default
                </th>
                <th
                  className={`px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider ${
                    hasOptions
                      ? "border-r border-zinc-200 dark:border-zinc-700"
                      : ""
                  }`}>
                  Description
                </th>
                {hasOptions && (
                  <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                    Options
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {data.map((prop) => (
                <>
                  <tr
                    key={prop.name}
                    className="transition-colors table-hover-theme">
                    <td className="px-4 py-4 border-r border-zinc-200 dark:border-zinc-700">
                      <code className="inline-flex items-center px-2 py-1 rounded-md code-neutral-theme text-sm font-mono">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 dark:border-zinc-700">
                      {prop.properties && prop.properties.length > 0 ? (
                        <button
                          onClick={() => toggleExpanded(prop.name)}
                          className="inline-flex items-center px-2 py-1 rounded-md code-blue-theme text-sm font-mono hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer">
                          {prop.type}
                          <svg
                            className={`ml-2 h-3 w-3 transition-transform ${
                              expandedProps.has(prop.name) ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      ) : (
                        <code className="inline-flex items-center px-2 py-1 rounded-md code-blue-theme text-sm font-mono">
                          {prop.type}
                        </code>
                      )}
                    </td>
                    <td className="px-4 py-4 border-r border-zinc-200 dark:border-zinc-700">
                      {prop.default ? (
                        <code className="inline-flex items-center px-2 py-1 rounded-md code-green-theme text-sm font-mono">
                          {prop.default}
                        </code>
                      ) : (
                        <span className="table-text-secondary-theme text-sm">
                          —
                        </span>
                      )}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm table-text-theme leading-relaxed ${
                        hasOptions
                          ? "border-r border-zinc-200 dark:border-zinc-700"
                          : ""
                      }`}>
                      {prop.description}
                    </td>
                    {hasOptions && (
                      <td className="px-4 py-4">
                        {prop.options ? (
                          <code className="inline-flex items-center px-2 py-1 rounded-md code-purple-theme text-sm font-mono">
                            {prop.options.join(" | ")}
                          </code>
                        ) : (
                          <span className="table-text-secondary-theme text-sm">
                            —
                          </span>
                        )}
                      </td>
                    )}
                  </tr>
                  {prop.properties &&
                    prop.properties.length > 0 &&
                    expandedProps.has(prop.name) && (
                      <tr key={`${prop.name}-nested`}>
                        <td
                          colSpan={hasOptions ? 5 : 4}
                          className="px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50">
                          <div className="ml-4">
                            <h4 className="text-sm font-semibold mb-3 text-zinc-700 dark:text-zinc-300">
                              {prop.type} Properties:
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full border border-zinc-200 dark:border-zinc-700 rounded-md">
                                <thead className="bg-zinc-100 dark:bg-zinc-700">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-600">
                                      Property
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-600">
                                      Type
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-600">
                                      Required
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider border-r border-zinc-200 dark:border-zinc-600">
                                      Default
                                    </th>
                                    <th className="px-3 py-2 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                                      Description
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
                                  {prop.properties.map((nestedProp) => (
                                    <tr
                                      key={nestedProp.name}
                                      className="bg-white dark:bg-zinc-800">
                                      <td className="px-3 py-2 border-r border-zinc-200 dark:border-zinc-600">
                                        <code className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono">
                                          {nestedProp.name}
                                        </code>
                                      </td>
                                      <td className="px-3 py-2 border-r border-zinc-200 dark:border-zinc-600">
                                        <code className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-mono">
                                          {nestedProp.type}
                                        </code>
                                      </td>
                                      <td className="px-3 py-2 border-r border-zinc-200 dark:border-zinc-600">
                                        <span
                                          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                                            !nestedProp.optional
                                              ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                                              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                          }`}>
                                          {!nestedProp.optional ? "Yes" : "No"}
                                        </span>
                                      </td>
                                      <td className="px-3 py-2 border-r border-zinc-200 dark:border-zinc-600">
                                        {nestedProp.default ? (
                                          <code className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-mono">
                                            {nestedProp.default}
                                          </code>
                                        ) : (
                                          <span className="text-zinc-500 dark:text-zinc-400 text-xs">
                                            —
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-3 py-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        {nestedProp.description}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
