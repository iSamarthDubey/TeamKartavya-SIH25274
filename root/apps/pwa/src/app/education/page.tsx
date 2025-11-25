export default function EducationPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-white px-4 pb-20 pt-4">
      <header className="mb-3">
        <h1 className="text-lg font-semibold text-zinc-900">Learn</h1>
        <p className="text-xs text-zinc-600">Short lessons in simple Hindi & English</p>
      </header>
      <div className="space-y-2">
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="font-semibold">What is hedging?</p>
          <p className="mt-1 text-xs text-zinc-600">How a forward contract protects your price</p>
        </div>
        <div className="rounded-2xl border border-zinc-100 bg-white p-4 text-sm shadow-sm">
          <p className="font-semibold">How to read our forecast</p>
          <p className="mt-1 text-xs text-zinc-600">Understanding bands and uncertainty</p>
        </div>
      </div>
    </main>
  );
}
