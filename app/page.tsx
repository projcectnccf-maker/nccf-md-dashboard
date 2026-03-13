import KPICard from "./components/KPICard";
import AlertCard from "./components/AlertCard";
import {
  procurementOverview, disposalOverview, stockOverview,
  financialOverview, alerts, weeklyProcurementTrend,
  commodityProcurement, seasonComparison,
} from "@/lib/data";

export default function Home() {
  const procChange = ((procurementOverview.totalProcured.current - procurementOverview.totalProcured.previous) / procurementOverview.totalProcured.previous * 100);
  const dispChange = ((disposalOverview.totalDisposed.current - disposalOverview.totalDisposed.previous) / disposalOverview.totalDisposed.previous * 100);

  const sparkProc = weeklyProcurementTrend.map(w => w.qty);
  const sparkSeason = seasonComparison.map(s => s.totalQty);

  return (
    <>
      <div className="page-header">
        <h1>NCCF MD Dashboard</h1>
        <p>Key Performance Indicators — FY 2025-26 &nbsp;|&nbsp; Season: Kharif 2025</p>
      </div>

      {/* ── Hero KPI Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Total Procurement"
          value={`${procurementOverview.totalProcured.current} LMT`}
          subtitle={`vs ${procurementOverview.totalProcured.previous} LMT (${procurementOverview.totalProcured.prevSeason})`}
          change={procChange}
          changeLabel="YoY"
          icon="◈"
          delay={1}
          sparkline={sparkProc}
        />
        <KPICard
          title="Active Centres"
          value={procurementOverview.centresActive.toLocaleString()}
          subtitle={`of ${procurementOverview.centresOpened.toLocaleString()} opened`}
          change={-((procurementOverview.centresOpened - procurementOverview.centresActive) / procurementOverview.centresOpened * 100)}
          changeLabel="inactive"
          icon="⬡"
          accentColor="var(--blue-400)"
          delay={2}
        />
        <KPICard
          title="Farmers Benefitted"
          value={`${(procurementOverview.farmersBenefitted / 1000).toFixed(1)}K`}
          subtitle={`${(procurementOverview.farmersRegistered / 1000).toFixed(1)}K registered`}
          change={(procurementOverview.farmersBenefitted / procurementOverview.farmersRegistered * 100) - 100}
          changeLabel="conversion"
          icon="◎"
          accentColor="var(--green-400)"
          delay={3}
        />
        <KPICard
          title="Total Disposal"
          value={`${disposalOverview.totalDisposed.current} LMT`}
          subtitle={`Revenue ₹${disposalOverview.totalRevenue} Cr`}
          change={dispChange}
          changeLabel="YoY"
          icon="◇"
          accentColor="var(--amber-400)"
          delay={4}
          sparkline={sparkSeason}
        />
      </div>

      {/* ── Second Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Stock on Hand"
          value={`${stockOverview.totalStock} LMT`}
          subtitle={`Free: ${stockOverview.freeStock} | Blocked: ${stockOverview.blockedStock}`}
          icon="▦"
          accentColor="var(--blue-400)"
          delay={5}
        />
        <KPICard
          title="Active Bidders"
          value={disposalOverview.activeBidders.toLocaleString()}
          subtitle={`${disposalOverview.uniqueBidders} unique bidders`}
          icon="▤"
          accentColor="var(--green-400)"
          delay={6}
        />
        <KPICard
          title="Procurement Value"
          value={`₹${financialOverview.totalProcurementValue.toLocaleString()} Cr`}
          subtitle={`Sales: ₹${financialOverview.totalSalesRevenue.toLocaleString()} Cr`}
          change={financialOverview.profitLoss < 0 ? financialOverview.profitLoss / financialOverview.totalProcurementValue * 100 : financialOverview.profitLoss / financialOverview.totalProcurementValue * 100}
          changeLabel="P&L ratio"
          icon="▤"
          accentColor={financialOverview.profitLoss >= 0 ? "var(--green-400)" : "var(--red-400)"}
          delay={7}
        />
        <KPICard
          title="Target Achievement"
          value={`${((procurementOverview.actualQty / procurementOverview.sanctionedQty) * 100).toFixed(0)}%`}
          subtitle={`${procurementOverview.actualQty} of ${procurementOverview.sanctionedQty} LMT`}
          icon="⚑"
          accentColor="var(--saffron-500)"
          delay={8}
        />
      </div>

      {/* ── Commodity Snapshot & Alerts ── */}
      <div className="grid-2">
        {/* Commodity Summary */}
        <div className="card animate-slide-up delay-5">
          <div className="section-title">Commodity-wise Procurement</div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Commodity</th>
                  <th style={{ textAlign: "right" }}>Qty (LMT)</th>
                  <th style={{ textAlign: "right" }}>Value (₹Cr)</th>
                  <th style={{ textAlign: "right" }}>Share</th>
                </tr>
              </thead>
              <tbody>
                {commodityProcurement.map((c) => (
                  <tr key={c.commodity}>
                    <td style={{ fontWeight: 500 }}>{c.commodity}</td>
                    <td style={{ textAlign: "right" }}>{c.qty.toFixed(1)}</td>
                    <td style={{ textAlign: "right" }}>{c.value.toLocaleString()}</td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-bar-fill" style={{ width: `${c.share}%`, background: "var(--saffron-500)" }} />
                        </div>
                        <span style={{ fontSize: "0.78rem", minWidth: 38 }}>{c.share}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="animate-slide-up delay-6">
          <div className="section-title">Recent Alerts & Exceptions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {alerts.slice(0, 4).map((alert, i) => (
              <AlertCard key={alert.id} {...alert} delay={i + 1} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Season Comparison ── */}
      <div className="card animate-slide-up delay-7" style={{ marginTop: "1.5rem" }}>
        <div className="section-title">Season-wise Procurement Trend</div>
        <div style={{ display: "flex", gap: "1.5rem", overflowX: "auto", padding: "0.5rem 0" }}>
          {seasonComparison.map((s, i) => {
            const maxQty = Math.max(...seasonComparison.map(x => x.totalQty));
            const barH = (s.totalQty / maxQty) * 140;
            const isLatest = i === seasonComparison.length - 1;
            return (
              <div key={s.season} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                minWidth: 90,
              }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--text-primary)" }}>
                  {s.totalQty} LMT
                </div>
                <div style={{
                  width: 48, height: barH, borderRadius: "6px 6px 2px 2px",
                  background: isLatest
                    ? "linear-gradient(180deg, var(--saffron-500), var(--saffron-500)88)"
                    : "linear-gradient(180deg, var(--navy-500), var(--navy-600))",
                  transition: "height 0.8s ease",
                  border: isLatest ? "1px solid var(--saffron-400)" : "1px solid var(--border-subtle)",
                }} />
                <div style={{
                  fontSize: "0.68rem", color: isLatest ? "var(--saffron-400)" : "var(--text-muted)",
                  textAlign: "center", fontWeight: isLatest ? 600 : 400,
                }}>
                  {s.season}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                  {s.centres} centres
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
