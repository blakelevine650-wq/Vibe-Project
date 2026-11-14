import { useEffect, useState } from 'react'
import { CampusClue } from './components/CampusClue'
import { Home } from './components/Home'
import { QuickThree } from './components/QuickThree'
import { Results } from './components/Results'
import { TipOfTheDay } from './components/TipOfTheDay'
import { allGuessable, loadContent } from './lib/content'
import { getDailyPuzzle } from './lib/daily'
import { getDateKey, getDayNumber } from './lib/date'
import { useTheme } from './lib/theme'
import type { Content, RoundResults } from './types'

type Stage = 'home' | 'clue' | 'trivia' | 'tip' | 'results'
const ROUND_STAGES: Stage[] = ['clue', 'trivia', 'tip']
const SECTIONS = ['Campus Clue', 'Quick Three', 'The Tip']

function formatDateline(dateKey: string): string {
  // Noon UTC keeps the weekday right whatever zone the browser is in.
  return new Date(`${dateKey}T12:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

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

  // Each screen starts at the top, like turning a page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stage])

  const startNewDay = () => {
    setDateKey(getDateKey())
    setResults({})
    setStage('home')
  }

  let body
  if (error) {
    body = (
      <section className="page" role="alert">
        <p className="kicker">Stop the presses</p>
        <h2 className="headline">Today's edition didn't load.</h2>
        <p className="deck">{error}</p>
        <button className="btn-ink" onClick={() => window.location.reload()}>
          Try again
        </button>
      </section>
    )
  } else if (!content) {
    body = <p className="loading">Setting today's edition…</p>
  } else {
    const puzzle = getDailyPuzzle(content, dateKey)
    const { clue, trivia, tipCheck } = results
    if (stage === 'home') {
      body = <Home onStart={() => setStage('clue')} />
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
  const compact = stage !== 'home'

  return (
    <div className="sheet">
      <header className={`masthead ${compact ? 'compact' : ''}`}>
        <div className="masthead-strip">
          <span>Ann Arbor, Mich.</span>
          <span>No. {getDayNumber(dateKey)}</span>
          <button
            className="edition-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'Day ed.' : 'Night ed.'}
          </button>
        </div>
        <h1 className="nameplate">
          Wolverine <em>Daily</em>
        </h1>
        <p className="dateline">
          <span>{formatDateline(dateKey)}</span>
          <span>The campus puzzle</span>
        </p>
      </header>

      {roundIndex >= 0 && (
        <ol className="sections" aria-label="Round progress">
          {SECTIONS.map((label, i) => (
            <li
              key={label}
              className={i < roundIndex ? 'done' : i === roundIndex ? 'current' : ''}
              aria-current={i === roundIndex ? 'step' : undefined}
            >
              <span className="section-letter">{'ABC'[i]}</span>
              {label}
            </li>
          ))}
        </ol>
      )}

      <main className="main" key={stage}>
        {body}
      </main>

      <footer className="colophon">
        Unofficial student project. Not affiliated with or endorsed by the University of Michigan.
      </footer>
    </div>
  )
}
