import type { Content, Place, Tip, TriviaQuestion } from '../types'

async function loadJson<T>(file: string): Promise<T> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${file}`)
  if (!res.ok) throw new Error(`Could not load ${file} (${res.status})`)
  return (await res.json()) as T
}

export async function loadContent(): Promise<Content> {
  const [places, trivia, tips] = await Promise.all([
    loadJson<Place[]>('places.json'),
    loadJson<TriviaQuestion[]>('trivia.json'),
    loadJson<Tip[]>('tips.json'),
  ])
  return { places, trivia, tips }
}
