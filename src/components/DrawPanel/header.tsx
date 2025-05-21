import { useMemo } from 'react'
import { ClockIcon } from 'lucide-react'
import { formatDistance } from 'date-fns'

import { cn } from '@/lib/utils'

export const DrawPanelHeader = ({
  isRunning,
  timestamps,
}: {
  isRunning: boolean
  timestamps: { start: Date | null; end: Date | null }
}) => {
  const timer = useMemo(() => {
    if (!timestamps?.start || !timestamps?.end) return null

    return formatDistance(timestamps.start, timestamps.end)
  }, [timestamps])

  return (
    <header className="flex items-center justify-between gap-5">
      <h2 className="font-bold subTitle-fSize leading-[1] text-foreground">
        Result
      </h2>

      {!!timestamps?.start && (
        <div>
          <time className="flex items-center gap-2 text-sm text-foreground/50">
            <ClockIcon
              className={cn(
                'size-4',
                isRunning && 'animate-spin duration-1000',
              )}
            />
            <span>{timer}</span>
          </time>
        </div>
      )}
    </header>
  )
}
