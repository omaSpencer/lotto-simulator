'use client'

import { cn, formatNumber } from '@/lib/utils'

type Props = {
  numOfTickets: number
  yearsSpent: number
  costOfTickets: number
  winMatches: Record<number, number>
}

export const SimulationStats = ({
  numOfTickets,
  yearsSpent,
  costOfTickets,
  winMatches,
}: Props) => {
  return (
    <>
      <div className="bg-primary text-white rounded-[10px] p-3 md:py-4 md:px-6 font-bold gap-1.5 inline-flex flex-col w-full sm:w-fit sm:min-w-[325px]">
        <p className="flex items-center gap-6 text-sm lg:text-base">
          <span className="min-w-[142px]">Number of tickets:</span>
          <span className="font-[800]">
            {formatNumber(numOfTickets, {
              notation: 'standard',
              useGrouping: true,
            })}
          </span>
        </p>
        <p className="flex items-center gap-6 text-sm">
          <span className="min-w-[142px]">Years spent:</span>
          <span>{yearsSpent}</span>
        </p>
        <p className="flex items-center gap-6 text-sm">
          <span className="min-w-[142px]">Cost of tickets:</span>
          <span>
            {formatNumber(costOfTickets, {
              notation: 'standard',
              useGrouping: true,
              style: 'currency',
              currency: 'HUF',
              currencyDisplay: 'symbol',
            })}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 w-full sm:w-fit">
        {Object.entries(winMatches).map(([key, value], idx) => (
          <p
            key={key}
            className={cn(
              'flex flex-col justify-between items-center shadow-float border border-secondary p-3 font-bold gap-2.5 min-w-[127px]',
              idx === 0 && 'sm:rounded-l-[10px]',
              idx === Object.keys(winMatches).length - 1 &&
                'sm:rounded-r-[10px]',
              idx === 0 && 'max-sm:rounded-tl-[10px]',
              idx === 1 && 'max-sm:rounded-tr-[10px]',
              idx === 2 && 'max-sm:rounded-bl-[10px]',
              idx === 3 && 'max-sm:rounded-br-[10px]',
            )}
          >
            <span className="text-xs">{key} matches</span>
            <span className="font-[800]">{value}</span>
          </p>
        ))}
      </div>
    </>
  )
}
