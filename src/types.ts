export interface Place {
  id: string
  name: string
  lat: number
  lng: number
  /** Other names a player might type. */
  aliases?: string[]
  /** Shown one at a time, vaguest first. */
  clues: string[]
}

export type TriviaCategory = 'sports' | 'traditions' | 'campus-life'

export interface TriviaQuestion {
  id: string
  category: TriviaCategory
  question: string
  choices: string[]
  answerIndex: number
  explanation?: string
}

export interface Tip {
  id: string
  system: 'canvas' | 'wolverine-access'
  title: string
  steps: string[]
  check: { question: string; choices: string[]; answerIndex: number }
}

export interface Content {
  places: Place[]
  trivia: TriviaQuestion[]
  tips: Tip[]
}

export interface DailyPuzzle {
  dateKey: string
  dayNumber: number
  place: Place
  /** One per category, in TRIVIA_CATEGORIES order. */
  trivia: TriviaQuestion[]
  tip: Tip
}

export interface RoundResults {
  /** Number of guesses used (1–5) and whether the place was found. */
  clue: { solved: boolean; guesses: number }
  /** One entry per Quick Three question. */
  trivia: boolean[]
  tipCheck: boolean
}
