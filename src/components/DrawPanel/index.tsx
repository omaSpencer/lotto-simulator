'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react'

import type { SimulationResultDraw } from '@/types'

import { generateRandomNumbers } from '@/lib/utils'

import { Checkbox } from '@/components/Checkbox'
import { Slider } from '@/components/Slider'

import { DrawPanelNumbers } from './numbers'
import { DrawPanelBtn } from './btn'

export type DrawPanelProps = {
  winningNumbers: number[]
  playerNumbers: number[]
  isRandom: boolean
  speed: number
  isRunning: boolean
  onStartSimulation: () => void
  onStopSimulation: () => void
  setState: Dispatch<SetStateAction<SimulationResultDraw>>
}

export const DrawPanel = ({
  winningNumbers,
  playerNumbers,
  speed,
  isRandom,
  isRunning,
  onStartSimulation,
  onStopSimulation,
  setState,
}: DrawPanelProps) => {
  const onValueChange = (value: number[]) => {
    setState((prev) => ({ ...prev, speed: value[0] }))
  }

  const onShuffleNumbers = () => {
    const shuffledPlayerNumbers = generateRandomNumbers()
    setState((prev) => ({
      ...prev,
      playerNumbers: shuffledPlayerNumbers,
      isRandom: false,
    }))
  }

  return (
    <article className="space-y-3 md:space-y-6">
      <div className="space-y-3 md:space-y-6">
        <DrawPanelNumbers title="Winning numbers:" numbers={winningNumbers} />
        <DrawPanelNumbers
          title="Your numbers:"
          numbers={playerNumbers}
          onShuffleNumbers={onShuffleNumbers}
          onResetNumbers={() =>
            setState((prev) => ({ ...prev, playerNumbers: [0, 0, 0, 0, 0] }))
          }
          onPickNumber={(picked, index) => {
            const newPlayerNumbers = [...playerNumbers]
            newPlayerNumbers[index] = picked
            setState((prev) => ({ ...prev, playerNumbers: newPlayerNumbers }))
          }}
          isEditable
          isRunning={isRunning}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6 md:gap-[57px]">
          <label className="md:min-w-[140px] text-xs md:font-normal font-semibold md:text-base">
            Play with random numbers:
          </label>
          <Checkbox
            name="isRandom"
            checked={isRandom}
            onCheckedChange={(checked) => {
              setState((prev) => ({
                ...prev,
                isRandom: checked as boolean,
                playerNumbers: checked ? [0, 0, 0, 0, 0] : prev.playerNumbers,
              }))
            }}
            className="shadow-float"
            disabled={isRunning}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label className="md:min-w-[140px] text-xs md:font-normal font-semibold md:text-base">
            Speed
          </label>
          <Slider
            value={[speed]}
            min={0}
            max={100}
            step={1}
            onValueChange={onValueChange}
            disabled={isRunning}
          />
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <DrawPanelBtn disabled={isRunning} onClick={onStartSimulation}>
            <PlayCircleIcon className="size-5" />
            <span>Start simulation</span>
          </DrawPanelBtn>

          <DrawPanelBtn
            className="bg-red-400"
            onClick={onStopSimulation}
            disabled={!isRunning}
          >
            <StopCircleIcon className="size-5" />
            <span>Stop simulation</span>
          </DrawPanelBtn>
        </div>
      </div>
    </article>
  )
}
