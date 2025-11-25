"use client";

export default function SelectableCard({
  label,
  subLabel,
  emoji,
  selected,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 rounded-3xl px-6 py-4 my-2 text-left shadow-md transition
      ${selected ? "bg-white ring-2 ring-[#29A35A]" : "bg-white/90"}
    `}
    >
      {emoji && (
        <div className="text-2xl">
          {emoji}
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-medium text-[#111827]">{label}</span>
        {subLabel && (
          <span className="text-sm text-[#4B5563] mt-1">{subLabel}</span>
        )}
      </div>
    </button>
  );
}
