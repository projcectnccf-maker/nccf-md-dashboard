"use client";

interface DataTableProps {
  columns: { key: string; label: string; align?: "left" | "center" | "right" }[];
  rows: Record<string, string | number | React.ReactNode>[];
}

export default function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ textAlign: col.align || "left" }}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key} style={{ textAlign: col.align || "left" }}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
