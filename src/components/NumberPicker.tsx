'use client'

type Props = {
  selected: number[] | null
  setSelected: (nums: number[] | null) => void
  disabled?: boolean
}

export default function NumberPicker({
  selected,
  setSelected,
  disabled,
}: Props) {
  const toggleNumber = (n: number) => {
    if (!selected) return setSelected([n])
    if (selected.includes(n)) {
      const newSet = selected.filter((i) => i !== n)
      return setSelected(newSet.length ? newSet : null)
    } else {
      if (selected.length >= 5) return
      return setSelected([...selected, n].sort((a, b) => a - b))
    }
  }

  return (
    <div>
      <p className="mb-2 font-medium">Pick 5 Numbers (optional)</p>
      <div className="grid grid-cols-9 gap-1">
        {Array.from({ length: 90 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            disabled={disabled}
            className={`text-sm w-8 h-8 rounded-full border text-center ${selected?.includes(n) ? 'bg-indigo-500 text-white' : 'bg-white text-black'}`}
            onClick={() => toggleNumber(n)}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}
