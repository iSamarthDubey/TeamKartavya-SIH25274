import Header from "@/components/Header";

const demoNotifications = [
  { id: "n1", title: "Maize forward anchored", detail: "Contract C-001 has been anchored with buyer SH-208.", time: "2 hours ago" },
  { id: "n2", title: "Settlement window approaching", detail: "Wheat forward C-003 enters delivery window tomorrow.", time: "18 hours ago" },
  { id: "n3", title: "New farmer onboarded", detail: "Farmer #438 added 400kg Paddy exposure.", time: "1 day ago" },
];

export default function NotificationsPage() {
  return (
    <main className="space-y-6">
      <Header title="Notifications" subtitle="Latest alerts across contracts, settlements and risk." />
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent notifications</h2>
          <p className="text-sm text-gray-500 mt-1">This panel will surface system alerts, anchors and approvals.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {demoNotifications.map((note) => (
            <div key={note.id} className="p-6 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{note.title}</h3>
                <span className="text-xs text-gray-500">{note.time}</span>
              </div>
              <p className="text-sm text-gray-600">{note.detail}</p>
            </div>
          ))}
          <div className="p-6 text-sm text-gray-400 text-center">More notifications will appear here as they arrive.</div>
        </div>
      </section>
    </main>
  );
}

