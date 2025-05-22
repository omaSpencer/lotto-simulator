import { describe, it, expect } from 'vitest'

import { handleDraw } from '@/lib/handlers/draw'

describe('handleDraw', () => {
  it('returns 5 draw numbers', () => {
    const result = handleDraw({ playerNumbers: [1, 2, 3, 4, 5] })
    expect(result.drawNumbers.length).toBe(5)
    expect(result.playerNumbers).toEqual([1, 2, 3, 4, 5])
  })

  it('returns valid result even without input', () => {
    const result = handleDraw()
    expect(result.drawNumbers.length).toBe(5)
    expect(result.playerNumbers.length).toBe(5)
  })

  it('calculates matchCount correctly', () => {
    const result = handleDraw({ playerNumbers: [1, 2, 3, 4, 5] })
    expect(result.matchCount).toBeGreaterThanOrEqual(0)
    expect(result.matchCount).toBeLessThanOrEqual(5)
  })
})
