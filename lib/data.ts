// ═══════════════════════════════════════════════════════════════
//  NCCF MD Dashboard — Mock Data Layer
// ═══════════════════════════════════════════════════════════════

// ── Procurement ─────────────────────────────────────────────
export const procurementOverview = {
  totalProcured: { current: 12.4, previous: 10.0, unit: "LMT", season: "Kharif 2025", prevSeason: "Kharif 2024" },
  centresOpened: 1842,
  centresActive: 1563,
  farmersRegistered: 285400,
  farmersBenefitted: 218760,
  farmersPaymentDone: 197200,
  sanctionedQty: 15.0,
  actualQty: 12.4,
};

export const commodityProcurement = [
  { commodity: "Moong", qty: 3.2, value: 2340, share: 25.8, unit: "LMT" },
  { commodity: "Urad", qty: 2.8, value: 2100, share: 22.6, unit: "LMT" },
  { commodity: "Tur/Arhar", qty: 2.1, value: 1470, share: 16.9, unit: "LMT" },
  { commodity: "Groundnut", qty: 1.9, value: 1050, share: 15.3, unit: "LMT" },
  { commodity: "Soybean", qty: 1.3, value: 680, share: 10.5, unit: "LMT" },
  { commodity: "Mustard", qty: 0.7, value: 410, share: 5.6, unit: "LMT" },
  { commodity: "Copra", qty: 0.4, value: 280, share: 3.2, unit: "LMT" },
];

export const stateProcurement = [
  { state: "Madhya Pradesh", qty: 3.8, centres: 420, farmers: 68200 },
  { state: "Rajasthan", qty: 2.6, centres: 310, farmers: 52100 },
  { state: "Maharashtra", qty: 2.1, centres: 280, farmers: 43500 },
  { state: "Karnataka", qty: 1.5, centres: 220, farmers: 31200 },
  { state: "Gujarat", qty: 1.2, centres: 195, farmers: 28900 },
  { state: "Uttar Pradesh", qty: 0.7, centres: 175, farmers: 21300 },
  { state: "Telangana", qty: 0.5, centres: 142, farmers: 18400 },
  { state: "Andhra Pradesh", qty: 0.3, centres: 100, farmers: 14500 },
];

export const weeklyProcurementTrend = [
  { week: "W1", qty: 0.6 }, { week: "W2", qty: 0.85 }, { week: "W3", qty: 1.1 },
  { week: "W4", qty: 1.4 }, { week: "W5", qty: 1.65 }, { week: "W6", qty: 1.9 },
  { week: "W7", qty: 2.2 }, { week: "W8", qty: 2.55 }, { week: "W9", qty: 2.7 },
  { week: "W10", qty: 3.1 }, { week: "W11", qty: 3.4 }, { week: "W12", qty: 3.8 },
];

export const seasonComparison = [
  { season: "Kharif 2023", totalQty: 8.5, states: 12, centres: 1420 },
  { season: "Rabi 2023-24", totalQty: 5.2, states: 10, centres: 980 },
  { season: "Kharif 2024", totalQty: 10.0, states: 14, centres: 1650 },
  { season: "Rabi 2024-25", totalQty: 6.8, states: 12, centres: 1150 },
  { season: "Kharif 2025", totalQty: 12.4, states: 16, centres: 1842 },
];

export const farmerPaymentAging = [
  { stage: "Dispatch Pending", count: 4210, avgDays: 2.1, status: "normal" },
  { stage: "WHR Generation", count: 3180, avgDays: 3.5, status: "normal" },
  { stage: "PACS/SLA Processing", count: 5620, avgDays: 5.2, status: "warning" },
  { stage: "Branch Processing", count: 2840, avgDays: 4.8, status: "warning" },
  { stage: "HO Approval", count: 1950, avgDays: 6.3, status: "critical" },
  { stage: "Bank Transfer", count: 3410, avgDays: 3.1, status: "normal" },
];

// ── Disposal / E-Auction ────────────────────────────────────
export const disposalOverview = {
  totalDisposed: { current: 7.8, previous: 6.1, unit: "LMT" },
  totalRevenue: 5840,
  avgRealization: 107.2,
  activeBidders: 1842,
  uniqueBidders: 956,
};

export const disposalByCommodity = [
  { commodity: "Moong", qtySold: 2.1, revenue: 1680, realization: 108.5 },
  { commodity: "Urad", qtySold: 1.8, revenue: 1260, realization: 104.2 },
  { commodity: "Tur/Arhar", qtySold: 1.5, revenue: 1125, realization: 110.3 },
  { commodity: "Groundnut", qtySold: 1.2, revenue: 840, realization: 98.7 },
  { commodity: "Soybean", qtySold: 0.7, revenue: 525, realization: 105.6 },
  { commodity: "Mustard", qtySold: 0.5, revenue: 410, realization: 112.1 },
];

export const weeklyDisposalTrend = [
  { week: "W1", qty: 0.4, price: 6850 }, { week: "W2", qty: 0.55, price: 6920 },
  { week: "W3", qty: 0.7, price: 7010 }, { week: "W4", qty: 0.85, price: 6880 },
  { week: "W5", qty: 0.65, price: 7150 }, { week: "W6", qty: 0.9, price: 7240 },
  { week: "W7", qty: 1.1, price: 7180 }, { week: "W8", qty: 0.95, price: 7310 },
  { week: "W9", qty: 0.75, price: 7050 }, { week: "W10", qty: 1.05, price: 7420 },
  { week: "W11", qty: 0.9, price: 7380 }, { week: "W12", qty: 1.0, price: 7500 },
];

export const biddersByState = [
  { state: "Maharashtra", active: 320, unique: 180 },
  { state: "Madhya Pradesh", active: 290, unique: 165 },
  { state: "Rajasthan", active: 250, unique: 140 },
  { state: "Karnataka", active: 210, unique: 115 },
  { state: "Gujarat", active: 195, unique: 105 },
  { state: "Uttar Pradesh", active: 180, unique: 95 },
];

// ── Inventory / Stock ───────────────────────────────────────
export const stockOverview = {
  totalStock: 4.6,
  freeStock: 3.2,
  blockedStock: 1.4,
  inflow: 1.8,
  outflow: 1.2,
  liftedQty: 0.95,
};

export const stockByCommodity = [
  { commodity: "Moong", stock: 1.4, free: 1.0, blocked: 0.4, warehouses: 85 },
  { commodity: "Urad", stock: 1.1, free: 0.8, blocked: 0.3, warehouses: 72 },
  { commodity: "Tur/Arhar", stock: 0.8, free: 0.5, blocked: 0.3, warehouses: 58 },
  { commodity: "Groundnut", stock: 0.6, free: 0.4, blocked: 0.2, warehouses: 45 },
  { commodity: "Soybean", stock: 0.4, free: 0.3, blocked: 0.1, warehouses: 32 },
  { commodity: "Mustard", stock: 0.3, free: 0.2, blocked: 0.1, warehouses: 28 },
];

export const stockByState = [
  { state: "Madhya Pradesh", stock: 1.5, warehouses: 45, inflow: 0.6, outflow: 0.4 },
  { state: "Rajasthan", stock: 1.0, warehouses: 38, inflow: 0.4, outflow: 0.3 },
  { state: "Maharashtra", stock: 0.8, warehouses: 30, inflow: 0.3, outflow: 0.2 },
  { state: "Karnataka", stock: 0.5, warehouses: 22, inflow: 0.2, outflow: 0.15 },
  { state: "Gujarat", stock: 0.4, warehouses: 18, inflow: 0.15, outflow: 0.1 },
  { state: "Uttar Pradesh", stock: 0.4, warehouses: 15, inflow: 0.15, outflow: 0.05 },
];

export const lowStockWarehouses = [
  { warehouse: "Indore-WH-14", state: "Madhya Pradesh", commodity: "Moong", stock: 7.2, capacity: 500 },
  { warehouse: "Jaipur-WH-08", state: "Rajasthan", commodity: "Mustard", stock: 5.8, capacity: 400 },
  { warehouse: "Nagpur-WH-03", state: "Maharashtra", commodity: "Tur", stock: 8.5, capacity: 600 },
  { warehouse: "Hubli-WH-11", state: "Karnataka", commodity: "Groundnut", stock: 6.1, capacity: 350 },
  { warehouse: "Kota-WH-05", state: "Rajasthan", commodity: "Soybean", stock: 9.3, capacity: 450 },
  { warehouse: "Bhopal-WH-02", state: "Madhya Pradesh", commodity: "Urad", stock: 8.0, capacity: 500 },
];

export const blockedStockSchemes = [
  { scheme: "PMGKAY Allocation", qty: 0.45, commodity: "Moong", status: "active" },
  { scheme: "State Welfare Distribution", qty: 0.35, commodity: "Urad", status: "active" },
  { scheme: "Open Market Sale Scheme (OMSS)", qty: 0.28, commodity: "Tur", status: "pending" },
  { scheme: "Strategic Reserve", qty: 0.18, commodity: "Groundnut", status: "active" },
  { scheme: "Export Allocation", qty: 0.14, commodity: "Soybean", status: "pending" },
];

// ── Market Intelligence ─────────────────────────────────────
export const mandiPrices = [
  { commodity: "Moong", msp: 8558, avgMandi: 7820, maxMandi: 9200, minMandi: 6800, trend: "up" as const },
  { commodity: "Urad", msp: 7400, avgMandi: 6950, maxMandi: 8100, minMandi: 5900, trend: "down" as const },
  { commodity: "Tur/Arhar", msp: 7550, avgMandi: 8200, maxMandi: 9800, minMandi: 7100, trend: "up" as const },
  { commodity: "Groundnut", msp: 6377, avgMandi: 6100, maxMandi: 7200, minMandi: 5400, trend: "down" as const },
  { commodity: "Soybean", msp: 4892, avgMandi: 4650, maxMandi: 5100, minMandi: 4200, trend: "stable" as const },
  { commodity: "Mustard", msp: 5650, avgMandi: 5980, maxMandi: 6800, minMandi: 5200, trend: "up" as const },
];

export const priceForecast = [
  { month: "Jan", moong: 7600, urad: 7100, tur: 7800 },
  { month: "Feb", moong: 7850, urad: 7050, tur: 7950 },
  { month: "Mar", moong: 7920, urad: 6900, tur: 8100 },
  { month: "Apr", moong: 8100, urad: 6850, tur: 8250 },
  { month: "May", moong: 8350, urad: 6950, tur: 8400 },
  { month: "Jun", moong: 8500, urad: 7000, tur: 8550 },
  { month: "Jul", moong: 8650, urad: 7100, tur: 8700 },
  { month: "Aug", moong: 8800, urad: 7200, tur: 8500 },
  { month: "Sep", moong: 8558, urad: 7400, tur: 8200 },
  { month: "Oct", moong: 8400, urad: 7350, tur: 8050 },
  { month: "Nov", moong: 8200, urad: 7250, tur: 7900 },
  { month: "Dec", moong: 8050, urad: 7150, tur: 7750 },
];

export const mandiArrivals = [
  { mandi: "Latur", state: "Maharashtra", commodity: "Tur", arrivals: 1250, price: 8450 },
  { mandi: "Indore", state: "Madhya Pradesh", commodity: "Soybean", arrivals: 980, price: 4780 },
  { mandi: "Jaipur", state: "Rajasthan", commodity: "Mustard", arrivals: 1420, price: 6120 },
  { mandi: "Gulbarga", state: "Karnataka", commodity: "Tur", arrivals: 870, price: 8280 },
  { mandi: "Akola", state: "Maharashtra", commodity: "Moong", arrivals: 650, price: 8100 },
  { mandi: "Rajkot", state: "Gujarat", commodity: "Groundnut", arrivals: 1100, price: 6050 },
  { mandi: "Bhopal", state: "Madhya Pradesh", commodity: "Moong", arrivals: 780, price: 7950 },
  { mandi: "Bikaner", state: "Rajasthan", commodity: "Moong", arrivals: 560, price: 8250 },
];

// ── Alerts & Exceptions ─────────────────────────────────────
export const alerts = [
  { id: 1, type: "critical" as const, category: "Target Lag", title: "UP procurement at 35% of sanctioned quantity", description: "Uttar Pradesh has procured only 0.7 LMT against sanctioned 2.0 LMT. Immediate intervention required.", timestamp: "2 hours ago" },
  { id: 2, type: "critical" as const, category: "Stock Aging", title: "14 warehouses with stock age > 4 months", description: "Warehouses in MP (6), Rajasthan (4), and Maharashtra (4) holding old stock. Risk of quality deterioration.", timestamp: "3 hours ago" },
  { id: 3, type: "warning" as const, category: "Price Deviation", title: "Groundnut market price below MSP by 4.3%", description: "Average mandi price ₹6,100/q vs MSP ₹6,377/q. Consider increasing procurement pace.", timestamp: "5 hours ago" },
  { id: 4, type: "warning" as const, category: "Payment Delay", title: "HO approval stage averaging 6.3 days", description: "1,950 farmers pending at HO approval stage with average processing time exceeding SLA.", timestamp: "6 hours ago" },
  { id: 5, type: "warning" as const, category: "Centre Activity", title: "279 centres showing zero procurement in last 7 days", description: "Multiple centres in Telangana and AP inactive. May indicate operational issues or season end.", timestamp: "8 hours ago" },
  { id: 6, type: "info" as const, category: "Logistics", title: "Transport delay in Karnataka region", description: "Rain-related transport delays affecting 12 procurement centres in northern Karnataka.", timestamp: "10 hours ago" },
  { id: 7, type: "critical" as const, category: "Stock Aging", title: "8 warehouses with Urad stock > 3 months", description: "Consider local market disposal or OMSS allocation to prevent storage cost escalation.", timestamp: "12 hours ago" },
  { id: 8, type: "warning" as const, category: "Bottleneck", title: "WHR generation backlog in Rajasthan", description: "3,180 pending WHR across 15 centres. May delay farmer payments.", timestamp: "1 day ago" },
];

export const targetDeviations = [
  { state: "Uttar Pradesh", sanctioned: 2.0, actual: 0.7, pct: 35, status: "critical" as const },
  { state: "Telangana", sanctioned: 1.2, actual: 0.5, pct: 42, status: "critical" as const },
  { state: "Andhra Pradesh", sanctioned: 0.8, actual: 0.3, pct: 38, status: "critical" as const },
  { state: "Gujarat", sanctioned: 1.8, actual: 1.2, pct: 67, status: "warning" as const },
  { state: "Karnataka", sanctioned: 2.0, actual: 1.5, pct: 75, status: "warning" as const },
];

// ── Financial & Sales ───────────────────────────────────────
export const financialOverview = {
  totalProcurementValue: 8330,
  totalSalesRevenue: 5840,
  profitLoss: -248,
  turnoverRatio: 0.70,
  avgSalesRealization: 107.2,
};

export const financialByCommodity = [
  { commodity: "Moong", procValue: 2340, salesRev: 1680, profitLoss: 42, qtySold: 2.1 },
  { commodity: "Urad", procValue: 2100, salesRev: 1260, profitLoss: -108, qtySold: 1.8 },
  { commodity: "Tur/Arhar", procValue: 1470, salesRev: 1125, profitLoss: -62, qtySold: 1.5 },
  { commodity: "Groundnut", procValue: 1050, salesRev: 840, profitLoss: -35, qtySold: 1.2 },
  { commodity: "Soybean", procValue: 680, salesRev: 525, profitLoss: -48, qtySold: 0.7 },
  { commodity: "Mustard", procValue: 410, salesRev: 410, profitLoss: -37, qtySold: 0.5 },
];

export const monthlyFinancials = [
  { month: "Apr", procurement: 620, sales: 380, pl: -42 },
  { month: "May", procurement: 740, sales: 450, pl: -35 },
  { month: "Jun", procurement: 680, sales: 520, pl: 12 },
  { month: "Jul", procurement: 820, sales: 480, pl: -28 },
  { month: "Aug", procurement: 950, sales: 540, pl: -18 },
  { month: "Sep", procurement: 880, sales: 620, pl: 8 },
  { month: "Oct", procurement: 1050, sales: 680, pl: -22 },
  { month: "Nov", procurement: 960, sales: 740, pl: -38 },
  { month: "Dec", procurement: 850, sales: 710, pl: -15 },
  { month: "Jan", procurement: 720, sales: 620, pl: -32 },
  { month: "Feb", procurement: 560, sales: 550, pl: -18 },
  { month: "Mar", procurement: 500, sales: 550, pl: -20 },
];

// ── Data Source Mapping ─────────────────────────────────────
export const dataSourceMapping = [
  { category: "Procurement Metrics", kpi: "Total Quantity Procured / Commodity-wise Procurement", source: "NeML Procurement Reports / State Procurement Data", owner: "NeML / NCCF HO" },
  { category: "Procurement Metrics", kpi: "Centres Opened vs Active Centres", source: "NeML Procurement Reports / State Procurement Data", owner: "NeML / NCCF HO" },
  { category: "Procurement Metrics", kpi: "Farmers Registered vs Benefitted", source: "NeML Procurement Reports / State Procurement Data", owner: "NeML / Bank / NCCF" },
  { category: "Procurement Metrics", kpi: "Farmer Payment Aging", source: "NeML", owner: "NeML" },
  { category: "Disposal / E-Auction", kpi: "Total Quantity Disposed / Sales Realization", source: "E-Auction Reports", owner: "NCCF MPMS Portal" },
  { category: "Disposal / E-Auction", kpi: "Active / Unique Bidders", source: "E-Auction Bidder Logs", owner: "NCCF MPMS Portal" },
  { category: "Inventory Indicators", kpi: "Stock on Hand / Movement / Lifted Quantity", source: "Warehouse Stock Register / WHR Data", owner: "NCCF eStock Portal" },
  { category: "Inventory Indicators", kpi: "Blocked Stock under Schemes", source: "Scheme Allocation Register", owner: "NCCF eStock Portal" },
  { category: "Market Intelligence", kpi: "Mandi Prices & Arrivals", source: "Agmarknet API Integration", owner: "Agmarknet" },
  { category: "Market Intelligence", kpi: "Commodity Price Forecasting", source: "Historical Procurement & Market Data", owner: "Agmarknet" },
  { category: "Financial & Sales", kpi: "Procurement Value vs Sales Revenue", source: "Finance Ledger / Sales Invoice Data", owner: "NCCF MPMS / eStock Portal" },
  { category: "Alerts & Exceptions", kpi: "Target Deviations / Stock Aging Alerts", source: "Dashboard Exception Engine (Integrated Data)", owner: "IT" },
];
