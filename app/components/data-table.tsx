"use client";

import type { Dataset } from "@/lib/types";

interface DataTableProps {
  data: Dataset;
  maxRows?: number;
}

export function DataTable({ data, maxRows = 100 }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No data loaded
      </div>
    );
  }

  const columns = Object.keys(data[0]);
  const displayData = data.slice(0, maxRows);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted sticky top-0">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-3 py-2 text-left font-medium text-muted-foreground whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-muted/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col} className="px-3 py-2 whitespace-nowrap">
                    {row[col] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > maxRows && (
        <div className="px-3 py-2 bg-muted text-xs text-muted-foreground">
          Showing {maxRows} of {data.length} rows
        </div>
      )}
    </div>
  );
}
