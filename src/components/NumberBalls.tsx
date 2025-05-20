import { cn } from '@/lib/utils'

type Props = {
  numbers: number[]
  hits: number
  playerNumbers?: number[] | null
}

export default function NumberBalls({ numbers, hits, playerNumbers }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {numbers.map((n, i) => (
        <div
          key={i}
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center text-white font-bold',
            playerNumbers?.includes(n) ? 'bg-green-500' : 'bg-gray-400',
          )}
        >
          {n}
        </div>
      ))}
      <span className="ml-4 text-sm text-muted-foreground">Hits: {hits}</span>
    </div>
  )
}
