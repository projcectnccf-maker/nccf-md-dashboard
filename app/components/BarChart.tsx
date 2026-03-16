"use client";

interface BarChartProps {
  data: { label: string; value: number; value2?: number }[];
  maxValue?: number;
  color?: string;
  color2?: string;
  label1?: string;
  label2?: string;
  unit?: string;
  height?: number;
}

export default function BarChart({
  data, maxValue, color = "var(--saffron-500)", color2 = "var(--blue-400)",
  label1 = "Primary", label2 = "Secondary", unit = "", height = 220,
}: BarChartProps) {
  const max = maxValue || Math.max(...data.map(d => Math.max(d.value, d.value2 || 0))) * 1.15;
  const hasSecondary = data.some(d => d.value2 !== undefined);
  const barWidth = hasSecondary ? 24 : 32;
  const gap = hasSecondary ? 4 : 0;
  const groupWidth = hasSecondary ? barWidth * 2 + gap : barWidth;

  return (
    <div>
      {hasSecondary && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", fontSize: "0.72rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            <span style={{ color: "var(--text-secondary)" }}>{label1}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: color2 }} />
            <span style={{ color: "var(--text-secondary)" }}>{label2}</span>
          </div>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height, padding: "0 4px" }}>
        {data.map((d, i) => {
          const h1 = (d.value / max) * height;
          const h2 = d.value2 !== undefined ? (d.value2 / max) * height : 0;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: `${gap}px`, height }}>
                <div style={{
                  width: barWidth, height: h1,
                  background: `linear-gradient(180deg, ${color}, color-mix(in srgb, ${color} 40%, transparent))`,
                  borderRadius: "4px 4px 1px 1px",
                  transition: "height 0.8s ease",
                  position: "relative",
                }} title={`${d.label}: ${d.value}${unit}`}>
                  {h1 > 20 && (
                    <div style={{
                      position: "absolute", top: 4, left: 0, right: 0,
                      textAlign: "center", fontSize: "0.6rem", fontWeight: 600,
                      color: "rgba(255,255,255,0.9)",
                    }}>
                      {d.value < 100 ? d.value.toFixed(1) : Math.round(d.value)}
                    </div>
                  )}
                </div>
                {hasSecondary && (
                  <div style={{
                    width: barWidth, height: h2,
                    background: `linear-gradient(180deg, ${color2}, color-mix(in srgb, ${color2} 40%, transparent))`,
                    borderRadius: "4px 4px 1px 1px",
                    transition: "height 0.8s ease",
                  }} title={`${d.label}: ${d.value2}${unit}`} />
                )}
              </div>
              <div style={{
                fontSize: "0.65rem", color: "var(--text-muted)",
                textAlign: "center", whiteSpace: "nowrap",
                maxWidth: groupWidth + 16, overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {d.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
