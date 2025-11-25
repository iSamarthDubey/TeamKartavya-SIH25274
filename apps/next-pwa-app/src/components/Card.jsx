export default function Card({ children }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-5 border border-gray-100">
      {children}
    </div>
  );
}
