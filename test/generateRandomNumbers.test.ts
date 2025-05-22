import { describe, expect, it } from 'vitest'

import { generateRandomNumbers } from '@/lib/utils'
import { DRAW_NUMBERS_COUNT, NUMBERS_POOL_SIZE } from '@/lib/constants'

function isStrictlyIncreasing(arr: number[]) {
  return arr.every((n, i, a) => i === 0 || a[i - 1] < n)
}

describe('generateRandomNumbers', () => {
  it('should return an array of exactly 5 numbers', () => {
    const result = generateRandomNumbers()
    expect(result).toHaveLength(DRAW_NUMBERS_COUNT)
  })

  it('should only contain numbers between 1 and 90', () => {
    const result = generateRandomNumbers()
    for (const n of result) {
      expect(n).toBeGreaterThanOrEqual(1)
      expect(n).toBeLessThanOrEqual(NUMBERS_POOL_SIZE)
    }
  })

  it('should contain only unique numbers', () => {
    const result = generateRandomNumbers()
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('should return strictly increasing numbers', () => {
    const result = generateRandomNumbers()
    expect(isStrictlyIncreasing(result)).toBe(true)
  })

  it('should produce variable outputs across multiple calls', () => {
    const results = Array.from({ length: 10 }, () => generateRandomNumbers())
    const uniqueResults = new Set(results.map((r) => r.join(',')))
    expect(uniqueResults.size).toBeGreaterThan(1)
  })
})
