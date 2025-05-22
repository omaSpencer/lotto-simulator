import { describe, expect, it } from 'vitest'

import { getMatchCount } from '@/lib/utils'

describe('getMatchCount', () => {
  it('should return 0 when there are no matches', () => {
    const draw = [1, 2, 3, 4, 5]
    const player = [6, 7, 8, 9, 10]
    expect(getMatchCount(draw, player)).toBe(0)
  })

  it('should return correct number of matches', () => {
    const draw = [5, 10, 15, 20, 25]
    const player = [10, 15, 30, 40, 50]
    expect(getMatchCount(draw, player)).toBe(2)
  })

  it('should return 5 when all numbers match', () => {
    const draw = [11, 22, 33, 44, 55]
    const player = [11, 22, 33, 44, 55]
    expect(getMatchCount(draw, player)).toBe(5)
  })

  it('should work regardless of order', () => {
    const draw = [90, 1, 45, 30, 60]
    const player = [30, 1, 45, 90, 60]
    expect(getMatchCount(draw, player)).toBe(5)
  })
})
