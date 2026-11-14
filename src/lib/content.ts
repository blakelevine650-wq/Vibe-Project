import type { Content, GuessablePlace, Place, Tip, TriviaQuestion } from '../types'

async function loadJson<T>(file: string): Promise<T> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${file}`)
  if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`)
  return (await res.json()) as T
}

export async function loadContent(): Promise<Content> {
  const [places, guessOnly, trivia, tips] = await Promise.all([
    loadJson<Place[]>('places.json'),
    loadJson<GuessablePlace[]>('guessable-places.json'),
    loadJson<TriviaQuestion[]>('trivia.json'),
    loadJson<Tip[]>('tips.json'),
  ])
  return { places, guessOnly, trivia, tips }
}

/** Everything that can be typed as a guess: every answer plus the guess-only list. */
export function allGuessable(content: Content): GuessablePlace[] {
  const seen = new Set<string>()
  return [...content.places, ...content.guessOnly].filter((p) => !seen.has(p.id) && seen.add(p.id))
}
