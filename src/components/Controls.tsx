'use client'

import { Checkbox } from './Checkbox'
import { Slider } from './Slider'

function ControlsNumbers({
  title,
  numbers,
}: {
  title: string
  numbers: number[]
}) {
  return (
    <div className="flex items-center gap-7">
      <p className="min-w-[140px]">{title}</p>
      <ul className="flex gap-4">
        {numbers.map((number) => (
          <li
            key={number}
            className="border border-primary shadow-float py-1.5 px-3 rounded-[10px]"
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}

export type ControlsProps = {
  winningNumbers: number[]
  playerNumbers: number[]
  isRandom: boolean
  speed: number
}

export const Controls = ({
  winningNumbers,
  playerNumbers,
  isRandom,
  speed,
}: ControlsProps) => {
  return (
    <article className="space-y-6">
      <div className="space-y-6">
        <ControlsNumbers title="Winning numbers:" numbers={winningNumbers} />
        <ControlsNumbers title="Your numbers:" numbers={playerNumbers} />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-[57px]">
          <label>Play with random numbers:</label>
          <Checkbox
            name="isRandom"
            checked={isRandom}
            onCheckedChange={(checked) => {}}
            className="shadow-float"
          />
        </div>

        <div className="flex flex-col gap-4">
          <label>Speed</label>
          <Slider
            value={[speed]}
            min={10}
            max={1000}
            onValueChange={(value) => {}}
          />
        </div>
      </div>
    </article>
  )
}
