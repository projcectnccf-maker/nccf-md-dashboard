import AlertCard from "../components/AlertCard";
import DataTable from "../components/DataTable";
import { alerts, targetDeviations } from "@/lib/data";

export default function AlertsPage() {
  const criticalAlerts = alerts.filter(a => a.type === "critical");
  const warningAlerts = alerts.filter(a => a.type === "warning");
  const infoAlerts = alerts.filter(a => a.type === "info");

  return (
    <>
      <div className="page-header">
        <h1>Alerts &amp; Exceptions</h1>
        <p>Target deviations, stock aging, price alerts, and operational bottlenecks</p>
      </div>

      {/* ── Alert Summary ── */}
      <div className="grid-3" style={{ marginBottom: "1.5rem" }}>
        <div className="card animate-slide-up delay-1" style={{ borderLeft: "3px solid var(--red-500)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Critical
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--red-400)", fontFamily: "var(--font-sans, 'DM Sans', sans-serif)" }}>
            {criticalAlerts.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Require immediate action</div>
        </div>
        <div className="card animate-slide-up delay-2" style={{ borderLeft: "3px solid var(--amber-500)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Warning
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--amber-400)", fontFamily: "var(--font-sans, 'DM Sans', sans-serif)" }}>
            {warningAlerts.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Monitor closely</div>
        </div>
        <div className="card animate-slide-up delay-3" style={{ borderLeft: "3px solid var(--blue-500)" }}>
          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Informational
          </div>
          <div style={{ fontSize: "2rem", fontWeight: 700, color: "var(--blue-400)", fontFamily: "var(--font-sans, 'DM Sans', sans-serif)" }}>
            {infoAlerts.length}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>For awareness</div>
        </div>
      </div>

      {/* ── Regions Lagging Targets ── */}
      <div className="card animate-slide-up delay-3" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Regions Lagging Procurement Targets</div>
        <DataTable
          columns={[
            { key: "state", label: "State" },
            { key: "sanctioned", label: "Sanctioned (LMT)", align: "right" },
            { key: "actual", label: "Actual (LMT)", align: "right" },
            { key: "progress", label: "Achievement", align: "center" },
            { key: "status", label: "Status", align: "center" },
          ]}
          rows={targetDeviations.map(t => ({
            state: t.state,
            sanctioned: t.sanctioned.toFixed(1),
            actual: t.actual.toFixed(1),
            progress: (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                <div className="progress-bar" style={{ width: 80 }}>
                  <div className="progress-bar-fill" style={{
                    width: `${t.pct}%`,
                    background: t.status === "critical" ? "var(--red-400)" : "var(--amber-400)",
                  }} />
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: t.status === "critical" ? "var(--red-400)" : "var(--amber-400)" }}>
                  {t.pct}%
                </span>
              </div>
            ),
            status: (
              <span className={`badge ${t.status === "critical" ? "badge-red" : "badge-amber"}`}>
                {t.status === "critical" ? "⚠ Critical" : "◬ Behind"}
              </span>
            ),
          }))}
        />
      </div>

      {/* ── All Alerts ── */}
      <div className="animate-slide-up delay-4">
        <div className="section-title">All Active Alerts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {alerts.map((alert, i) => (
            <AlertCard key={alert.id} {...alert} delay={Math.min(i + 1, 8)} />
          ))}
        </div>
      </div>
    </>
  );
}
