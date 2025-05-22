import { NextResponse } from 'next/server'
import { getSessionIdFromCookie } from '@/lib/session'
import { handleStats } from '@/lib/handlers/stats'

export async function GET() {
  const sessionId = await getSessionIdFromCookie()

  if (sessionId === null || isNaN(sessionId)) {
    return NextResponse.json({ error: 'No session found' }, { status: 400 })
  }

  const result = await handleStats(sessionId)
  return NextResponse.json(result)
}
