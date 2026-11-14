import { useState } from 'react'
import { formatCountdown } from '../lib/date'
import { buildShareText, MAX_SCORE, scoreResults } from '../lib/scoring'
import { useCountUp } from '../lib/useCountUp'
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

function verdictFor(total: number): string {
  if (total === MAX_SCORE) return 'A perfect edition.'
  if (total >= 150) return 'Front-page material.'
  if (total >= 100) return 'A solid day on the Diag.'
  if (total >= 50) return 'Room to grow before finals.'
  return 'Tomorrow is another edition.'
}

interface Props {
  puzzle: DailyPuzzle
  results: RoundResults
  /** Practice games show the score only: no share grid, streak or countdown. */
  practice: boolean
  streak: number
  onNewDay: () => void
  onPractice: () => void
  onHome: () => void
}

export function Results({ puzzle, results, practice, streak, onNewDay, onPractice, onHome }: Props) {
  const score = scoreResults(results)
  const shown = useCountUp(score.total)
  // The page's own address, without any ?query or #hash, so the link works wherever the game is hosted.
  const shareText = buildShareText(puzzle.dayNumber, results, window.location.origin + window.location.pathname)
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
    <section className="page">
      <p className="kicker">{practice ? 'Practice · back issue' : `Final · No. ${puzzle.dayNumber}`}</p>
      <h2 className="headline">{verdictFor(score.total)}</h2>

      <div className="score" aria-label={`${score.total} out of ${MAX_SCORE} points`}>
        <span className="score-value" aria-hidden="true">
          {shown}
        </span>
        <span className="score-max" aria-hidden="true">
          of {MAX_SCORE}
        </span>
      </div>

      <table className="breakdown">
        <caption className="kicker">Box score</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">
                {row.label}
                <span>{row.detail}</span>
              </th>
              <td>{row.points}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>{score.total}</td>
          </tr>
        </tfoot>
      </table>

      {practice ? (
        <>
          <p className="fineprint left">Practice games don't count toward your streak or stats.</p>
          <button className="btn-ink" onClick={onPractice}>
            <span>Another back issue</span>
            <span aria-hidden="true">↺</span>
          </button>
          <button className="btn-line" onClick={onHome}>
            <span>Back to today's edition</span>
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : (
        <>
          <dl className="figures pair">
            <div>
              <dt>Streak</dt>
              <dd>
                {streak}
                <small>{streak === 1 ? 'day' : 'days'}</small>
              </dd>
            </div>
            <div>
              <dt>{newDayReady ? 'Next edition' : 'Next edition in'}</dt>
              <dd className="countdown" role="timer">
                {newDayReady ? 'Out now' : formatCountdown(today.msLeft)}
              </dd>
            </div>
          </dl>

          <div className="clipping share">
            <p className="clipping-label">
              <span>Share your score</span>
              <span>No spoilers</span>
            </p>
            <pre className="share-grid" aria-label="Share grid">
              {shareText}
            </pre>
          </div>
          <button
            className="btn-ink"
            onClick={async () => {
              setCopyState((await copyText(shareText)) ? 'copied' : 'failed')
              setTimeout(() => setCopyState('idle'), 2500)
            }}
          >
            <span>{copyState === 'copied' ? 'Copied!' : 'Copy results'}</span>
            <span aria-hidden="true">{copyState === 'copied' ? '✓' : '⧉'}</span>
          </button>
          <p className="hint copy-hint" aria-live="polite">
            {copyState === 'failed' && "Couldn't copy automatically — select the text above and copy it."}
          </p>

          {newDayReady ? (
            <button className="btn-line" onClick={onNewDay}>
              <span>A new puzzle is ready — play it</span>
              <span aria-hidden="true">→</span>
            </button>
          ) : (
            <button className="btn-line" onClick={onPractice}>
              <span>Practice with a back issue</span>
              <span aria-hidden="true">↺</span>
            </button>
          )}
        </>
      )}
    </section>
  )
}
