import {
  DRAW_NUMBERS_COUNT,
  NUMBERS_POOL_SIZE,
  TICKET_PRICE_HUF,
} from '@/lib/constants'
import { generateRandomNumbers, getMatchCount } from '@/lib/utils'

interface DrawInput {
  playerNumbers?: number[]
}

export function handleDraw(input?: DrawInput) {
  const fixed: number[] = Array.isArray(input?.playerNumbers)
    ? Array.from(
        new Set(
          input.playerNumbers
            .map(Number)
            .filter((n: number) => n >= 1 && n <= NUMBERS_POOL_SIZE),
        ),
      )
    : []

  const playerNumbers =
    fixed.length === DRAW_NUMBERS_COUNT
      ? fixed.sort((a, b) => a - b)
      : generateRandomNumbers()

  const drawNumbers = generateRandomNumbers()
  const matchCount = getMatchCount(drawNumbers, playerNumbers)

  return {
    drawNumbers,
    playerNumbers,
    matchCount,
    saved: matchCount >= 2,
    jackpot: matchCount === DRAW_NUMBERS_COUNT,
    cost: TICKET_PRICE_HUF,
  }
}
