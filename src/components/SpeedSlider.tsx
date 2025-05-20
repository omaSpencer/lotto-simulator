'use client'

type Props = {
  speed: number
  setSpeed: (v: number) => void
  disabled?: boolean
}

export default function SpeedSlider({ speed, setSpeed, disabled }: Props) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        Simulation Speed: {speed}ms
      </label>
      <input
        type="range"
        min={10}
        max={1000}
        step={10}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        disabled={disabled}
      />
    </div>
  )
}
