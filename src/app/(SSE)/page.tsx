'use client'

import { useRef } from 'react'

import type { SimulationResult } from '@/types'

import { useSimulationState } from '@/hooks/useSimulationState'

import { MAX_DRAWS } from '@/lib/constants'
import { convertUiSpeedToDelay } from '@/lib/utils'

import { SimulationStats } from '@/components/SimulationStats'
import { DrawPanel } from '@/components/DrawPanel'
import { DrawPanelHeader } from '@/components/DrawPanel/header'
import { Confetti } from '@/components/Confetti'

export default function ServerSentEventsPage() {
  const {
    currentDraw,
    resultStats,
    timestamps,
    isJackpot,
    isRunning,
    setCurrentDraw,
    setIsJackpot,
    setIsRunning,
    setResultStats,
    setTimestamps,
  } = useSimulationState()

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
        setIsJackpot(data.jackpot)
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

  const onValueChange = (value: number[]) => {
    setCurrentDraw((prev) => ({ ...prev, speed: value[0] }))
  }

  return (
    <>
      <section className="bg-white max-w-[calc(100vw_-_40px)] lg:max-w-[792px] mx-auto lg:rounded-3xl mt-6 lg:mt-12 py-4 lg:py-12 px-4 lg:px-[78px] shadow-float grid gap-6 lg:gap-8">
        <DrawPanelHeader isRunning={isRunning} timestamps={timestamps} />

        <SimulationStats {...resultStats} />

        <DrawPanel
          {...currentDraw}
          isRunning={isRunning}
          sliderDisabled={isRunning}
          onStartSimulation={onStartSimulation}
          onStopSimulation={onStopSimulation}
          setState={setCurrentDraw}
          onValueChange={onValueChange}
        />
      </section>
      {isJackpot && <Confetti onRestart={() => setIsJackpot(false)} />}
    </>
  )
}
