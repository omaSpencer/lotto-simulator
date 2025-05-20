'use client'

import { useState, useRef } from 'react'

import type { Stats } from '@/types'

import SimulationStats from '@/components/SimulationStats'
import NumberBalls from '@/components/NumberBalls'
import SpeedSlider from '@/components/SpeedSlider'
import NumberPicker from '@/components/NumberPicker'

export default function Home() {
  const [draw, setDraw] = useState<number[]>([])
  const [matchCount, setMatchCount] = useState(0)
  const [stats, setStats] = useState<Stats | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [fixedNumbers, setFixedNumbers] = useState<number[] | null>(null)
  const eventSourceRef = useRef<EventSource | null>(null)

  const startSimulation = () => {
    const numbersParam = fixedNumbers?.join(',')
    const url = `/api/simulate/stream?speed=${speed}${numbersParam ? `&playerNumbers=${numbersParam}` : ''}`
    const es = new EventSource(url)

    es.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setDraw(data.draw)
      setMatchCount(data.matchCount)
      setStats({
        cost: data.cost,
        years: data.years,
        wins: data.wins,
        index: data.drawIndex,
      })
      if (data.jackpot || data.drawIndex >= 26000) {
        stopSimulation()
      }
    }

    eventSourceRef.current = es
    setIsRunning(true)
  }

  const stopSimulation = () => {
    eventSourceRef.current?.close()
    setIsRunning(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Lotto Simulator</h1>
      <SpeedSlider speed={speed} setSpeed={setSpeed} disabled={isRunning} />
      <NumberPicker
        selected={fixedNumbers}
        setSelected={setFixedNumbers}
        disabled={isRunning}
      />
      <div className="flex gap-4">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={stopSimulation}
          disabled={!isRunning}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
      </div>
      <NumberBalls
        numbers={draw}
        hits={matchCount}
        playerNumbers={fixedNumbers}
      />
      {stats && <SimulationStats {...stats} />}
    </main>
  )
}
