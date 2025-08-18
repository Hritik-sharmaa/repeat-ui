type PropData = {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
};

export default function PropTable({ data }: { data: PropData[] }) {

  if (!data || data.length === 0) return null;

  const hasOptions = data.some((prop) => prop.options);

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
                <tr
                  key={prop.name}
                  className="transition-colors table-hover-theme">
                  <td className="px-4 py-4 border-r border-zinc-200 dark:border-zinc-700">
                    <code className="inline-flex items-center px-2 py-1 rounded-md code-neutral-theme text-sm font-mono">
                      {prop.name}
                    </code>
                  </td>
                  <td className="px-4 py-4 border-r border-zinc-200 dark:border-zinc-700">
                    <code className="inline-flex items-center px-2 py-1 rounded-md code-blue-theme text-sm font-mono">
                      {prop.type}
                    </code>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
