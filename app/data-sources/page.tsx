import DataTable from "../components/DataTable";
import { dataSourceMapping } from "@/lib/data";

export default function DataSourcesPage() {
  // Group by category for visual distinction
  const categories = [...new Set(dataSourceMapping.map(d => d.category))];

  return (
    <>
      <div className="page-header">
        <h1>Data Source Mapping</h1>
        <p>KPI-to-data-source reference — systems, stakeholders, and integration points</p>
      </div>

      {/* ── Full Data Source Table ── */}
      <div className="card animate-slide-up delay-1" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Complete KPI Data Source Registry</div>
        <DataTable
          columns={[
            { key: "category", label: "KPI Category" },
            { key: "kpi", label: "Specific KPI" },
            { key: "source", label: "Primary Data Source" },
            { key: "owner", label: "System / Stakeholder" },
          ]}
          rows={dataSourceMapping.map(d => ({
            category: (
              <span className={`badge ${
                d.category.includes("Procurement") ? "badge-amber" :
                d.category.includes("Disposal") ? "badge-green" :
                d.category.includes("Inventory") ? "badge-blue" :
                d.category.includes("Market") ? "badge-green" :
                d.category.includes("Financial") ? "badge-amber" :
                "badge-red"
              }`}>
                {d.category}
              </span>
            ),
            kpi: d.kpi,
            source: d.source,
            owner: d.owner,
          }))}
        />
      </div>

      {/* ── Category Breakdown ── */}
      <div className="grid-2">
        {categories.map((cat, i) => {
          const items = dataSourceMapping.filter(d => d.category === cat);
          const bgColor = [
            "var(--saffron-500)", "var(--green-400)", "var(--blue-400)",
            "var(--amber-400)", "var(--red-400)", "#c084fc",
          ][i % 6];
          return (
            <div key={cat} className={`card animate-slide-up delay-${Math.min(i + 2, 8)}`}>
              <div style={{
                display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem",
              }}>
                <div style={{
                  width: 4, height: 28, borderRadius: 4,
                  background: bgColor,
                }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>{cat}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{items.length} KPIs mapped</div>
                </div>
              </div>
              {items.map((item, j) => (
                <div key={j} style={{
                  padding: "0.6rem 0",
                  borderBottom: j < items.length - 1 ? "1px solid var(--border-subtle)" : "none",
                }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                    {item.kpi}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>
                      📊 {item.source}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
                      👤 {item.owner}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
