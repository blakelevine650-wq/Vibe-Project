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

export function Results({ puzzle, results, onNewDay }: { puzzle: DailyPuzzle; results: RoundResults; onNewDay: () => void }) {
  const score = scoreResults(results)
  const shown = useCountUp(score.total)
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
    <section className="page">
      <p className="kicker">Final · No. {puzzle.dayNumber}</p>
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
          A new puzzle is ready — play it
        </button>
      ) : (
        <p className="next-edition">
          <span>Next edition in</span>
          <span className="countdown" role="timer">
            {formatCountdown(today.msLeft)}
          </span>
        </p>
      )}
    </section>
  )
}
