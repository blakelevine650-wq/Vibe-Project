import { getDayNumber } from './date'
import { MAX_CLUE_GUESSES } from './scoring'
import type { CompletedGame } from './storage'

export interface Stats {
  played: number
  /** A win is finding the Campus Clue place. */
  wins: number
  winPct: number
  /** Days in a row with a finished game, counting today or (if today isn't played yet) up to yesterday. */
  currentStreak: number
  maxStreak: number
  /** Campus Clue results: index 0–4 = found on guess 1–5, last index = missed. */
  distribution: number[]
  averageScore: number
  bestScore: number
}

export function computeStats(history: Record<string, CompletedGame>, todayKey: string): Stats {
  const games = Object.values(history)
  const played = games.length
  const wins = games.filter((g) => g.results.clue.solved).length

  const distribution = Array.from({ length: MAX_CLUE_GUESSES + 1 }, () => 0)
  for (const { results } of games) {
    const slot = results.clue.solved ? Math.min(Math.max(results.clue.guesses, 1), MAX_CLUE_GUESSES) - 1 : MAX_CLUE_GUESSES
    distribution[slot]!++
  }

  const days = new Set(Object.keys(history).map(getDayNumber))
  let maxStreak = 0
  for (const day of days) {
    if (days.has(day - 1)) continue // not the start of a run
    let length = 1
    while (days.has(day + length)) length++
    maxStreak = Math.max(maxStreak, length)
  }

  const today = getDayNumber(todayKey)
  let cursor = days.has(today) ? today : today - 1
  let currentStreak = 0
  while (days.has(cursor)) {
    currentStreak++
    cursor--
  }

  const total = games.reduce((sum, g) => sum + g.score, 0)
  return {
    played,
    wins,
    winPct: played ? Math.round((wins / played) * 100) : 0,
    currentStreak,
    maxStreak,
    distribution,
    averageScore: played ? Math.round(total / played) : 0,
    bestScore: games.reduce((best, g) => Math.max(best, g.score), 0),
  }
}
