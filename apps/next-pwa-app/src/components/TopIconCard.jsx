export default function TopIconCard({ children }) {
  return (
    <div className="mt-10 flex justify-center">
      <div className="h-28 w-28 rounded-3xl bg-gradient-to-b from-[#4BBF71] to-[#1F8A4C] flex items-center justify-center shadow-lg">
        <div className="h-20 w-20 rounded-3xl bg-[#CFF3D8] flex items-center justify-center">
          {/* children can be emoji or svg */}
          <span className="text-4xl">{children}</span>
        </div>
      </div>
    </div>
  );
}
