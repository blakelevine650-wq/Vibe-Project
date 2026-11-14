import { describe, expect, it } from 'vitest'
import { computeStats } from './stats'
import { EMPTY_SAVE, parseSave, type CompletedGame } from './storage'

const game = (solved: boolean, guesses: number, score: number): CompletedGame => ({
  results: { clue: { solved, guesses }, trivia: [true, false, true], tipCheck: true },
  score,
})

describe('stats', () => {
  it('is all zeros with no games', () => {
    const s = computeStats({}, '2026-11-20')
    expect(s).toMatchObject({ played: 0, winPct: 0, currentStreak: 0, maxStreak: 0, averageScore: 0, bestScore: 0 })
    expect(s.distribution).toEqual([0, 0, 0, 0, 0, 0])
  })

  it('counts wins, distribution and scores', () => {
    const history = {
      '2026-11-14': game(true, 1, 200),
      '2026-11-15': game(true, 3, 110),
      '2026-11-16': game(false, 5, 50),
      '2026-11-17': game(true, 3, 120),
    }
    const s = computeStats(history, '2026-11-17')
    expect(s).toMatchObject({ played: 4, wins: 3, winPct: 75, averageScore: 120, bestScore: 200 })
    expect(s.distribution).toEqual([1, 0, 2, 0, 0, 1])
  })

  it('keeps a streak alive until a full day is missed', () => {
    const history = { '2026-11-14': game(true, 1, 200), '2026-11-15': game(true, 2, 180), '2026-11-16': game(true, 2, 180) }
    expect(computeStats(history, '2026-11-16').currentStreak).toBe(3) // played today
    expect(computeStats(history, '2026-11-17').currentStreak).toBe(3) // today not played yet
    expect(computeStats(history, '2026-11-18').currentStreak).toBe(0) // missed the 17th
    expect(computeStats(history, '2026-11-18').maxStreak).toBe(3)
  })

  it('finds the longest run across gaps, month ends and DST', () => {
    const history = {
      '2026-11-14': game(true, 1, 200),
      '2026-11-29': game(true, 1, 200),
      '2026-11-30': game(true, 1, 200),
      '2026-12-01': game(true, 1, 200),
      '2026-12-02': game(true, 1, 200),
      '2027-03-13': game(true, 1, 200),
      '2027-03-14': game(true, 1, 200),
      '2027-03-15': game(true, 1, 200),
    }
    const s = computeStats(history, '2027-03-15')
    expect(s.maxStreak).toBe(4)
    expect(s.currentStreak).toBe(3)
  })
})

describe('saved data', () => {
  it('round-trips valid data', () => {
    const data = {
      history: { '2026-11-14': game(true, 2, 180) },
      progress: { dateKey: '2026-11-15', stage: 'trivia' as const, results: {}, clueGuessIds: ['a'], triviaAnswers: [true] },
    }
    expect(parseSave(JSON.stringify(data))).toEqual(data)
  })

  it('survives missing, corrupt or wrongly shaped data', () => {
    expect(parseSave(null)).toEqual(EMPTY_SAVE)
    expect(parseSave('{not json')).toEqual(EMPTY_SAVE)
    expect(parseSave('[1,2]')).toEqual(EMPTY_SAVE)
    const mixed = { history: { '2026-11-14': game(true, 2, 180), nonsense: game(true, 1, 1), '2026-11-15': { score: 'x' } }, progress: { stage: 'home' } }
    expect(parseSave(JSON.stringify(mixed))).toEqual({ history: { '2026-11-14': game(true, 2, 180) }, progress: null })
  })
})
