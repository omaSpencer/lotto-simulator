import { AlertType } from '@/lib/enums'

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

export type Alert = {
  title: string
  message: string
  type: AlertType
}
export interface AppStore {
  alert: Alert | null
  setAlert: (alert: Alert | null) => void
}
