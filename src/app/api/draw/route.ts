import { NextResponse } from 'next/server'

import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { getOrCreateSessionId } from '@/lib/session'
import { handleDraw } from '@/lib/handlers/draw'

export async function POST(req: Request) {
  const db = getDb()
  const sessionId = await getOrCreateSessionId()
  const body = await req.json().catch(() => null)

  const result = handleDraw(body)

  if (result.saved) {
    await db.insert(draws).values({
      sessionId,
      drawNumbers: result.drawNumbers.join(','),
      playerNumbers: result.playerNumbers.join(','),
      matchCount: result.matchCount,
    })
  }

  return NextResponse.json({ sessionId, ...result })
}
