import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { getSessionIdFromCookie } from '@/lib/session'

export async function GET() {
  const sessionId = await getSessionIdFromCookie()

  if (!sessionId || isNaN(sessionId)) {
    return NextResponse.json({ error: 'No session found' }, { status: 400 })
  }

  const db = getDb()

  const sessionDraws = await db.query.draws.findMany({
    where: eq(draws.sessionId, sessionId),
  })

  const ticketCount = sessionDraws.length
  const yearCount = Math.floor(ticketCount / 52)
  const cost = ticketCount * 300

  const winStats = { '2': 0, '3': 0, '4': 0, '5': 0 } as Record<number, number>
  for (const draw of sessionDraws) {
    const hits = draw.matchCount ?? 0
    if (hits >= 2 && hits <= 5) winStats[hits]++
  }

  return NextResponse.json({
    sessionId,
    ticketCount,
    yearCount,
    cost,
    wins: winStats,
  })
}
