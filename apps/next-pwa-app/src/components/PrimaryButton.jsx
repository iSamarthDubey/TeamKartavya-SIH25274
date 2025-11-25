"use client";

export default function PrimaryButton({ children, disabled, onClick }) {
  const base =
    "w-full rounded-2xl py-4 text-center font-semibold shadow-md transition active:scale-[0.98]";
  const color = disabled
    ? "bg-[#E5ECEC] text-[#9BA3AF]"
    : "bg-[#29A35A] text-white";

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${color}`}
    >
      {children}
    </button>
  );
}
