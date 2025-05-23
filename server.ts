import { createServer } from 'node:http'
import next from 'next'
import { Server } from 'socket.io'

import { generateRandomNumbers, getMatchCount } from './src/lib/utils'
import {
  DRAW_NUMBERS_COUNT,
  DRAWS_PER_YEAR,
  MAX_DRAWS,
  TICKET_PRICE_HUF,
} from './src/lib/constants'

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = Number(process.env.PORT) || 3000

const app = next({ dev, hostname, port, turbo: true })
const handler = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer(handler)
  const io = new Server(httpServer, {
    cors: { origin: '*' },
  })

  io.on('connection', (socket) => {
    console.log('[WS] Connected:', socket.id)

    let speed = 200
    let isRunning = false
    let drawCount = 0
    let winStats: Record<number, number> = { 2: 0, 3: 0, 4: 0, 5: 0 }
    let playerNumbers = generateRandomNumbers()

    socket.on('start-simulation', (data) => {
      console.log('[WS] Start simulation')
      if (
        Array.isArray(data?.playerNumbers) &&
        data.playerNumbers.length === DRAW_NUMBERS_COUNT
      ) {
        playerNumbers = data.playerNumbers
      }
      speed = data?.speed || 200
      drawCount = 0
      isRunning = true
      winStats = { 2: 0, 3: 0, 4: 0, 5: 0 }
      loop()
    })

    socket.on('set-speed', (newSpeed) => {
      console.log('[WS] New speed:', newSpeed)
      speed = Math.max(10, Math.min(1000, Number(newSpeed)))
    })

    socket.on('stop', () => {
      console.log('[WS] Stop requested')
      isRunning = false
    })

    const loop = async () => {
      while (isRunning && drawCount < MAX_DRAWS) {
        const drawNumbers = generateRandomNumbers()
        const matchCount = getMatchCount(drawNumbers, playerNumbers)
        drawCount++

        const jackpot = matchCount === DRAW_NUMBERS_COUNT

        if (matchCount >= 2 && matchCount <= DRAW_NUMBERS_COUNT)
          winStats[matchCount]++
        const result = {
          numOfTickets: drawCount,
          yearsSpent: Math.floor(drawCount / DRAWS_PER_YEAR),
          costOfTickets: drawCount * TICKET_PRICE_HUF,
          winMatches: winStats,
          matchCount: matchCount,
          winningNumbers: drawNumbers,
          playerNumbers,
          speed,
          isRandom: playerNumbers.length !== DRAW_NUMBERS_COUNT,
          jackpot,
        }

        socket.emit('draw-tick', result)

        if (jackpot) break
        await new Promise((r) => setTimeout(r, speed))
      }
      isRunning = false
    }
  })

  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
