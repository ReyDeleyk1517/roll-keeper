import { useState } from "react"

interface DiceActionModalProps {
  open: boolean
  title: string
  accent?: "red" | "green"
  onCancel: () => void
  onConfirm: (total: number, rolls: number[]) => void
}

function DiceActionModal({
  open,
  title,
  accent = "red",
  onCancel,
  onConfirm,
}: DiceActionModalProps) {
  const [diceCount, setDiceCount] = useState(1)
  const [diceSides, setDiceSides] = useState(6)
  const [bonus, setBonus] = useState(0)

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

  function handleConfirm() {
    const rolls = Array.from({ length: diceCount }, () =>
      Math.floor(Math.random() * diceSides) + 1
    )

    const total = rolls.reduce((a, b) => a + b, 0) + bonus
    onConfirm(total, rolls)
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

        <div className="flex flex-col gap-3">
          <Input
            label="Number of dice"
            min={1}
            value={diceCount}
            onChange={setDiceCount}
          />
          <Input
            label="Dice sides"
            min={2}
            value={diceSides}
            onChange={setDiceSides}
          />
          <Input label="Bonus" value={bonus} onChange={setBonus} />
        </div>

        <div className="flex gap-2 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-3 py-1.5 text-[10px] uppercase font-bold bg-zinc-800 border border-zinc-700 rounded text-zinc-400 hover:bg-zinc-700"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className={`flex-1 px-3 py-1.5 text-[10px] uppercase font-black border rounded ${accentStyles.bg} ${accentStyles.border} ${accentStyles.text}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  min,
  onChange,
}: {
  label: string
  value: number
  min?: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="text-[10px] uppercase text-zinc-500 font-bold">
        {label}
      </label>
      <input
        type="number"
        min={min}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-xs text-white"
      />
    </div>
  )
}

export default DiceActionModal