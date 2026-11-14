import { useState } from 'react'
import { formatCountdown } from '../lib/date'
import { buildShareText, MAX_SCORE, scoreResults } from '../lib/scoring'
import { useToday } from '../lib/useToday'
import type { DailyPuzzle, RoundResults } from '../types'

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function Results({ puzzle, results, onNewDay }: { puzzle: DailyPuzzle; results: RoundResults; onNewDay: () => void }) {
  const score = scoreResults(results)
  const shareText = buildShareText(puzzle.dayNumber, results)
  const today = useToday()
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const newDayReady = today.dateKey !== puzzle.dateKey

  const rows = [
    {
      label: 'Campus Clue',
      detail: results.clue.solved ? `Found in ${results.clue.guesses}` : `Missed — it was ${puzzle.place.name}`,
      points: score.clue,
    },
    { label: 'Quick Three', detail: `${results.trivia.filter(Boolean).length} of 3 correct`, points: score.trivia },
    { label: 'Tip of the Day', detail: results.tipCheck ? 'Check passed' : 'Check missed', points: score.tip },
  ]

  return (
    <section className="card">
      <p className="eyebrow">Puzzle #{puzzle.dayNumber} complete</p>
      <div className="score">
        <span className="score-value">{score.total}</span>
        <span className="score-max">/ {MAX_SCORE}</span>
      </div>

      <table className="breakdown">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">
                {row.label}
                <span className="muted">{row.detail}</span>
              </th>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="stat-row">
        <div>
          <span className="stat-value">—</span>
          <span className="muted">Streak (Phase 4)</span>
        </div>
        <div>
          <span className="stat-value countdown" role="timer">
            {newDayReady ? '00:00:00' : formatCountdown(today.msLeft)}
          </span>
          <span className="muted">Next puzzle</span>
        </div>
      </div>

      <pre className="share-grid" aria-label="Share grid">
        {shareText}
      </pre>
      <button
        className="btn primary"
        onClick={async () => {
          setCopyState((await copyText(shareText)) ? 'copied' : 'failed')
          setTimeout(() => setCopyState('idle'), 2500)
        }}
      >
        {copyState === 'copied' ? 'Copied!' : 'Copy results'}
      </button>
      <p className="muted center" aria-live="polite">
        {copyState === 'failed' && "Couldn't copy automatically — select the text above and copy it."}
      </p>

      {newDayReady && (
        <button className="btn" onClick={onNewDay}>
          A new puzzle is ready — play it
        </button>
      )}
    </section>
  )
}
