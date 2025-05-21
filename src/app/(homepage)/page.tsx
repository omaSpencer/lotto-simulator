'use client'

import { useState, useRef } from 'react'

import type {
  SimulationResult,
  SimulationResultDraw,
  SimulationResultStats,
} from '@/types'

import { MAX_DRAWS } from '@/lib/constants'
import { convertUiSpeedToDelay } from '@/lib/utils'

import { Header } from '@/components/Header'
import { SimulationStats } from '@/components/SimulationStats'
import { DrawPanel } from '@/components/DrawPanel'
import { DrawPanelHeader } from '@/components/DrawPanel/header'

export default function Home() {
  const [resultStats, setResultStats] = useState<SimulationResultStats>({
    numOfTickets: 0,
    yearsSpent: 0,
    costOfTickets: 0,
    winMatches: {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    },
    matchCount: 0,
  })
  const [currentDraw, setCurrentDraw] = useState<SimulationResultDraw>({
    winningNumbers: [] as number[],
    playerNumbers: [0, 0, 0, 0, 0] as number[],
    speed: 0,
    isRandom: false,
  })
  const [isRunning, setIsRunning] = useState(false)
  const [timestamps, setTimestamps] = useState({
    start: null as Date | null,
    end: null as Date | null,
  })

  const eventSourceRef = useRef<EventSource | null>(null)

  const onStartSimulation = () => {
    const { speed, playerNumbers, isRandom } = currentDraw

    let numbersParam: string | boolean = false

    if (!isRandom && playerNumbers.some((n) => n === 0)) {
      alert('Please select 5 numbers or check the random options') //! create a toast or alert UI
      return
    } else {
      numbersParam = playerNumbers?.join(',')
    }

    const delay = convertUiSpeedToDelay(speed)
    const url = `/api/simulate/stream?speed=${delay}${numbersParam ? `&playerNumbers=${numbersParam}` : ''}`
    const es = new EventSource(url)

    es.onopen = () => {
      setTimestamps((prev) => ({ ...prev, start: new Date() }))
    }
    es.onerror = (event) => {
      console.error('EventSource failed:', event)
      setTimestamps((prev) => ({ ...prev, end: new Date() }))
      setIsRunning(false)
      es.close()
    }

    es.onmessage = (event) => {
      const data: SimulationResult = JSON.parse(event.data)
      setCurrentDraw((prev) => ({
        ...prev,
        winningNumbers: data.winningNumbers,
        playerNumbers: data.playerNumbers,
        isRandom: data.isRandom,
      }))
      setResultStats((prev) => ({
        ...prev,
        numOfTickets: data.numOfTickets,
        yearsSpent: data.yearsSpent,
        costOfTickets: data.costOfTickets,
        winMatches: {
          2: data.winMatches[2],
          3: data.winMatches[3],
          4: data.winMatches[4],
          5: data.winMatches[5],
        },
        matchCount: data.matchCount,
      }))

      if (data.jackpot || data.numOfTickets >= MAX_DRAWS) {
        onStopSimulation()
      }

      setTimestamps((prev) => ({
        ...prev,
        end: new Date(),
      }))
    }

    eventSourceRef.current = es
    setIsRunning(true)
  }

  const onStopSimulation = () => {
    eventSourceRef.current?.close()
    setIsRunning(false)
    setTimestamps((prev) => ({ ...prev, end: new Date() }))
  }

  return (
    <main>
      <Header />

      <section className="bg-white max-w-[calc(100vw_-_40px)] lg:max-w-[792px] mx-auto lg:rounded-3xl mt-6 lg:mt-12 py-4 lg:py-12 px-4 lg:px-[78px] shadow-float grid gap-6 lg:gap-8">
        <DrawPanelHeader isRunning={isRunning} timestamps={timestamps} />

        <SimulationStats {...resultStats} />

        <DrawPanel
          {...currentDraw}
          isRunning={isRunning}
          onStartSimulation={onStartSimulation}
          onStopSimulation={onStopSimulation}
          setState={setCurrentDraw}
        />
      </section>
    </main>
  )
}
