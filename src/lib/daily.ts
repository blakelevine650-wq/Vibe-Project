import type { Content, DailyPuzzle, TriviaCategory } from '../types'
import { getDayNumber } from './date'
import { seededShuffle } from './rng'

export const TRIVIA_CATEGORIES: TriviaCategory[] = ['sports', 'traditions', 'campus-life']

export const CATEGORY_LABELS: Record<TriviaCategory, string> = {
  sports: 'Sports',
  traditions: 'Traditions / History',
  'campus-life': 'Campus Life',
}

/**
 * Pick one item from a pool for a given day.
 *
 * The pool is walked in a shuffled order and reshuffled each time it runs out,
 * so nothing repeats until every item has been used once. Items are ordered by
 * id first, so reordering the JSON file does not change past puzzles (adding
 * or removing items does).
 */
export function pickForDay<T extends { id: string }>(pool: readonly T[], dayNumber: number, poolName: string): T {
  if (pool.length === 0) throw new Error(`No content in pool "${poolName}"`)
  const sorted = [...pool].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
  const index = dayNumber - 1
  const cycle = Math.floor(index / sorted.length)
  const position = index - cycle * sorted.length
  return seededShuffle(sorted, `${poolName}:${cycle}`)[position]!
}

export function getDailyPuzzle(content: Content, dateKey: string): DailyPuzzle {
  const dayNumber = getDayNumber(dateKey)
  return {
    dateKey,
    dayNumber,
    place: pickForDay(content.places, dayNumber, 'places'),
    trivia: TRIVIA_CATEGORIES.map((category) =>
      pickForDay(
        content.trivia.filter((q) => q.category === category),
        dayNumber,
        `trivia:${category}`,
      ),
    ),
    tip: pickForDay(content.tips, dayNumber, 'tips'),
  }
}
