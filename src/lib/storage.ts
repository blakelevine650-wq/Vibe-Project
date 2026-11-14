import type { RoundResults } from '../types'

const STORAGE_KEY = 'wd:save:v1'

export interface CompletedGame {
  results: RoundResults
  score: number
}

export type RoundStage = 'clue' | 'trivia' | 'tip'

/** Today's daily game, part-way through. */
export interface Progress {
  dateKey: string
  stage: RoundStage
  results: Partial<RoundResults>
  /** Campus Clue guesses so far, in order. */
  clueGuessIds: string[]
  /** Quick Three answers so far, in order. */
  triviaAnswers: boolean[]
}

export interface SaveData {
  /** Finished daily games, keyed by date (YYYY-MM-DD). Practice games are never stored. */
  history: Record<string, CompletedGame>
  progress: Progress | null
}

export const EMPTY_SAVE: SaveData = { history: {}, progress: null }

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

function isCompletedGame(v: unknown): v is CompletedGame {
  if (!isObject(v) || typeof v.score !== 'number' || !isObject(v.results)) return false
  const { clue, trivia, tipCheck } = v.results
  return (
    isObject(clue) &&
    typeof clue.solved === 'boolean' &&
    typeof clue.guesses === 'number' &&
    Array.isArray(trivia) &&
    trivia.every((t) => typeof t === 'boolean') &&
    typeof tipCheck === 'boolean'
  )
}

function isProgress(v: unknown): v is Progress {
  return (
    isObject(v) &&
    typeof v.dateKey === 'string' &&
    (v.stage === 'clue' || v.stage === 'trivia' || v.stage === 'tip') &&
    isObject(v.results) &&
    Array.isArray(v.clueGuessIds) &&
    v.clueGuessIds.every((id) => typeof id === 'string') &&
    Array.isArray(v.triviaAnswers) &&
    v.triviaAnswers.every((a) => typeof a === 'boolean')
  )
}

/** Turns stored text back into save data, dropping anything that isn't the right shape. */
export function parseSave(raw: string | null): SaveData {
  if (!raw) return EMPTY_SAVE
  try {
    const data: unknown = JSON.parse(raw)
    if (!isObject(data) || !isObject(data.history)) return EMPTY_SAVE
    const history: Record<string, CompletedGame> = {}
    for (const [dateKey, game] of Object.entries(data.history)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey) && isCompletedGame(game)) history[dateKey] = game
    }
    return { history, progress: isProgress(data.progress) ? data.progress : null }
  } catch {
    return EMPTY_SAVE
  }
}

export function loadSave(): SaveData {
  try {
    return parseSave(localStorage.getItem(STORAGE_KEY))
  } catch {
    return EMPTY_SAVE
  }
}

/** Returns false if the browser refused to store it (private mode, storage full). */
export function writeSave(data: SaveData): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}
