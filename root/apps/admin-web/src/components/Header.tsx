import Link from "next/link";
import ApiStatus from "@/components/ApiStatus";

export default function Header({ title = "Krishi Hedge Admin", subtitle = "Overview of farmer forwards, buyer matches and exposures (demo view)." }: { title?: string; subtitle?: string; }) {
  return (
    <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between page-hero">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold kh-accent-strong leading-tight">{title}</h1>
        <p className="text-sm md:text-base text-gray-600 mt-2">{subtitle}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block"><ApiStatus /></div>
      </div>
    </header>
  );
}
