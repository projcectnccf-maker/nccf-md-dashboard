import KPICard from "../components/KPICard";
import BarChart from "../components/BarChart";
import TrendChart from "../components/TrendChart";
import DataTable from "../components/DataTable";
import {
  disposalOverview, disposalByCommodity,
  weeklyDisposalTrend, biddersByState,
} from "@/lib/data";

export default function DisposalPage() {
  const dispChange = ((disposalOverview.totalDisposed.current - disposalOverview.totalDisposed.previous) / disposalOverview.totalDisposed.previous * 100);

  return (
    <>
      <div className="page-header">
        <h1>Disposal / E-Auction</h1>
        <p>Disposal performance, sales realization, and bidder analytics</p>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Total Disposed"
          value={`${disposalOverview.totalDisposed.current} LMT`}
          subtitle={`vs ${disposalOverview.totalDisposed.previous} LMT prev season`}
          change={dispChange}
          changeLabel="YoY"
          icon="◇"
          delay={1}
        />
        <KPICard
          title="Revenue Generated"
          value={`₹${disposalOverview.totalRevenue} Cr`}
          subtitle="Total e-auction sales revenue"
          icon="▤"
          accentColor="var(--green-400)"
          delay={2}
        />
        <KPICard
          title="Avg Realization"
          value={`${disposalOverview.avgRealization}%`}
          subtitle="Avg realization vs MSP"
          icon="◎"
          accentColor="var(--amber-400)"
          delay={3}
        />
        <KPICard
          title="Active Bidders"
          value={disposalOverview.activeBidders.toLocaleString()}
          subtitle={`${disposalOverview.uniqueBidders} unique bidders`}
          icon="⬡"
          accentColor="var(--blue-400)"
          delay={4}
        />
      </div>

      {/* ── Commodity-wise Sales Realization ── */}
      <div className="card animate-slide-up delay-3" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Commodity-wise Sales Realization</div>
        <DataTable
          columns={[
            { key: "commodity", label: "Commodity" },
            { key: "qtySold", label: "Qty Sold (LMT)", align: "right" },
            { key: "revenue", label: "Revenue (₹Cr)", align: "right" },
            { key: "realization", label: "Realization %", align: "right" },
            { key: "bar", label: "Relative", align: "center" },
          ]}
          rows={disposalByCommodity.map(d => ({
            commodity: d.commodity,
            qtySold: d.qtySold.toFixed(1),
            revenue: d.revenue.toLocaleString(),
            realization: `${d.realization}%`,
            bar: (
              <div className="progress-bar" style={{ width: 80 }}>
                <div className="progress-bar-fill" style={{
                  width: `${(d.qtySold / Math.max(...disposalByCommodity.map(x => x.qtySold))) * 100}%`,
                  background: d.realization >= 106 ? "var(--green-400)" : d.realization >= 100 ? "var(--amber-400)" : "var(--red-400)",
                }} />
              </div>
            ),
          }))}
        />
      </div>

      {/* ── Trend & Bidders ── */}
      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        {/* Weekly Disposal Trend */}
        <div className="card animate-slide-up delay-4">
          <div className="section-title">Weekly Disposal Trend</div>
          <TrendChart
            labels={weeklyDisposalTrend.map(w => w.week)}
            lines={[
              { data: weeklyDisposalTrend.map(w => w.qty), color: "var(--saffron-500)", label: "Qty Sold (LMT)" },
            ]}
            height={200}
          />
        </div>

        {/* Weekly Price Trend */}
        <div className="card animate-slide-up delay-5">
          <div className="section-title">Weekly Price Trend (₹/Quintal)</div>
          <TrendChart
            labels={weeklyDisposalTrend.map(w => w.week)}
            lines={[
              { data: weeklyDisposalTrend.map(w => w.price), color: "var(--green-400)", label: "Avg Price (₹/Q)" },
            ]}
            height={200}
            unit="₹"
          />
        </div>
      </div>

      {/* ── Bidder Analytics ── */}
      <div className="grid-2">
        <div className="card animate-slide-up delay-5">
          <div className="section-title">State-wise Bidder Analysis</div>
          <BarChart
            data={biddersByState.map(b => ({ label: b.state, value: b.active, value2: b.unique }))}
            color="var(--blue-400)"
            color2="var(--saffron-500)"
            label1="Active Bidders"
            label2="Unique Bidders"
            height={200}
          />
        </div>

        <div className="card animate-slide-up delay-6">
          <div className="section-title">Bidder Distribution</div>
          <DataTable
            columns={[
              { key: "state", label: "State" },
              { key: "active", label: "Active", align: "right" },
              { key: "unique", label: "Unique", align: "right" },
              { key: "ratio", label: "Repeat %", align: "right" },
            ]}
            rows={biddersByState.map(b => ({
              state: b.state,
              active: b.active.toLocaleString(),
              unique: b.unique.toLocaleString(),
              ratio: `${((1 - b.unique / b.active) * 100).toFixed(0)}%`,
            }))}
          />
        </div>
      </div>
    </>
  );
}
