export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Tutup modal dialog"
            className="text-slate-500 hover:text-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center rounded"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}