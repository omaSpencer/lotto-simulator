'use client'

import { DicesIcon, RefreshCwIcon } from 'lucide-react'
import { useState } from 'react'

import { cn, getNonSelectedNumbers } from '@/lib/utils'

export function DrawPanelNumbers({
  title,
  numbers,
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
  onShuffleNumbers?: () => void
  onResetNumbers?: () => void
  onPickNumber?: (picked: number, index: number) => void
}) {
  const [open, setOpen] = useState(
    numbers.flatMap(() => [false])
  )

  const onHandlePickNumber = (num: number, index: number) => () => {
    if (isRunning) return
    onPickNumber?.(num, index)
  }

  const onHandleDropdown = (index: number) => () => {
    if (isRunning) return
    setOpen((prev) => prev.map((isOpen, i) => i === index ? !isOpen : false))
  }

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-y-2 gap-4 md:gap-7">
      <p className="basis-full md:basis-auto md:min-w-[140px] text-xs md:font-normal font-semibold md:text-base">{title}</p>
      <ul className="flex gap-3 md:gap-4">
        {numbers.map((number, idx) => (
          <li
            key={`${number}-${idx}`}
            className={cn("relative border border-primary shadow-float md:text-base text-xs py-1.25 md:py-1.5 md:px-3 min-w-[26px] md:min-w-[45px] text-center rounded-[10px]", !isRunning && "cursor-pointer")}
            onClick={onHandleDropdown(idx)}
          >
            <span>{number}</span>

            <ul className={cn("absolute z-10 bottom-[calc(100%_+_0.25rem)] md:bottom-[unset] md:top-[calc(100%_+_0.25rem)] left-0 w-full bg-white rounded-[10px] shadow-float max-h-[180px] overflow-y-auto hide-scrollbar opacity-0 transition-opacity duration-200 invisible", open[idx] && 'opacity-100 visible')}>
              {getNonSelectedNumbers(numbers).map((num, numIdx) => (
                <li
                  key={num}
                  className={cn(
                    'p-1 md:px-2 transition-colors duration-300 cursor-pointer hover:bg-primary/80 hover:text-white',
                    numIdx % 2 === 0 ? 'bg-white' : 'bg-neutral-100',
                  )}
                  onClick={onHandlePickNumber(num, idx)}
                >
                  {num}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {isEditable && !isRunning && (
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={onShuffleNumbers}
            className="h-7 w-7 md:w-9 md:h-9 rounded-full bg-primary/70 text-white flex items-center justify-center cursor-pointer group hover:bg-primary transition-colors duration-200 shadow-float"
          >
            <DicesIcon className="size-4 md:size-5 group-hover:animate-bounce duration-300" />
          </button>
          <button
            onClick={onResetNumbers}
            className="h-7 w-7 md:w-9 md:h-9 rounded-full bg-red-400 text-white flex items-center justify-center cursor-pointer hover:bg-red-500 transition-colors duration-200 shadow-float group"
          >
            <RefreshCwIcon className="size-4 md:size-5 group-hover:animate-spin duration-500" />
          </button>
        </div>
      )}
    </div>
  )
}
