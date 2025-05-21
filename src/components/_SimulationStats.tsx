import { cn } from '@/lib/utils'

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
      <div className="bg-primary text-white rounded-[10px] py-4 px-6 font-bold gap-1.5 inline-flex flex-col w-fit">
        <p className="flex items-center gap-6">
          <span className="min-w-[142px]">Number of tickets:</span>
          <span className="font-[800]">{numOfTickets}</span>
        </p>
        <p className="flex items-center gap-6 text-sm">
          <span className="min-w-[142px]">Years spent:</span>
          <span>{yearsSpent}</span>
        </p>
        <p className="flex items-center gap-6 text-sm">
          <span className="min-w-[142px]">Cost of tickets:</span>
          <span>{costOfTickets}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 w-fit">
        {Object.entries(winMatches).map(([key, value], idx) => (
          <p
            key={key}
            className={cn(
              'flex flex-col justify-between items-center shadow-float border border-secondary p-3 font-bold gap-2.5 min-w-[127px]',
              idx === 0 && 'rounded-l-[10px]',
              idx === Object.keys(winMatches).length - 1 && 'rounded-r-[10px]',
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
