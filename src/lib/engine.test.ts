import { describe, expect, it } from 'vitest'
import type { Content } from '../types'
import { getDailyPuzzle, pickForDay, TRIVIA_CATEGORIES } from './daily'
import { dateKeyForDayNumber, formatCountdown, getDateKey, getDayNumber, msUntilNextDay } from './date'
import { seededShuffle } from './rng'
import { buildShareText, MAX_SCORE, scoreResults } from './scoring'

describe('date', () => {
  it('uses the Detroit calendar date, not UTC', () => {
    // 03:30 UTC on Nov 15 is still 10:30 p.m. Nov 14 in Detroit (EST, UTC-5).
    expect(getDateKey(new Date('2026-11-15T03:30:00Z'))).toBe('2026-11-14')
    expect(getDateKey(new Date('2026-11-15T05:00:00Z'))).toBe('2026-11-15')
    // Summer: EDT, UTC-4.
    expect(getDateKey(new Date('2027-07-01T03:59:59Z'))).toBe('2027-06-30')
    expect(getDateKey(new Date('2027-07-01T04:00:00Z'))).toBe('2027-07-01')
  })

  it('numbers days from the epoch and round-trips', () => {
    expect(getDayNumber('2026-11-14')).toBe(1)
    expect(getDayNumber('2026-11-15')).toBe(2)
    expect(getDayNumber('2027-03-15')).toBe(122) // across a DST change
    expect(dateKeyForDayNumber(122)).toBe('2027-03-15')
  })

  it('counts down to Detroit midnight', () => {
    expect(msUntilNextDay(new Date('2026-11-15T04:59:50Z'))).toBe(10_000)
    expect(formatCountdown(3_723_000)).toBe('01:02:03')
    expect(formatCountdown(-5)).toBe('00:00:00')
  })
})

describe('daily selection', () => {
  const pool = Array.from({ length: 7 }, (_, i) => ({ id: `item-${i}` }))

  it('is deterministic and independent of file order', () => {
    const reversed = [...pool].reverse()
    for (let day = 1; day <= 30; day++) {
      expect(pickForDay(pool, day, 'p')).toEqual(pickForDay(reversed, day, 'p'))
    }
  })

  it('uses every item once before repeating', () => {
    for (const start of [1, 8, 15]) {
      const ids = Array.from({ length: 7 }, (_, i) => pickForDay(pool, start + i, 'p').id)
      expect(new Set(ids).size).toBe(7)
    }
  })

  it('handles days before the epoch', () => {
    expect(pool).toContainEqual(pickForDay(pool, -3, 'p'))
  })

  it('shuffles differently per seed without losing items', () => {
    const a = seededShuffle(pool, 'a')
    expect([...a].sort((x, y) => x.id.localeCompare(y.id))).toEqual(pool)
    expect(a).not.toEqual(seededShuffle(pool, 'b'))
  })

  it('builds a puzzle with one question per category', () => {
    const content: Content = {
      places: [{ id: 'p1', name: 'P', lat: 0, lng: 0, clues: ['c'] }],
      guessOnly: [],
      trivia: TRIVIA_CATEGORIES.flatMap((category) =>
        [1, 2].map((n) => ({ id: `${category}-${n}`, category, question: 'q', choices: ['a', 'b'], answerIndex: 0 })),
      ),
      tips: [{ id: 't1', system: 'canvas', title: 't', steps: ['s'], check: { question: 'q', choices: ['a'], answerIndex: 0 } }],
    }
    const puzzle = getDailyPuzzle(content, '2026-11-20')
    expect(puzzle.dayNumber).toBe(7)
    expect(puzzle.trivia.map((q) => q.category)).toEqual(TRIVIA_CATEGORIES)
    expect(getDailyPuzzle(content, '2026-11-20')).toEqual(puzzle)
  })
})

describe('scoring', () => {
  it('scores a perfect game and a wipeout', () => {
    expect(scoreResults({ clue: { solved: true, guesses: 1 }, trivia: [true, true, true], tipCheck: true }).total).toBe(MAX_SCORE)
    expect(scoreResults({ clue: { solved: false, guesses: 5 }, trivia: [false, false, false], tipCheck: false }).total).toBe(0)
  })

  it('builds the share text', () => {
    const text = buildShareText(12, { clue: { solved: true, guesses: 3 }, trivia: [true, false, true], tipCheck: true })
    expect(text).toBe('Wolverine Daily #12 — 135/200\n📍 ⬛⬛🟨\n❓ 🟩🟥🟩\n💡 🟩')
  })
})
