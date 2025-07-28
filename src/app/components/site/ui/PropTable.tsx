type PropData = {
  name: string
  type: string
  default: string
  description: string
  options?: string[]
}

export default function PropTable({ data }: { data: PropData[] }) {
  if (!data || data.length === 0) return null

  const hasOptions = data.some((prop) => prop.options)

  return (
    <div className="w-full mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="px-3 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wide">Prop</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wide">Type</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wide">Default</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wide">
                Description
              </th>
              {hasOptions && (
                <th className="px-3 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wide">
                  Options
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((prop, index) => (
              <tr key={prop.name} className="border-b border-zinc-800/50 hover:bg-zinc-900/30">
                <td className="px-3 py-3">
                  <code className="text-zinc-200 font-mono text-sm">{prop.name}</code>
                </td>
                <td className="px-3 py-3">
                  <code className="text-zinc-400 font-mono text-sm">{prop.type}</code>
                </td>
                <td className="px-3 py-3">
                  {prop.default ? (
                    <code className="text-zinc-400 font-mono text-sm">{prop.default}</code>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className="px-3 py-3 text-zinc-300">{prop.description}</td>
                {hasOptions && (
                  <td className="px-3 py-3">
                    {prop.options ? (
                      <code className="text-zinc-400 font-mono text-sm">{prop.options.join(" | ")}</code>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
