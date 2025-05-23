'use client'

import { useEffect } from 'react'

import type { SimulationResult } from '@/types'

import { useSimulationState } from '@/hooks/useSimulationState'

import { socket } from '@/lib/socket'
import { MAX_DRAWS } from '@/lib/constants'
import { generateRandomNumbers } from '@/lib/utils'

import { DrawPanelHeader } from '@/components/DrawPanel/header'
import { SimulationStats } from '@/components/SimulationStats'
import { DrawPanel } from '@/components/DrawPanel'
import { Confetti } from '@/components/Confetti'

export default function WebSocketPage() {
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

  useEffect(() => {
    function onTick(data: SimulationResult) {
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

      if (data.numOfTickets % 60 === 0) {
        setTimestamps((prev) => ({
          ...prev,
          end: new Date(),
        }))
      }

      if (data.jackpot || data.numOfTickets >= MAX_DRAWS) {
        setIsJackpot(data.jackpot)
        onStopSimulation()
      }
    }

    socket.on('draw-tick', onTick)

    return () => {
      socket.off('draw-tick', onTick)
    }
  })

  const onStartSimulation = () => {
    const { speed, playerNumbers, isRandom } = currentDraw

    let _playedNumbers: number[] = []

    if (!isRandom && playerNumbers.some((n) => n === 0)) {
      alert('Please select 5 numbers or check the random options') //! create a toast or alert UI
      return
    }

    if (isRandom) {
      _playedNumbers = generateRandomNumbers()
    } else {
      _playedNumbers = playerNumbers
    }

    socket.emit('start-simulation', {
      playerNumbers: _playedNumbers,
      speed,
    })

    setTimestamps((prev) => ({ ...prev, start: new Date(), end: new Date() }))
    setIsRunning(true)
  }

  const onStopSimulation = () => {
    setTimestamps((prev) => ({ ...prev, end: new Date() }))
    setIsRunning(false)
    socket.emit('stop')
  }

  const onSpeedChange = (value: number[]) => {
    setCurrentDraw((prev) => ({ ...prev, speed: value[0] }))
    socket.emit('set-speed', value[0])
  }

  return (
    <>
      <section className="bg-white max-w-[calc(100vw_-_40px)] lg:max-w-[792px] mx-auto lg:rounded-3xl mt-6 lg:mt-12 py-4 lg:py-12 px-4 lg:px-[78px] shadow-float grid gap-6 lg:gap-8">
        <DrawPanelHeader isRunning={isRunning} timestamps={timestamps} />

        <SimulationStats {...resultStats} />

        <DrawPanel
          {...currentDraw}
          isRunning={isRunning}
          onStartSimulation={onStartSimulation}
          onStopSimulation={onStopSimulation}
          onValueChange={onSpeedChange}
          setState={setCurrentDraw}
          sliderDisabled={false}
        />
      </section>
      {isJackpot && <Confetti onRestart={() => setIsJackpot(false)} />}
    </>
  )
}
