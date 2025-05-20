import { draws } from '@/db/schema'

import { getDb } from '@/lib/db'
import { getOrCreateSessionId } from '@/lib/session'
import { generateRandomNumbers, getMatchCount } from '@/lib/utils'

export async function GET(req: Request) {
  const db = getDb()
  const { searchParams } = new URL(req.url)
  const speed = Math.max(
    10,
    Math.min(1000, parseInt(searchParams.get('speed') || '200', 10)),
  )
  const raw = searchParams.get('playerNumbers')
  const fixedNumbers = raw
    ?.split(',')
    .map(Number)
    .filter((n) => !isNaN(n) && n >= 1 && n <= 90)
  const playerNumbers =
    fixedNumbers?.length === 5
      ? [...new Set(fixedNumbers)].sort((a, b) => a - b)
      : generateRandomNumbers()

  const sessionId = await getOrCreateSessionId()
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      const winStats = { 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>
      let i = 0
      let jackpot = false

      while (i < 26000 && !jackpot) {
        const drawNumbers = generateRandomNumbers()
        const matchCount = getMatchCount(drawNumbers, playerNumbers)

        if (matchCount >= 2) {
          await db.insert(draws).values({
            sessionId,
            drawNumbers: drawNumbers.join(','),
            playerNumbers: playerNumbers.join(','),
            matchCount,
          })

          if (matchCount <= 5) winStats[matchCount]++
          if (matchCount === 5) jackpot = true
        }

        const payload = JSON.stringify({
          draw: drawNumbers,
          matchCount,
          drawIndex: i + 1,
          years: Math.floor((i + 1) / 52),
          cost: (i + 1) * 300,
          wins: winStats,
          jackpot,
        })

        controller.enqueue(encoder.encode(`data: ${payload}\n\n`))
        await new Promise((res) => setTimeout(res, speed))
        i++
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
