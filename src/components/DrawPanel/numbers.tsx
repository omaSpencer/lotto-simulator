'use client'

import { DicesIcon, RefreshCwIcon } from 'lucide-react'

import { cn, getNonSelectedNumbers } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/Select'

export function DrawPanelNumbers({
  title,
  numbers,
  variant = 'winning',
  isEditable = false,
  isRunning,
  onShuffleNumbers,
  onResetNumbers,
  onPickNumber,
}: {
  title: string
  numbers: number[]
  isRunning?: boolean
  isEditable?: boolean
  variant?: 'winning' | 'player'
  onShuffleNumbers?: () => void
  onResetNumbers?: () => void
  onPickNumber?: (picked: number, index: number) => void
}) {
  const onHandlePickNumber = (index: number) => (value: string) => {
    if (isRunning || !isEditable) return
    onPickNumber?.(Number(value), index)
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-y-2 gap-4 md:gap-7">
      <p className="basis-full md:basis-auto md:min-w-[140px] text-xs md:font-normal font-semibold md:text-base">
        {title}
      </p>
      <ul className="flex gap-3 md:gap-4">
        {numbers.map((number, idx) => (
          <li
            key={`${number}-${idx}`}
            className={cn(
              'relative border border-primary shadow-float md:text-base text-xs py-1.25 md:py-1.5 w-[26px] md:w-[36px] text-center rounded-[10px]',
              !isRunning && isEditable && 'cursor-pointer',
            )}
          >
            <Select
              value={String(number)}
              onValueChange={onHandlePickNumber(idx)}
              disabled={isRunning || !isEditable}
            >
              <SelectTrigger
                className="w-full"
                data-cy={`draw-panel-${variant}-number-select-trigger-${idx}`}
              >
                {number}
              </SelectTrigger>
              <SelectContent>
                {getNonSelectedNumbers(numbers).map((num) => (
                  <SelectItem
                    key={num}
                    value={String(num)}
                    data-cy={`draw-panel-${variant}-number-select-item-${num}`}
                  >
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        ))}
      </ul>

      {isEditable && !isRunning && (
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={onShuffleNumbers}
            className="h-7 w-7 md:w-9 md:h-9 rounded-full bg-primary/70 text-white flex items-center justify-center cursor-pointer group hover:bg-primary transition-colors duration-200 shadow-float"
            data-cy="shuffle-numbers-button"
          >
            <DicesIcon className="size-4 md:size-5 group-hover:animate-shake duration-300" />
          </button>
          <button
            onClick={onResetNumbers}
            className="h-7 w-7 md:w-9 md:h-9 rounded-full bg-red-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors duration-200 shadow-float group"
            data-cy="reset-numbers-button"
          >
            <RefreshCwIcon className="size-4 md:size-5 group-hover:rotate-[66deg] transition-transform duration-500" />
          </button>
        </div>
      )}
    </div>
  )
}
