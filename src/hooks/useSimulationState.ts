import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

import type { SimulationResultDraw, SimulationResultStats } from '@/types'

export function useSimulationState() {
  const searchParams = useSearchParams()
  const speedFromUrl = parseInt(searchParams.get('speed') ?? '0')

  const [resultStats, setResultStats] = useState<SimulationResultStats>({
    numOfTickets: 0,
    yearsSpent: 0,
    costOfTickets: 0,
    winMatches: { 2: 0, 3: 0, 4: 0, 5: 0 },
    matchCount: 0,
  })

  const [currentDraw, setCurrentDraw] = useState<SimulationResultDraw>({
    winningNumbers: [0, 0, 0, 0, 0],
    playerNumbers: [0, 0, 0, 0, 0],
    speed: speedFromUrl,
    isRandom: false,
  })

  const [isRunning, setIsRunning] = useState(false)
  const [timestamps, setTimestamps] = useState({
    start: null as Date | null,
    end: null as Date | null,
  })

  const [isJackpot, setIsJackpot] = useState(false)

  return {
    resultStats,
    currentDraw,
    isRunning,
    timestamps,
    isJackpot,
    setIsJackpot,
    setResultStats,
    setCurrentDraw,
    setIsRunning,
    setTimestamps,
  }
}
