import { eq } from 'drizzle-orm'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { DRAWS_PER_YEAR, TICKET_PRICE_HUF } from '@/lib/constants'

export async function handleStats(sessionId: number) {
  const db = getDb()

  const sessionDraws = await db.query.draws.findMany({
    where: eq(draws.sessionId, sessionId),
  })

  const ticketCount = sessionDraws.length
  const yearCount = Math.floor(ticketCount / DRAWS_PER_YEAR)
  const cost = ticketCount * TICKET_PRICE_HUF

  const winStats: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0 }
  for (const draw of sessionDraws) {
    const hits = draw.matchCount ?? 0
    if (hits >= 2 && hits <= 5) winStats[hits]++
  }

  return {
    sessionId,
    ticketCount,
    yearCount,
    cost,
    wins: winStats,
  }
}
