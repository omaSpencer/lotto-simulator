import type { SimulationResult } from '@/types'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { getOrCreateSessionId } from '@/lib/session'
import { generateRandomNumbers, getMatchCount } from '@/lib/utils'
import {
  DRAW_NUMBERS_COUNT,
  DRAWS_PER_YEAR,
  MAX_DRAWS,
  NUMBERS_POOL_SIZE,
  SPEED_MAX,
  SPEED_MIN,
  TICKET_PRICE_HUF,
} from '@/lib/constants'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const db = getDb()
  const sessionId = await getOrCreateSessionId()
  const encoder = new TextEncoder()

  const speed = Math.min(
    SPEED_MAX,
    Math.max(SPEED_MIN, parseInt(searchParams.get('speed') || '200', 10)),
  )

  const raw = searchParams.get('playerNumbers') ?? ''
  const parsed = Array.from(
    new Set(
      raw
        .split(',')
        .map((n) => parseInt(n, 10))
        .filter((n) => n >= 1 && n <= NUMBERS_POOL_SIZE),
    ),
  )
  const playerNumbers =
    parsed.length === DRAW_NUMBERS_COUNT
      ? parsed.sort((a, b) => a - b)
      : generateRandomNumbers()

  const stream = new ReadableStream({
    async start(controller) {
      const winStats: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0 }
      let jackpot = false

      for (let i = 0; i < MAX_DRAWS && !jackpot; i++) {
        const drawNumbers = generateRandomNumbers()
        const matchCount = getMatchCount(drawNumbers, playerNumbers)

        if (matchCount >= 2) {
          await db.insert(draws).values({
            sessionId,
            drawNumbers: drawNumbers.join(','),
            playerNumbers: playerNumbers.join(','),
            matchCount,
          })

          if (matchCount <= DRAW_NUMBERS_COUNT) winStats[matchCount]++
          if (matchCount === DRAW_NUMBERS_COUNT) jackpot = true
        }

        const result = {
          numOfTickets: i + 1,
          yearsSpent: Math.floor((i + 1) / DRAWS_PER_YEAR),
          costOfTickets: (i + 1) * TICKET_PRICE_HUF,
          winMatches: winStats,
          matchCount,
          winningNumbers: drawNumbers,
          playerNumbers,
          speed,
          isRandom: playerNumbers.length !== DRAW_NUMBERS_COUNT,
          jackpot,
        } satisfies SimulationResult

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(result)}\n\n`),
        )
        await new Promise((r) => setTimeout(r, speed))
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
