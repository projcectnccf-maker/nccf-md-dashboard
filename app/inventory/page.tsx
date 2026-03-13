import KPICard from "../components/KPICard";
import DonutChart from "../components/DonutChart";
import DataTable from "../components/DataTable";
import BarChart from "../components/BarChart";
import {
  stockOverview, stockByCommodity, stockByState,
  lowStockWarehouses, blockedStockSchemes,
} from "@/lib/data";

export default function InventoryPage() {
  return (
    <>
      <div className="page-header">
        <h1>Inventory &amp; Stock Indicators</h1>
        <p>Warehouse stock levels, movement tracking, and low-stock alerts</p>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid-kpi" style={{ marginBottom: "1.5rem" }}>
        <KPICard
          title="Stock on Hand"
          value={`${stockOverview.totalStock} LMT`}
          subtitle={`Free: ${stockOverview.freeStock} LMT`}
          icon="▦"
          delay={1}
        />
        <KPICard
          title="Blocked Stock"
          value={`${stockOverview.blockedStock} LMT`}
          subtitle="Reserved under schemes"
          icon="▤"
          accentColor="var(--red-400)"
          delay={2}
        />
        <KPICard
          title="Inflow (Procurement)"
          value={`${stockOverview.inflow} LMT`}
          subtitle="Current month additions"
          icon="◈"
          accentColor="var(--green-400)"
          delay={3}
        />
        <KPICard
          title="Outflow (Sales/Dispatch)"
          value={`${stockOverview.outflow} LMT`}
          subtitle={`Lifted: ${stockOverview.liftedQty} LMT`}
          icon="◇"
          accentColor="var(--blue-400)"
          delay={4}
        />
      </div>

      {/* ── Stock Distribution ── */}
      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        {/* Commodity Donut */}
        <div className="card animate-slide-up delay-3">
          <div className="section-title">Stock by Commodity</div>
          <DonutChart
            data={stockByCommodity.map((c, i) => ({
              label: c.commodity,
              value: c.stock,
              color: [
                "var(--saffron-500)", "var(--blue-400)", "var(--green-400)",
                "var(--amber-400)", "#c084fc", "#f472b6",
              ][i],
            }))}
            centerValue={`${stockOverview.totalStock}`}
            centerLabel="LMT Total"
          />
        </div>

        {/* State-wise Stock */}
        <div className="card animate-slide-up delay-4">
          <div className="section-title">State-wise Stock Levels</div>
          <BarChart
            data={stockByState.map(s => ({ label: s.state, value: s.stock }))}
            color="var(--blue-400)"
            unit=" LMT"
            height={200}
          />
        </div>
      </div>

      {/* ── Stock Movement ── */}
      <div className="card animate-slide-up delay-4" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Stock Movement (Inflow / Outflow by State)</div>
        <DataTable
          columns={[
            { key: "state", label: "State" },
            { key: "stock", label: "Stock (LMT)", align: "right" },
            { key: "warehouses", label: "Warehouses", align: "right" },
            { key: "inflow", label: "Inflow (LMT)", align: "right" },
            { key: "outflow", label: "Outflow (LMT)", align: "right" },
            { key: "velocity", label: "Velocity", align: "center" },
          ]}
          rows={stockByState.map(s => ({
            state: s.state,
            stock: s.stock.toFixed(1),
            warehouses: s.warehouses.toString(),
            inflow: s.inflow.toFixed(2),
            outflow: s.outflow.toFixed(2),
            velocity: (
              <span className={`badge ${s.outflow / s.inflow >= 0.7 ? "badge-green" : s.outflow / s.inflow >= 0.5 ? "badge-amber" : "badge-red"}`}>
                {s.outflow / s.inflow >= 0.7 ? "✓ High" : s.outflow / s.inflow >= 0.5 ? "◬ Medium" : "▼ Low"}
              </span>
            ),
          }))}
        />
      </div>

      {/* ── Blocked Stock & Low Stock ── */}
      <div className="grid-2">
        {/* Blocked Stock Schemes */}
        <div className="card animate-slide-up delay-5">
          <div className="section-title">Blocked Stock under Schemes</div>
          <DataTable
            columns={[
              { key: "scheme", label: "Scheme" },
              { key: "commodity", label: "Commodity" },
              { key: "qty", label: "Qty (LMT)", align: "right" },
              { key: "status", label: "Status", align: "center" },
            ]}
            rows={blockedStockSchemes.map(b => ({
              scheme: b.scheme,
              commodity: b.commodity,
              qty: b.qty.toFixed(2),
              status: (
                <span className={`badge ${b.status === "active" ? "badge-green" : "badge-amber"}`}>
                  {b.status === "active" ? "✓ Active" : "◬ Pending"}
                </span>
              ),
            }))}
          />
        </div>

        {/* Low Stock Warehouses */}
        <div className="card animate-slide-up delay-6">
          <div className="section-title" style={{ color: "var(--amber-400)" }}>
            ⚑ Low Stock Warehouses (5–10 MT)
          </div>
          <DataTable
            columns={[
              { key: "warehouse", label: "Warehouse" },
              { key: "state", label: "State" },
              { key: "commodity", label: "Commodity" },
              { key: "stock", label: "Stock (MT)", align: "right" },
            ]}
            rows={lowStockWarehouses.map(w => ({
              warehouse: w.warehouse,
              state: w.state,
              commodity: w.commodity,
              stock: (
                <span style={{ color: w.stock <= 6 ? "var(--red-400)" : "var(--amber-400)", fontWeight: 600 }}>
                  {w.stock.toFixed(1)}
                </span>
              ),
            }))}
          />
          <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
            Consider local market disposal or warehouse consolidation to minimize storage charges.
          </div>
        </div>
      </div>
    </>
  );
}
