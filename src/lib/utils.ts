import { clsx, type ClassValue } from 'clsx'
import { randomInt } from 'crypto'
import { twMerge } from 'tailwind-merge'

export function generateRandomNumbers(): number[] {
  const pool = Array.from({ length: 90 }, (_, i) => i + 1)

  for (let i = pool.length - 1; i > 0; i--) {
    const j = randomInt(0, i + 1)
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, 5).sort((a, b) => a - b)
}

export function getMatchCount(draw: number[], player: number[]): number {
  const playerSet = new Set(player)
  return draw.reduce((acc, n) => acc + (playerSet.has(n) ? 1 : 0), 0)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
