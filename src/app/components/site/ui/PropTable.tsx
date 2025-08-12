type PropData = {
  name: string;
  type: string;
  default: string;
  description: string;
  options?: string[];
};

export default function PropTable({ data }: { data: PropData[] }) {
  console.log("PropTable received data:", data);

  if (!data || data.length === 0) return null;

  const hasOptions = data.some((prop) => prop.options);

  return (
    <div className="w-full mt-8">
      <div className="overflow-hidden rounded-lg border-theme">
        <div className="overflow-x-auto">
          <table className="w-full table-theme">
            <thead className="table-header-theme">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                  Prop
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                  Default
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                  Description
                </th>
                {hasOptions && (
                  <th className="px-4 py-3 text-left text-xs font-semibold table-text-theme uppercase tracking-wider">
                    Options
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y border-theme">
              {data.map((prop) => (
                <tr
                  key={prop.name}
                  className="transition-colors table-hover-theme">
                  <td className="px-4 py-4">
                    <code className="inline-flex items-center px-2 py-1 rounded-md code-neutral-theme text-sm font-mono">
                      {prop.name}
                    </code>
                  </td>
                  <td className="px-4 py-4">
                    <code className="inline-flex items-center px-2 py-1 rounded-md code-blue-theme text-sm font-mono">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-4">
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
                  <td className="px-4 py-4 text-sm table-text-theme leading-relaxed">
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
