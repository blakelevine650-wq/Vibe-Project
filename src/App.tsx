import { useEffect, useState } from 'react'
import { CampusClue } from './components/CampusClue'
import { Home } from './components/Home'
import { Library } from './components/Library'
import { QuickThree } from './components/QuickThree'
import { Results } from './components/Results'
import { StatsPage } from './components/StatsPage'
import { TipOfTheDay } from './components/TipOfTheDay'
import { allGuessable, loadContent } from './lib/content'
import { getDailyPuzzle, pickForDay } from './lib/daily'
import { dateKeyForDayNumber, getDateKey, getDayNumber } from './lib/date'
import { scoreResults } from './lib/scoring'
import { computeStats } from './lib/stats'
import { loadSave, writeSave, type RoundStage, type SaveData } from './lib/storage'
import { useTheme } from './lib/theme'
import type { Content, RoundResults, Tip } from './types'

type Stage = 'home' | RoundStage | 'results'
type View = 'today' | 'stats' | 'library'

interface Session {
  /** Changes whenever a new game starts, so round components reset. */
  id: string
  mode: 'daily' | 'practice'
  dayNumber: number
  stage: Stage
  /** Where "Continue" on the front page should go for a half-played daily game. */
  resumeStage: RoundStage | null
  results: Partial<RoundResults>
  clueGuessIds: string[]
  triviaAnswers: boolean[]
}

const ROUND_STAGES: Stage[] = ['clue', 'trivia', 'tip']
const SECTIONS = ['Campus Clue', 'Quick Three', 'The Tip']
const NAV: { view: View; label: string }[] = [
  { view: 'today', label: 'Today' },
  { view: 'stats', label: 'Stats' },
  { view: 'library', label: 'How-tos' },
]
/** How far back practice mode reaches for a back issue. */
const PRACTICE_RANGE_DAYS = 365

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

/** Today's game as it stands in saved data: finished, half-played, or untouched. */
function dailySession(todayKey: string, save: SaveData): Session {
  const base = { id: `daily:${todayKey}`, mode: 'daily' as const, dayNumber: getDayNumber(todayKey), stage: 'home' as const }
  const done = save.history[todayKey]
  if (done) return { ...base, resumeStage: null, results: done.results, clueGuessIds: [], triviaAnswers: [] }
  const p = save.progress
  if (!p || p.dateKey !== todayKey) return { ...base, resumeStage: null, results: {}, clueGuessIds: [], triviaAnswers: [] }
  // All three questions answered but "Continue" not pressed: carry on from the tip.
  const triviaFinished = p.stage === 'trivia' && p.triviaAnswers.length >= 3
  return {
    ...base,
    resumeStage: triviaFinished ? 'tip' : p.stage,
    results: triviaFinished ? { ...p.results, trivia: p.triviaAnswers } : p.results,
    clueGuessIds: p.clueGuessIds,
    triviaAnswers: p.triviaAnswers,
  }
}

const isComplete = (r: Partial<RoundResults>): r is RoundResults => !!r.clue && !!r.trivia && r.tipCheck !== undefined

/** Tips that have already run as Tip of the Day, newest first. */
function publishedTips(content: Content, throughDay: number): Tip[] {
  const seen = new Map<string, Tip>()
  for (let day = throughDay; day >= 1 && seen.size < content.tips.length; day--) {
    const tip = pickForDay(content.tips, day, 'tips')
    if (!seen.has(tip.id)) seen.set(tip.id, tip)
  }
  return [...seen.values()]
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [content, setContent] = useState<Content | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [save, setSave] = useState(loadSave)
  const [saveFailed, setSaveFailed] = useState(false)
  // The date is fixed when a session starts, so the puzzle can't change mid-game.
  const [todayKey, setTodayKey] = useState(getDateKey)
  const [session, setSession] = useState<Session>(() => dailySession(todayKey, save))
  const [view, setView] = useState<View>('today')

  useEffect(() => {
    loadContent().then(setContent, (e: unknown) => setError(e instanceof Error ? e.message : String(e)))
  }, [])

  // Each screen starts at the top, like turning a page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [session.stage, session.id, view])

  const startNewDay = () => {
    const key = getDateKey()
    setTodayKey(key)
    setSession(dailySession(key, save))
    setView('today')
  }

  // Coming back to a tab left open overnight: move the front page on to the new day.
  useEffect(() => {
    const check = () => {
      if (!document.hidden && session.mode === 'daily' && session.stage === 'home' && getDateKey() !== todayKey) startNewDay()
    }
    document.addEventListener('visibilitychange', check)
    return () => document.removeEventListener('visibilitychange', check)
  })

  const persist = (next: SaveData) => {
    setSave(next)
    setSaveFailed(!writeSave(next))
  }

  /** Every change to the game goes through here so the daily game is saved as it happens. */
  const update = (patch: Partial<Session>) => {
    const next = { ...session, ...patch }
    setSession(next)
    if (next.mode !== 'daily' || next.stage === 'home') return
    if (isComplete(next.results)) {
      if (!save.history[todayKey]) {
        const game = { results: next.results, score: scoreResults(next.results).total }
        persist({ history: { ...save.history, [todayKey]: game }, progress: null })
      }
    } else if (next.stage !== 'results') {
      persist({
        ...save,
        progress: {
          dateKey: todayKey,
          stage: next.stage,
          results: next.results,
          clueGuessIds: next.clueGuessIds,
          triviaAnswers: next.triviaAnswers,
        },
      })
    }
  }

  const todayDone = !!save.history[todayKey]
  const todayNumber = getDayNumber(todayKey)

  const startPractice = () => {
    if (!content) return
    // Skip back issues that share today's place, so practice can't spoil an unplayed daily puzzle.
    const todayPlace = pickForDay(content.places, todayNumber, 'places').id
    let dayNumber = todayNumber - 1
    for (let attempt = 0; attempt < 50; attempt++) {
      dayNumber = todayNumber - 1 - Math.floor(Math.random() * PRACTICE_RANGE_DAYS)
      if (pickForDay(content.places, dayNumber, 'places').id !== todayPlace) break
    }
    setSession({
      id: `practice:${dayNumber}:${Date.now()}`,
      mode: 'practice',
      dayNumber,
      stage: 'clue',
      resumeStage: null,
      results: {},
      clueGuessIds: [],
      triviaAnswers: [],
    })
    setView('today')
  }

  const backToToday = () => {
    setSession(dailySession(todayKey, save))
    setView('today')
  }

  const stats = computeStats(save.history, todayKey)
  const practice = session.mode === 'practice'
  const inRound = view === 'today' && ROUND_STAGES.includes(session.stage)
  const roundIndex = inRound ? ROUND_STAGES.indexOf(session.stage) : -1

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
  } else if (view === 'stats') {
    body = <StatsPage stats={stats} todayGame={save.history[todayKey]} onPractice={startPractice} />
  } else if (view === 'library') {
    body = (
      <Library
        tips={publishedTips(content, todayDone ? todayNumber : todayNumber - 1)}
        total={content.tips.length}
        todayPending={!todayDone}
      />
    )
  } else {
    const puzzle = getDailyPuzzle(content, dateKeyForDayNumber(session.dayNumber))
    const { stage, results } = session
    if (stage === 'home') {
      body = (
        <Home
          status={todayDone ? 'done' : session.resumeStage ? 'in-progress' : 'new'}
          streak={stats.currentStreak}
          onStart={() => update({ stage: todayDone ? 'results' : (session.resumeStage ?? 'clue') })}
          onPractice={startPractice}
        />
      )
    } else if (stage === 'clue') {
      body = (
        <CampusClue
          key={session.id}
          target={puzzle.place}
          places={allGuessable(content)}
          initialGuessIds={session.clueGuessIds}
          onGuess={(clueGuessIds) => update({ clueGuessIds })}
          onDone={(clue) => update({ results: { ...results, clue }, stage: 'trivia' })}
        />
      )
    } else if (stage === 'trivia') {
      body = (
        <QuickThree
          key={session.id}
          questions={puzzle.trivia}
          dateKey={puzzle.dateKey}
          initialAnswers={session.triviaAnswers}
          onAnswer={(triviaAnswers) => update({ triviaAnswers })}
          onDone={(trivia) => update({ results: { ...results, trivia }, stage: 'tip' })}
        />
      )
    } else if (stage === 'tip') {
      body = (
        <TipOfTheDay
          key={session.id}
          tip={puzzle.tip}
          dateKey={puzzle.dateKey}
          onAnswered={(tipCheck) => update({ results: { ...results, tipCheck } })}
          onDone={() => update({ stage: 'results' })}
        />
      )
    } else if (isComplete(results)) {
      body = (
        <Results
          puzzle={puzzle}
          results={results}
          practice={practice}
          streak={stats.currentStreak}
          onNewDay={startNewDay}
          onPractice={startPractice}
          onHome={backToToday}
        />
      )
    }
  }

  return (
    <div className="sheet">
      <header className={`masthead ${view === 'today' && session.stage === 'home' ? '' : 'compact'}`}>
        <div className="masthead-strip">
          <span>Ann Arbor, Mich.</span>
          <span>No. {todayNumber}</span>
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
          <span>{formatDateline(todayKey)}</span>
          <span>The campus puzzle</span>
        </p>
      </header>

      {inRound ? (
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
      ) : (
        <nav className="sections nav" aria-label="Pages">
          {NAV.map((item) => (
            <button
              key={item.view}
              className={view === item.view ? 'current' : ''}
              aria-current={view === item.view ? 'page' : undefined}
              onClick={() => (item.view === 'today' && practice ? backToToday() : setView(item.view))}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}

      {practice && view === 'today' && (
        <p className="practice-bar">
          <span>Practice · back issue · no streak</span>
          {inRound && <button onClick={backToToday}>Quit</button>}
        </p>
      )}

      <main className="main" key={`${view}:${session.id}:${session.stage}`}>
        {body}
        {saveFailed && (
          <p className="hint" role="status">
            This browser isn't saving your progress (private mode or full storage), so today's game and your streak won't be
            remembered.
          </p>
        )}
      </main>

      <footer className="colophon">
        Unofficial student project. Not affiliated with or endorsed by the University of Michigan.
      </footer>
    </div>
  )
}
