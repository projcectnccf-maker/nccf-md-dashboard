import TrendChart from "../components/TrendChart";
import DataTable from "../components/DataTable";
import { mandiPrices, priceForecast, mandiArrivals } from "@/lib/data";

export default function MarketPage() {
  return (
    <>
      <div className="page-header">
        <h1>Market Intelligence &amp; Price Analytics</h1>
        <p>Agmarknet integration, price forecasting, and mandi arrivals</p>
      </div>

      {/* ── MSP vs Market Price ── */}
      <div className="card animate-slide-up delay-1" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">MSP vs Market Price Comparison</div>
        <div style={{
          display: "flex", gap: "0.75rem", marginBottom: "1rem", fontSize: "0.72rem", flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--saffron-500)" }} />
            <span style={{ color: "var(--text-secondary)" }}>MSP (₹/Quintal)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--blue-400)" }} />
            <span style={{ color: "var(--text-secondary)" }}>Avg Mandi Price</span>
          </div>
        </div>
        <DataTable
          columns={[
            { key: "commodity", label: "Commodity" },
            { key: "msp", label: "MSP (₹/Q)", align: "right" },
            { key: "avgMandi", label: "Avg Mandi", align: "right" },
            { key: "maxMandi", label: "Max", align: "right" },
            { key: "minMandi", label: "Min", align: "right" },
            { key: "deviation", label: "Deviation", align: "center" },
            { key: "trend", label: "Trend", align: "center" },
          ]}
          rows={mandiPrices.map(m => {
            const dev = ((m.avgMandi - m.msp) / m.msp * 100);
            return {
              commodity: m.commodity,
              msp: `₹${m.msp.toLocaleString()}`,
              avgMandi: `₹${m.avgMandi.toLocaleString()}`,
              maxMandi: `₹${m.maxMandi.toLocaleString()}`,
              minMandi: `₹${m.minMandi.toLocaleString()}`,
              deviation: (
                <span className={`badge ${dev >= 0 ? "badge-green" : "badge-red"}`}>
                  {dev >= 0 ? "+" : ""}{dev.toFixed(1)}%
                </span>
              ),
              trend: (
                <span style={{
                  color: m.trend === "up" ? "var(--green-400)" : m.trend === "down" ? "var(--red-400)" : "var(--text-muted)",
                  fontWeight: 600,
                }}>
                  {m.trend === "up" ? "▲ Rising" : m.trend === "down" ? "▼ Falling" : "● Stable"}
                </span>
              ),
            };
          })}
        />
      </div>

      {/* ── Price Forecasting ── */}
      <div className="card animate-slide-up delay-3" style={{ marginBottom: "1.5rem" }}>
        <div className="section-title">Commodity Price Forecast (12-Month)</div>
        <TrendChart
          labels={priceForecast.map(p => p.month)}
          lines={[
            { data: priceForecast.map(p => p.moong), color: "var(--saffron-500)", label: "Moong" },
            { data: priceForecast.map(p => p.urad), color: "var(--blue-400)", label: "Urad" },
            { data: priceForecast.map(p => p.tur), color: "var(--green-400)", label: "Tur/Arhar" },
          ]}
          height={240}
          unit="₹"
        />
        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
          Based on historical procurement and market data from Agmarknet. Forecasts are indicative.
        </div>
      </div>

      {/* ── Mandi Arrivals ── */}
      <div className="card animate-slide-up delay-5">
        <div className="section-title">Mandi-wise Arrivals &amp; Prices</div>
        <DataTable
          columns={[
            { key: "mandi", label: "Mandi" },
            { key: "state", label: "State" },
            { key: "commodity", label: "Commodity" },
            { key: "arrivals", label: "Arrivals (MT)", align: "right" },
            { key: "price", label: "Price (₹/Q)", align: "right" },
            { key: "indicator", label: "Decision Aid", align: "center" },
          ]}
          rows={mandiArrivals.map(m => {
            const mspRef = mandiPrices.find(p => p.commodity === m.commodity || p.commodity.startsWith(m.commodity.substring(0, 3)));
            const isBelowMsp = mspRef ? m.price < mspRef.msp : false;
            return {
              mandi: m.mandi,
              state: m.state,
              commodity: m.commodity,
              arrivals: m.arrivals.toLocaleString(),
              price: `₹${m.price.toLocaleString()}`,
              indicator: (
                <span className={`badge ${isBelowMsp ? "badge-green" : "badge-amber"}`}>
                  {isBelowMsp ? "◈ Procure" : "◬ Monitor"}
                </span>
              ),
            };
          })}
        />
        <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>
          Source: Agmarknet API. Prices below MSP indicate procurement opportunities; above MSP suggests favorable disposal conditions.
        </div>
      </div>
    </>
  );
}
