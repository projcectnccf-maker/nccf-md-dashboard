import KPICard from "../components/KPICard";
import TrendChart from "../components/TrendChart";
import BarChart from "../components/BarChart";
import DataTable from "../components/DataTable";
import { financialOverview, financialByCommodity, monthlyFinancials } from "@/lib/data";

export default function FinancialPage() {
  return (
    <>
      <div className="page-header">
        <h1>Financial &amp; Sales Indicators</h1>
        <p>Procurement value, sales revenue, P&amp;L performance, and commodity-wise analysis</p>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Procurement Value"
          value={`₹${financialOverview.totalProcurementValue.toLocaleString()} Cr`}
          subtitle="Total procurement expenditure"
          icon="◈"
          delay={1}
        />
        <KPICard
          title="Sales Revenue"
          value={`₹${financialOverview.totalSalesRevenue.toLocaleString()} Cr`}
          subtitle="Total sales/disposal revenue"
          icon="▤"
          accentColor="var(--green-400)"
          delay={2}
        />
        <KPICard
          title="Profit / Loss"
          value={`₹${financialOverview.profitLoss} Cr`}
          subtitle={financialOverview.profitLoss >= 0 ? "Net profit" : "Net shortfall (policy-driven)"}
          icon="◎"
          accentColor={financialOverview.profitLoss >= 0 ? "var(--green-400)" : "var(--red-400)"}
          delay={3}
        />
        <KPICard
          title="Turnover Ratio"
          value={`${(financialOverview.turnoverRatio * 100).toFixed(0)}%`}
          subtitle="Sales / Procurement rotation"
          icon="⬡"
          accentColor="var(--amber-400)"
          delay={4}
        />
      </div>

      {/* ── Monthly Trend ── */}
      <div className="card animate-slide-up delay-3" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Monthly Procurement vs Sales Revenue</div>
        <TrendChart
          labels={monthlyFinancials.map(m => m.month)}
          lines={[
            { data: monthlyFinancials.map(m => m.procurement), color: "var(--saffron-500)", label: "Procurement (₹Cr)" },
            { data: monthlyFinancials.map(m => m.sales), color: "var(--green-400)", label: "Sales (₹Cr)" },
          ]}
          height={240}
          unit="₹"
        />
      </div>

      {/* ── P&L Trend & Commodity ── */}
      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        <div className="card animate-slide-up delay-4">
          <div className="section-title">Monthly P&amp;L Trend</div>
          <BarChart
            data={monthlyFinancials.map(m => ({
              label: m.month,
              value: Math.abs(m.pl),
              value2: undefined,
            }))}
            color="var(--red-400)"
            height={180}
          />
          <div style={{ marginTop: "0.5rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
            Note: Shortfalls are policy-driven — NCCF procures at MSP to support farmers even when market prices are lower.
          </div>
        </div>

        <div className="card animate-slide-up delay-5">
          <div className="section-title">Commodity-wise P&amp;L</div>
          <DataTable
            columns={[
              { key: "commodity", label: "Commodity" },
              { key: "procValue", label: "Procurement", align: "right" },
              { key: "salesRev", label: "Sales", align: "right" },
              { key: "pl", label: "P&L", align: "right" },
            ]}
            rows={financialByCommodity.map(f => ({
              commodity: f.commodity,
              procValue: `₹${f.procValue} Cr`,
              salesRev: `₹${f.salesRev} Cr`,
              pl: (
                <span style={{
                  color: f.profitLoss >= 0 ? "var(--green-400)" : "var(--red-400)",
                  fontWeight: 600,
                }}>
                  {f.profitLoss >= 0 ? "+" : ""}₹{f.profitLoss} Cr
                </span>
              ),
            }))}
          />
        </div>
      </div>

      {/* ── Sales Volumes ── */}
      <div className="card animate-slide-up delay-6">
        <div className="section-title">Sales Volumes — Quantity &amp; Revenue Breakdown</div>
        <DataTable
          columns={[
            { key: "commodity", label: "Commodity" },
            { key: "qtySold", label: "Qty Sold (LMT)", align: "right" },
            { key: "revenue", label: "Revenue (₹Cr)", align: "right" },
            { key: "realization", label: "₹/MT Avg", align: "right" },
            { key: "share", label: "Revenue Share", align: "center" },
          ]}
          rows={financialByCommodity.map(f => ({
            commodity: f.commodity,
            qtySold: f.qtySold.toFixed(1),
            revenue: `₹${f.salesRev.toLocaleString()}`,
            realization: `₹${(f.salesRev / f.qtySold * 100).toFixed(0)}`,
            share: (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                <div className="progress-bar" style={{ width: 60 }}>
                  <div className="progress-bar-fill" style={{
                    width: `${(f.salesRev / financialOverview.totalSalesRevenue * 100)}%`,
                    background: "var(--green-400)",
                  }} />
                </div>
                <span style={{ fontSize: "0.75rem" }}>
                  {(f.salesRev / financialOverview.totalSalesRevenue * 100).toFixed(0)}%
                </span>
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
}
