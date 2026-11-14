/** Structural checks on the content files. These catch broken data, not wrong facts. */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type { GuessablePlace, Place, Tip, TriviaQuestion } from '../types'
import { allGuessable } from './content'
import { TRIVIA_CATEGORIES } from './daily'
import { normalizeName } from './geo'
import { choiceOrder } from './rng'
import { MAX_CLUE_GUESSES } from './scoring'

const load = <T>(file: string): T => JSON.parse(readFileSync(`public/data/${file}`, 'utf8')) as T
const places = load<Place[]>('places.json')
const guessOnly = load<GuessablePlace[]>('guessable-places.json')
const trivia = load<TriviaQuestion[]>('trivia.json')
const tips = load<Tip[]>('tips.json')

const unique = (values: string[]) => new Set(values).size === values.length

describe('places', () => {
  const all = [...places, ...guessOnly]

  it('keeps the guess-only list separate from the answer pool', () => {
    expect(guessOnly.length).toBeGreaterThanOrEqual(40)
    expect(guessOnly.length).toBeLessThanOrEqual(60)
    expect(unique(all.map((p) => p.id))).toBe(true)
    expect(allGuessable({ places, guessOnly, trivia, tips })).toHaveLength(all.length)
  })

  it('has no two places sharing a name or alias', () => {
    const names = all.flatMap((p) => [...new Set([p.name, ...(p.aliases ?? [])].map(normalizeName))])
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([])
  })

  it('has coordinates in the Ann Arbor area', () => {
    for (const p of all) {
      expect(p.lat, p.id).toBeGreaterThan(42.24)
      expect(p.lat, p.id).toBeLessThan(42.32)
      expect(p.lng, p.id).toBeGreaterThan(-83.78)
      expect(p.lng, p.id).toBeLessThan(-83.64)
    }
  })

  it('gives every answer one clue per guess', () => {
    for (const p of places) expect(p.clues, p.id).toHaveLength(MAX_CLUE_GUESSES)
  })
})

describe('trivia and tips', () => {
  it('has valid questions in every category', () => {
    expect(unique(trivia.map((q) => q.id))).toBe(true)
    for (const category of TRIVIA_CATEGORIES) expect(trivia.some((q) => q.category === category), category).toBe(true)
    for (const q of [...trivia, ...tips.map((t) => ({ id: t.id, ...t.check }))]) {
      expect(q.choices.length, q.id).toBeGreaterThanOrEqual(2)
      expect(unique(q.choices), q.id).toBe(true)
      expect(q.choices[q.answerIndex], q.id).toBeDefined()
    }
  })

  it('has 3–5 steps per tip', () => {
    expect(unique(tips.map((t) => t.id))).toBe(true)
    for (const t of tips) {
      expect(t.steps.length, t.id).toBeGreaterThanOrEqual(3)
      expect(t.steps.length, t.id).toBeLessThanOrEqual(5)
    }
  })

  it('shuffles choices the same way every time for a seed', () => {
    const order = choiceOrder(4, 'sports-001:2026-11-14')
    expect([...order].sort()).toEqual([0, 1, 2, 3])
    expect(choiceOrder(4, 'sports-001:2026-11-14')).toEqual(order)
  })
})
