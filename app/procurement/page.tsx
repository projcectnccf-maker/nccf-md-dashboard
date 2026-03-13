import KPICard from "../components/KPICard";
import BarChart from "../components/BarChart";
import TrendChart from "../components/TrendChart";
import DonutChart from "../components/DonutChart";
import DataTable from "../components/DataTable";
import {
  procurementOverview, commodityProcurement, stateProcurement,
  weeklyProcurementTrend, seasonComparison, farmerPaymentAging,
} from "@/lib/data";

export default function ProcurementPage() {
  const procChange = ((procurementOverview.totalProcured.current - procurementOverview.totalProcured.previous) / procurementOverview.totalProcured.previous * 100);
  const sparkProc = weeklyProcurementTrend.map(w => w.qty);

  return (
    <>
      <div className="page-header">
        <h1>Procurement Metrics</h1>
        <p>Comprehensive procurement analysis — Season: {procurementOverview.totalProcured.season}</p>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Total Procured"
          value={`${procurementOverview.totalProcured.current} LMT`}
          subtitle={`vs ${procurementOverview.totalProcured.previous} LMT prev season`}
          change={procChange}
          changeLabel="YoY"
          icon="◈"
          delay={1}
          sparkline={sparkProc}
        />
        <KPICard
          title="Centres Opened"
          value={procurementOverview.centresOpened.toLocaleString()}
          subtitle={`${procurementOverview.centresActive.toLocaleString()} currently active`}
          icon="⬡"
          accentColor="var(--blue-400)"
          delay={2}
        />
        <KPICard
          title="Farmers Registered"
          value={`${(procurementOverview.farmersRegistered / 1000).toFixed(1)}K`}
          subtitle={`${(procurementOverview.farmersBenefitted / 1000).toFixed(1)}K sold produce`}
          icon="◎"
          accentColor="var(--green-400)"
          delay={3}
        />
        <KPICard
          title="Payments Completed"
          value={`${(procurementOverview.farmersPaymentDone / 1000).toFixed(1)}K`}
          subtitle={`of ${(procurementOverview.farmersBenefitted / 1000).toFixed(1)}K benefitted`}
          change={(procurementOverview.farmersPaymentDone / procurementOverview.farmersBenefitted * 100) - 100}
          changeLabel="pending"
          icon="▤"
          accentColor="var(--amber-400)"
          delay={4}
        />
      </div>

      {/* ── Procurement vs Sanctioned ── */}
      <div className="card animate-slide-up delay-3" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Procurement Against Sanctioned Quantity</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Achieved</span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {procurementOverview.actualQty} / {procurementOverview.sanctionedQty} LMT
              </span>
            </div>
            <div className="progress-bar" style={{ height: 12 }}>
              <div className="progress-bar-fill" style={{
                width: `${(procurementOverview.actualQty / procurementOverview.sanctionedQty * 100)}%`,
                background: "linear-gradient(90deg, var(--saffron-500), var(--gold-400))",
              }} />
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.35rem" }}>
              {((procurementOverview.actualQty / procurementOverview.sanctionedQty) * 100).toFixed(1)}% of target achieved
            </div>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--saffron-400)", fontFamily: "var(--font-sans, 'DM Sans', sans-serif)" }}>
                {(procurementOverview.sanctionedQty - procurementOverview.actualQty).toFixed(1)}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>LMT Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Commodity Breakdown & State-wise ── */}
      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        {/* Commodity Donut */}
        <div className="card animate-slide-up delay-4">
          <div className="section-title">Procurement by Commodity</div>
          <DonutChart
            data={commodityProcurement.map((c, i) => ({
              label: c.commodity,
              value: c.qty,
              color: [
                "var(--saffron-500)", "var(--blue-400)", "var(--green-400)",
                "var(--amber-400)", "#c084fc", "#f472b6", "#67e8f9",
              ][i],
            }))}
            centerValue={`${procurementOverview.totalProcured.current}`}
            centerLabel="LMT Total"
          />
        </div>

        {/* State-wise Table */}
        <div className="card animate-slide-up delay-5">
          <div className="section-title">State-wise Procurement</div>
          <DataTable
            columns={[
              { key: "state", label: "State" },
              { key: "qty", label: "Qty (LMT)", align: "right" },
              { key: "centres", label: "Centres", align: "right" },
              { key: "farmers", label: "Farmers", align: "right" },
            ]}
            rows={stateProcurement.map(s => ({
              state: s.state,
              qty: s.qty.toFixed(1),
              centres: s.centres.toLocaleString(),
              farmers: s.farmers.toLocaleString(),
            }))}
          />
        </div>
      </div>

      {/* ── Weekly Procurement Trend ── */}
      <div className="card animate-slide-up delay-5" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Weekly Procurement Trend (Cumulative)</div>
        <TrendChart
          labels={weeklyProcurementTrend.map(w => w.week)}
          lines={[
            { data: weeklyProcurementTrend.map(w => w.qty), color: "var(--saffron-500)", label: "Qty Procured (LMT)" },
          ]}
          height={220}
        />
      </div>

      {/* ── Season Comparison ── */}
      <div className="card animate-slide-up delay-6" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Season-wise Comparative Analysis</div>
        <BarChart
          data={seasonComparison.map(s => ({ label: s.season, value: s.totalQty }))}
          color="var(--saffron-500)"
          unit=" LMT"
          height={200}
        />
      </div>

      {/* ── Farmer Payment Aging ── */}
      <div className="card animate-slide-up delay-7">
        <div className="section-title">Farmer Payment Aging Tracker</div>
        <DataTable
          columns={[
            { key: "stage", label: "Processing Stage" },
            { key: "count", label: "Farmers Pending", align: "right" },
            { key: "avgDays", label: "Avg Days", align: "right" },
            { key: "status", label: "Status", align: "center" },
          ]}
          rows={farmerPaymentAging.map(f => ({
            stage: f.stage,
            count: f.count.toLocaleString(),
            avgDays: f.avgDays.toFixed(1),
            status: (
              <span className={`badge ${f.status === "critical" ? "badge-red" : f.status === "warning" ? "badge-amber" : "badge-green"}`}>
                {f.status === "critical" ? "⚠ Critical" : f.status === "warning" ? "◬ Slow" : "✓ Normal"}
              </span>
            ),
          }))}
        />
      </div>
    </>
  );
}
