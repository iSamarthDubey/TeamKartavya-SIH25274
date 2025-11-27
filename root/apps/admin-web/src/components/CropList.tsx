export default function CropList({ data }: { data: Record<string, { count: number; quantity: number }> }) {
  const entries = Object.entries(data ?? {});
  return (
    <div className="panel-card">
      <div className="panel-heading">Forwards by Crop</div>
      {entries.length === 0 ? (
        <p className="text-muted">No data yet.</p>
      ) : (
        <ul className="crop-list">
          {entries.map(([crop, value]) => (
            <li key={crop}>
              <span className="crop-name">{crop}</span>
              <span className="crop-meta">{value.count} forwards · {value.quantity} units</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
