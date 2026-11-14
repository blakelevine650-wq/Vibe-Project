/**
 * Phase 1 stand-ins for the three rounds. Each shows what the daily engine
 * selected and lets you choose an outcome, so the flow and the results screen
 * can be tested end to end. Phases 2 and 3 replace these with real gameplay.
 */
import { useState } from 'react'
import { CATEGORY_LABELS } from '../lib/daily'
import { MAX_CLUE_GUESSES } from '../lib/scoring'
import type { Place, RoundResults, Tip, TriviaQuestion } from '../types'

function PlaceholderNote({ phase }: { phase: number }) {
  return <p className="note">Placeholder round — real gameplay arrives in Phase {phase}. Pick an outcome to continue.</p>
}

export function CluePlaceholder({ place, onDone }: { place: Place; onDone: (r: RoundResults['clue']) => void }) {
  return (
    <section className="card">
      <p className="eyebrow">Round 1</p>
      <h2>Campus Clue</h2>
      <PlaceholderNote phase={2} />
      <p>
        Today's place: <strong>{place.name}</strong>
      </p>
      <p className="muted">
        {place.lat.toFixed(4)}, {place.lng.toFixed(4)} · {place.clues.length} clues
      </p>
      <div className="choice-grid">
        {Array.from({ length: MAX_CLUE_GUESSES }, (_, i) => i + 1).map((n) => (
          <button key={n} className="btn" onClick={() => onDone({ solved: true, guesses: n })}>
            Solved in {n}
          </button>
        ))}
        <button className="btn" onClick={() => onDone({ solved: false, guesses: MAX_CLUE_GUESSES })}>
          Missed
        </button>
      </div>
    </section>
  )
}

export function TriviaPlaceholder({ questions, onDone }: { questions: TriviaQuestion[]; onDone: (r: boolean[]) => void }) {
  const [marks, setMarks] = useState<(boolean | undefined)[]>(() => questions.map(() => undefined))
  const complete = marks.every((m) => m !== undefined)
  return (
    <section className="card">
      <p className="eyebrow">Round 2</p>
      <h2>Quick Three</h2>
      <PlaceholderNote phase={3} />
      {questions.map((q, i) => (
        <div key={q.id} className="question">
          <p className="eyebrow">{CATEGORY_LABELS[q.category]}</p>
          <p>{q.question}</p>
          <div className="toggle-row">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                className={`btn small ${marks[i] === value ? 'selected' : ''}`}
                aria-pressed={marks[i] === value}
                onClick={() => setMarks((m) => m.map((old, j) => (j === i ? value : old)))}
              >
                {value ? 'Mark correct' : 'Mark wrong'}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="btn primary" disabled={!complete} onClick={() => onDone(marks.map(Boolean))}>
        Continue
      </button>
    </section>
  )
}

export function TipPlaceholder({ tip, onDone }: { tip: Tip; onDone: (correct: boolean) => void }) {
  return (
    <section className="card">
      <p className="eyebrow">Round 3 · {tip.system === 'canvas' ? 'Canvas' : 'Wolverine Access'}</p>
      <h2>Tip of the Day</h2>
      <PlaceholderNote phase={3} />
      <h3>{tip.title}</h3>
      <ol className="steps">
        {tip.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <p>
        <strong>Check:</strong> {tip.check.question}
      </p>
      <div className="toggle-row">
        <button className="btn" onClick={() => onDone(true)}>
          Mark correct
        </button>
        <button className="btn" onClick={() => onDone(false)}>
          Mark wrong
        </button>
      </div>
    </section>
  )
}
