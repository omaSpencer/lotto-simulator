export type Stats = {
  cost: number
  years: number
  wins: Record<number, number>
  index: number
}

export type DrawPayload = {
  draw: number[]
  matchCount: number
  drawIndex: number
  years: number
  cost: number
  wins: Stats['wins']
  jackpot: boolean
}
