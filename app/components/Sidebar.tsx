"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Overview", icon: "⬡" },
  { href: "/procurement", label: "Procurement", icon: "◈" },
  { href: "/disposal", label: "Disposal / E-Auction", icon: "◇" },
  { href: "/inventory", label: "Inventory & Stock", icon: "▦" },
  { href: "/market", label: "Market Intelligence", icon: "◎" },
  { href: "/alerts", label: "Alerts & Exceptions", icon: "⚑" },
  { href: "/financial", label: "Financial & Sales", icon: "▤" },
  { href: "/data-sources", label: "Data Sources", icon: "⊞" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div style={{ padding: "1.5rem 1.25rem 1rem", borderBottom: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            width: 40, height: 40,
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--saffron-500), var(--gold-500))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: "1.1rem", color: "#0a0f1e",
            fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          }}>
            N
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
              fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}>NCCF</div>
            <div style={{
              fontSize: "0.7rem", color: "var(--text-muted)",
              letterSpacing: "0.06em", textTransform: "uppercase",
            }}>MD Dashboard</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "0.75rem 0", flex: 1 }}>
        <div style={{
          padding: "0 1.25rem", marginBottom: "0.5rem",
          fontSize: "0.65rem", fontWeight: 600, color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.1em",
        }}>
          KPI Sections
        </div>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-link ${pathname === item.href ? "active" : ""}`}
          >
            <span className="sidebar-icon" style={{ fontSize: "1rem", width: "1.25rem", textAlign: "center" }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "1rem 1.25rem",
        borderTop: "1px solid var(--border-subtle)",
        fontSize: "0.7rem", color: "var(--text-muted)",
      }}>
        <div>National Cooperative</div>
        <div>Consumers&apos; Federation Ltd.</div>
        <div style={{ marginTop: "0.25rem", color: "var(--text-muted)", opacity: 0.6 }}>
          FY 2025-26
        </div>
      </div>
    </aside>
  );
}
