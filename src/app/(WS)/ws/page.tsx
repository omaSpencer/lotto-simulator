'use client'

import { useEffect, useState } from 'react'

import type { SimulationResult } from '@/types'

import { socket } from '@/lib/socket'

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [latestDraw, setLatestDraw] = useState<SimulationResult | null>(null)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    function onTick(data: SimulationResult) {
      setLatestDraw(data)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('draw-tick', onTick)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('draw-tick', onTick)
    }
  }, [])

  const handleStart = () => {
    socket.emit('start-simulation', {
      playerNumbers: [1, 2, 3, 4, 5],
      speed: 100,
    })
  }

  const handleSpeedChange = (value: number) => {
    socket.emit('set-speed', value)
  }

  return (
    <div className="p-4">
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>

      <button onClick={handleStart}>Start</button>
      <button onClick={() => socket.emit('stop')}>Stop</button>

      <input
        type="range"
        min={10}
        max={1000}
        step={10}
        onChange={(e) => handleSpeedChange(Number(e.target.value))}
      />

      {latestDraw && (
        <pre className="text-sm mt-4 bg-gray-100 p-3 rounded">
          {JSON.stringify(latestDraw, null, 2)}
        </pre>
      )}
    </div>
  )
}
