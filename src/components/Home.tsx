import type { DailyPuzzle } from '../types'

const ROUNDS = [
  { icon: '📍', name: 'Campus Clue', text: 'Find the mystery campus place in 5 guesses.' },
  { icon: '❓', name: 'Quick Three', text: 'Sports, traditions, and campus life.' },
  { icon: '💡', name: 'Tip of the Day', text: 'One Canvas or Wolverine Access how-to.' },
]

export function formatDateKey(dateKey: string): string {
  // Noon UTC keeps the weekday right whatever zone the browser is in.
  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function Home({ puzzle, onStart }: { puzzle: DailyPuzzle; onStart: () => void }) {
  return (
    <section className="card">
      <p className="eyebrow">
        Puzzle #{puzzle.dayNumber} · {formatDateKey(puzzle.dateKey)}
      </p>
      <h2>Today's three rounds</h2>
      <ul className="round-list">
        {ROUNDS.map((r) => (
          <li key={r.name}>
            <span className="round-icon" aria-hidden="true">
              {r.icon}
            </span>
            <div>
              <strong>{r.name}</strong>
              <p className="muted">{r.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn primary" onClick={onStart}>
        Play today's puzzle
      </button>
    </section>
  )
}
