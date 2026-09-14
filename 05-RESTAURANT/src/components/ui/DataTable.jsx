const DataTable = ({ columns, rows, getRowKey, emptyMessage = 'No records found.' }) => (
  <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-lg">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            {columns.map((column) => (
              <th key={column.key} className="py-space-md px-space-md">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-space-lg px-space-md text-center text-on-surface-variant">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)} className="hover:bg-surface-container-high transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className="py-space-md px-space-md">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default DataTable
