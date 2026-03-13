"use client";

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}

const defaultColors = [
  "var(--saffron-500)", "var(--blue-400)", "var(--green-400)",
  "var(--amber-400)", "#c084fc", "#f472b6", "#67e8f9",
];

export default function DonutChart({
  data, size = 180, centerLabel, centerValue,
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 70;
  const strokeWidth = 28;
  const circumference = 2 * Math.PI * radius;
  let cumulativePercent = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ flexShrink: 0 }}>
        {data.map((d, i) => {
          const percent = d.value / total;
          const offset = cumulativePercent * circumference;
          const dash = percent * circumference;
          cumulativePercent += percent;
          return (
            <circle
              key={i}
              cx="100" cy="100" r={radius}
              fill="none"
              stroke={d.color || defaultColors[i % defaultColors.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dasharray 0.8s ease" }}
            >
              <title>{d.label}: {d.value} ({(percent * 100).toFixed(1)}%)</title>
            </circle>
          );
        })}
        {centerLabel && (
          <>
            <text x="100" y="94" textAnchor="middle" fill="var(--text-primary)"
              fontSize="22" fontWeight="700" fontFamily="var(--font-sans, 'DM Sans', sans-serif)">
              {centerValue}
            </text>
            <text x="100" y="114" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
              {centerLabel}
            </text>
          </>
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", minWidth: 120 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem" }}>
            <div style={{
              width: 10, height: 10, borderRadius: 2, flexShrink: 0,
              background: d.color || defaultColors[i % defaultColors.length],
            }} />
            <span style={{ color: "var(--text-secondary)", flex: 1 }}>{d.label}</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
              {(d.value / total * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
