import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: "default" | "accent";
};

export default function StatCard({ label, value, icon, accent = "default" }: StatCardProps) {
  const fallbackIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l4 4v12a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6" />
    </svg>
  );

  return (
    <div className="overview-stat-card">
      <div>
        <p className="overview-stat-label">{label}</p>
        <p className="overview-stat-value">{value}</p>
      </div>
      <div className={`stat-icon ${accent === "accent" ? "stat-icon--accent" : ""}`}>{icon ?? fallbackIcon}</div>
    </div>
  );
}
