"use client";

interface AlertCardProps {
  type: "critical" | "warning" | "info";
  category: string;
  title: string;
  description: string;
  timestamp: string;
  delay?: number;
}

export default function AlertCard({ type, category, title, description, timestamp, delay = 0 }: AlertCardProps) {
  const delayClass = delay > 0 ? `delay-${delay}` : "";
  const typeClass = type === "critical" ? "alert-critical" : type === "warning" ? "alert-warning" : "alert-info";
  const badgeClass = type === "critical" ? "badge-red" : type === "warning" ? "badge-amber" : "badge-blue";
  const icon = type === "critical" ? "⚠" : type === "warning" ? "◬" : "ℹ";

  return (
    <div className={`card ${typeClass} animate-slide-up ${delayClass}`} style={{ padding: "1rem 1.25rem" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <span className={`badge ${badgeClass}`}>
              {icon} {category}
            </span>
            <span style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>{timestamp}</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            {title}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
