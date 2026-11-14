import { useEffect, useState } from 'react'
import { CampusClue } from './components/CampusClue'
import { Home } from './components/Home'
import { Results } from './components/Results'
import { QuickThree } from './components/QuickThree'
import { TipOfTheDay } from './components/TipOfTheDay'
import { allGuessable, loadContent } from './lib/content'
import { getDailyPuzzle } from './lib/daily'
import { getDateKey } from './lib/date'
import { useTheme } from './lib/theme'
import type { Content, RoundResults } from './types'

type Stage = 'home' | 'clue' | 'trivia' | 'tip' | 'results'
const ROUND_STAGES: Stage[] = ['clue', 'trivia', 'tip']

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [content, setContent] = useState<Content | null>(null)
  const [error, setError] = useState<string | null>(null)
  // The date is fixed when a session starts, so the puzzle can't change mid-game.
  const [dateKey, setDateKey] = useState(getDateKey)
  const [stage, setStage] = useState<Stage>('home')
  const [results, setResults] = useState<Partial<RoundResults>>({})

  useEffect(() => {
    loadContent().then(setContent, (e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  const startNewDay = () => {
    setDateKey(getDateKey())
    setResults({})
    setStage('home')
  }

  let body
  if (error) {
    body = (
      <section className="card" role="alert">
        <h2>Couldn't load today's puzzle</h2>
        <p className="muted">{error}</p>
        <button className="btn" onClick={() => window.location.reload()}>
          Try again
        </button>
      </section>
    )
  } else if (!content) {
    body = <p className="muted center">Loading today's puzzle…</p>
  } else {
    const puzzle = getDailyPuzzle(content, dateKey)
    const { clue, trivia, tipCheck } = results
    if (stage === 'home') {
      body = <Home puzzle={puzzle} onStart={() => setStage('clue')} />
    } else if (stage === 'clue') {
      body = (
        <CampusClue
          target={puzzle.place}
          places={allGuessable(content)}
          onDone={(clue) => {
            setResults((r) => ({ ...r, clue }))
            setStage('trivia')
          }}
        />
      )
    } else if (stage === 'trivia') {
      body = (
        <QuickThree
          questions={puzzle.trivia}
          dateKey={puzzle.dateKey}
          onDone={(trivia) => {
            setResults((r) => ({ ...r, trivia }))
            setStage('tip')
          }}
        />
      )
    } else if (stage === 'tip') {
      body = (
        <TipOfTheDay
          tip={puzzle.tip}
          dateKey={puzzle.dateKey}
          onDone={(tipCheck) => {
            setResults((r) => ({ ...r, tipCheck }))
            setStage('results')
          }}
        />
      )
    } else if (clue && trivia && tipCheck !== undefined) {
      body = <Results puzzle={puzzle} results={{ clue, trivia, tipCheck }} onNewDay={startNewDay} />
    }
  }

  const roundIndex = ROUND_STAGES.indexOf(stage)

  return (
    <div className="app">
      <header className="header">
        <h1 className="brand">
          Wolverine <span>Daily</span>
        </h1>
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {roundIndex >= 0 && (
        <ol className="progress" aria-label="Round progress">
          {['Campus Clue', 'Quick Three', 'Tip of the Day'].map((label, i) => (
            <li key={label} className={i < roundIndex ? 'done' : i === roundIndex ? 'current' : ''} aria-current={i === roundIndex ? 'step' : undefined}>
              {label}
            </li>
          ))}
        </ol>
      )}

      <main className="main">{body}</main>

      <footer className="footer">
        Unofficial student project. Not affiliated with or endorsed by the University of Michigan.
      </footer>
    </div>
  )
}
