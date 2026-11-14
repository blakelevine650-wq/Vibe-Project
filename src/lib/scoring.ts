import type { RoundResults } from '../types'

export const MAX_CLUE_GUESSES = 5
/** Points for finding the place on guess 1, 2, 3, 4, 5. */
export const CLUE_POINTS = [100, 80, 60, 40, 20]
export const TRIVIA_POINTS = 25
export const TIP_POINTS = 25
export const MAX_SCORE = CLUE_POINTS[0]! + 3 * TRIVIA_POINTS + TIP_POINTS

export interface ScoreBreakdown {
  clue: number
  trivia: number
  tip: number
  total: number
}

export function scoreResults(results: RoundResults): ScoreBreakdown {
  const clue = results.clue.solved ? (CLUE_POINTS[results.clue.guesses - 1] ?? 0) : 0
  const trivia = results.trivia.filter(Boolean).length * TRIVIA_POINTS
  const tip = results.tipCheck ? TIP_POINTS : 0
  return { clue, trivia, tip, total: clue + trivia + tip }
}

/** One square per guess used: misses, then a hit if the place was found. */
export function clueSquares(clue: RoundResults['clue']): string {
  const misses = clue.solved ? clue.guesses - 1 : clue.guesses
  return '⬛'.repeat(misses) + (clue.solved ? '🟨' : '')
}

export function buildShareText(dayNumber: number, results: RoundResults): string {
  const { total } = scoreResults(results)
  const mark = (ok: boolean) => (ok ? '🟩' : '🟥')
  return [
    `Wolverine Daily #${dayNumber} — ${total}/${MAX_SCORE}`,
    `📍 ${clueSquares(results.clue)}`,
    `❓ ${results.trivia.map(mark).join('')}`,
    `💡 ${mark(results.tipCheck)}`,
  ].join('\n')
}
