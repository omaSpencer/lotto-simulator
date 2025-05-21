export type SimulationResult = SimulationResultStats &
  SimulationResultDraw & {
    jackpot: boolean
  }

export type SimulationResultStats = {
  numOfTickets: number
  yearsSpent: number
  costOfTickets: number
  winMatches: Record<number, number>
  matchCount: number
}

export type SimulationResultDraw = {
  winningNumbers: number[]
  playerNumbers: number[]
  speed: number
  isRandom: boolean
}
