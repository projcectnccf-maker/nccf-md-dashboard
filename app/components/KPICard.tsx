"use client";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number; // percentage
  changeLabel?: string;
  icon?: string;
  accentColor?: string;
  delay?: number; // animation stagger
  sparkline?: number[]; // optional mini sparkline
}

export default function KPICard({
  title, value, subtitle, change, changeLabel, icon, accentColor, delay = 0, sparkline,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  const delayClass = delay > 0 ? `delay-${delay}` : "";

  // Generate sparkline SVG path
  const sparklinePath = sparkline && sparkline.length > 1 ? (() => {
    const max = Math.max(...sparkline);
    const min = Math.min(...sparkline);
    const range = max - min || 1;
    const w = 100;
    const h = 28;
    const points = sparkline.map((v, i) => {
      const x = (i / (sparkline.length - 1)) * w;
      const y = h - ((v - min) / range) * h + 2;
      return `${x},${y}`;
    });
    return `M${points.join(" L")}`;
  })() : null;

  return (
    <div className={`card animate-slide-up ${delayClass}`} style={{ position: "relative", overflow: "hidden" }}>
      {/* Accent top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: accentColor || "var(--saffron-500)",
        opacity: 0.7,
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {title}
        </div>
        {icon && (
          <span style={{ fontSize: "1.25rem", opacity: 0.5 }}>{icon}</span>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{
            fontSize: "1.85rem", fontWeight: 700,
            fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>
            {value}
          </div>
          {subtitle && (
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              {subtitle}
            </div>
          )}
          {change !== undefined && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              marginTop: "0.5rem", fontSize: "0.78rem", fontWeight: 600,
              color: isPositive ? "var(--green-400)" : "var(--red-400)",
            }}>
              <span>{isPositive ? "▲" : "▼"}</span>
              <span>{Math.abs(change).toFixed(1)}%</span>
              {changeLabel && (
                <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "2px" }}>
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        {sparklinePath && (
          <svg width="100" height="32" viewBox="0 0 100 32" style={{ opacity: 0.5, flexShrink: 0 }}>
            <defs>
              <linearGradient id={`sp-${title.replace(/\s+/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accentColor || "var(--saffron-400)"} stopOpacity="0.3" />
                <stop offset="100%" stopColor={accentColor || "var(--saffron-400)"} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparklinePath + ` L100,32 L0,32 Z`} fill={`url(#sp-${title.replace(/\s+/g, "")})`} />
            <path d={sparklinePath} fill="none" stroke={accentColor || "var(--saffron-400)"} strokeWidth="1.5" />
          </svg>
        )}
      </div>
    </div>
  );
}
