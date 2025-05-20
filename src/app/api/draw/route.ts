import { NextResponse } from 'next/server'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { generateRandomNumbers, getMatchCount } from '@/lib/utils'
import { getOrCreateSessionId } from '@/lib/session'

export async function POST(req: Request) {
  const db = getDb()

  const body = await req.json().catch(() => null)
  const fixedPlayerNumbers = Array.isArray(body?.playerNumbers as number[])
    ? [...new Set(body.playerNumbers.map(Number))].filter(
        (n) => Number(n) >= 1 && Number(n) <= 90,
      )
    : null

  const playerNumbers =
    fixedPlayerNumbers?.length === 5
      ? fixedPlayerNumbers.sort((a, b) => Number(a) - Number(b))
      : generateRandomNumbers()

  const drawNumbers = generateRandomNumbers()
  const matchCount = getMatchCount(drawNumbers, playerNumbers as number[])

  const sessionId = await getOrCreateSessionId()

  if (matchCount >= 2) {
    await db.insert(draws).values({
      sessionId,
      drawNumbers: drawNumbers.join(','),
      playerNumbers: playerNumbers.join(','),
      matchCount,
    })
  }

  const isJackpot = matchCount === 5

  return NextResponse.json({
    draw: drawNumbers,
    player: playerNumbers,
    matchCount,
    saved: matchCount >= 2,
    fixed: !!fixedPlayerNumbers,
    jackpot: isJackpot,
    sessionId,
  })
}
