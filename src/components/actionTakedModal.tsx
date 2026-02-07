

interface ActionTakedModalProps {
  open: boolean
  title: string
  message: string
  accent?: "red" | "green"
  onCancel: () => void

}

function ActionTakedModal({
  open,
  title,
  message,
  accent = "red",
  onCancel,
}: ActionTakedModalProps) {

  if (!open) return null

  const accentStyles =
    accent === "green"
      ? {
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/20",
          text: "text-emerald-400",
        }
      : {
          border: "border-red-500/30",
          bg: "bg-red-500/20",
          text: "text-red-400",
        }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`bg-zinc-950 border rounded-xl p-6 w-full max-w-sm shadow-2xl ${accentStyles.border}`}
      >
        <h3
          className={`text-sm font-black uppercase tracking-widest mb-4 ${accentStyles.text}`}
        >
          {title}
        </h3>

        <span className="text-cyan-400 font-bold text-xs tracking-wider">{message}</span>


        <div className="flex gap-2 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-1.5 text-[10px] uppercase font-bold bg-zinc-800 border border-zinc-700 rounded text-zinc-400 hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActionTakedModal