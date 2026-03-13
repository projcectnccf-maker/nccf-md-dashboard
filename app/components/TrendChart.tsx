"use client";

interface TrendLine {
  data: number[];
  color: string;
  label: string;
}

interface TrendChartProps {
  labels: string[];
  lines: TrendLine[];
  height?: number;
  unit?: string;
  showArea?: boolean;
}

export default function TrendChart({
  labels, lines, height = 200, unit = "", showArea = true,
}: TrendChartProps) {
  const allValues = lines.flatMap(l => l.data);
  const min = Math.min(...allValues) * 0.92;
  const max = Math.max(...allValues) * 1.08;
  const range = max - min || 1;

  const w = 560;
  const h = height;
  const padX = 40;
  const padY = 20;
  const chartW = w - padX * 2;
  const chartH = h - padY * 2;

  const getX = (i: number) => padX + (i / (labels.length - 1)) * chartW;
  const getY = (v: number) => padY + chartH - ((v - min) / range) * chartH;

  const gridLines = 5;
  const gridValues = Array.from({ length: gridLines }, (_, i) => min + (range * i) / (gridLines - 1));

  return (
    <div>
      {/* Legend */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", fontSize: "0.72rem", flexWrap: "wrap" }}>
        {lines.map((line) => (
          <div key={line.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 14, height: 3, borderRadius: 2, background: line.color }} />
            <span style={{ color: "var(--text-secondary)" }}>{line.label}</span>
          </div>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "auto", maxHeight: height }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid */}
        {gridValues.map((v, i) => (
          <g key={i}>
            <line x1={padX} y1={getY(v)} x2={w - padX} y2={getY(v)}
              stroke="var(--border-subtle)" strokeWidth="0.5" />
            <text x={padX - 6} y={getY(v) + 4}
              fill="var(--text-muted)" fontSize="9" textAnchor="end">
              {v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(0)}{unit}
            </text>
          </g>
        ))}

        {/* X labels */}
        {labels.map((label, i) => (
          <text key={i} x={getX(i)} y={h - 2}
            fill="var(--text-muted)" fontSize="9" textAnchor="middle">
            {label}
          </text>
        ))}

        {/* Lines */}
        {lines.map((line) => {
          const pathD = line.data.map((v, i) =>
            `${i === 0 ? "M" : "L"}${getX(i)},${getY(v)}`
          ).join(" ");

          const areaD = pathD + ` L${getX(line.data.length - 1)},${padY + chartH} L${getX(0)},${padY + chartH} Z`;

          return (
            <g key={line.label}>
              {showArea && (
                <path d={areaD} fill={line.color} opacity="0.08" />
              )}
              <path d={pathD} fill="none" stroke={line.color} strokeWidth="2" strokeLinejoin="round" />
              {/* Data dots */}
              {line.data.map((v, i) => (
                <circle key={i} cx={getX(i)} cy={getY(v)} r="3"
                  fill="var(--bg-body)" stroke={line.color} strokeWidth="1.5">
                  <title>{labels[i]}: {v.toLocaleString()}{unit}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
