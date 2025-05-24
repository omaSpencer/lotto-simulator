import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { SPEED_MS_MAX, SPEED_MS_MIN, SPEED_UI_MAX } from './constants'

function getRandomInt(min: number, max: number): number {
  const range = max - min
  if (range <= 0) return min

  const maxUint32 = 0xffffffff
  const bucketSize = Math.floor(maxUint32 / range) * range

  const uint32 = new Uint32Array(1)
  let result

  do {
    crypto.getRandomValues(uint32)
    result = uint32[0]
  } while (result >= bucketSize)

  return min + (result % range)
}

export function generateRandomNumbers(): number[] {
  const pool = Array.from({ length: 90 }, (_, i) => i + 1)

  for (let i = pool.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i + 1)
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, 5).sort((a, b) => a - b)
}

export function getNonSelectedNumbers(selectedNumbers: number[]) {
  const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1)
  return allNumbers.filter((number) => !selectedNumbers.includes(number))
}

export function getMatchCount(draw: number[], player: number[]): number {
  const playerSet = new Set(player)
  return draw.reduce((acc, n) => acc + (playerSet.has(n) ? 1 : 0), 0)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(
  num: number,
  options: Intl.NumberFormatOptions,
): string {
  const formattedNum = new Intl.NumberFormat('hu-HU', {
    ...options,
  }).format(num)
  return formattedNum
}

export function convertUiSpeedToDelay(value: number): number {
  const ratio = value / SPEED_UI_MAX
  return Math.round(SPEED_MS_MAX - (SPEED_MS_MAX - SPEED_MS_MIN) * ratio)
}

export function convertDelayToUiSpeed(delay: number): number {
  const ratio = (SPEED_MS_MAX - delay) / (SPEED_MS_MAX - SPEED_MS_MIN)
  return Math.round(ratio * SPEED_UI_MAX)
}
