import { NextResponse } from 'next/server'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { getOrCreateSessionId } from '@/lib/session'
import { generateRandomNumbers, getMatchCount } from '@/lib/utils'
import {
  DRAW_NUMBERS_COUNT,
  NUMBERS_POOL_SIZE,
  TICKET_PRICE_HUF,
} from '@/lib/constants'

export async function POST(req: Request) {
  const db = getDb()
  const sessionId = await getOrCreateSessionId()
  const body = await req.json().catch(() => null)

  const fixed: number[] = Array.isArray(body?.playerNumbers)
    ? Array.from(
        new Set(
          body.playerNumbers
            .map(Number)
            .filter((n: number) => n >= 1 && n <= NUMBERS_POOL_SIZE),
        ),
      )
    : []

  const playerNumbers =
    fixed.length === DRAW_NUMBERS_COUNT
      ? fixed.sort((a, b) => Number(a) - Number(b))
      : generateRandomNumbers()

  const drawNumbers = generateRandomNumbers()
  const matchCount = getMatchCount(drawNumbers, playerNumbers)

  if (matchCount >= 2) {
    await db.insert(draws).values({
      sessionId,
      drawNumbers: drawNumbers.join(','),
      playerNumbers: playerNumbers.join(','),
      matchCount,
    })
  }

  return NextResponse.json({
    sessionId,
    drawNumbers,
    playerNumbers,
    matchCount,
    saved: matchCount >= 2,
    jackpot: matchCount === DRAW_NUMBERS_COUNT,
    cost: TICKET_PRICE_HUF,
  })
}
