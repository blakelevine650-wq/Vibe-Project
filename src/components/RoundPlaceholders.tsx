/**
 * Stand-ins for Quick Three and Tip of the Day. Each shows what the daily
 * engine selected and lets you choose an outcome, so the flow and the results
 * screen can be tested end to end. Phase 3 replaces these with real gameplay.
 */
import { useState } from 'react'
import { CATEGORY_LABELS } from '../lib/daily'
import type { Tip, TriviaQuestion } from '../types'

function PlaceholderNote() {
  return <p className="note">Placeholder round — real gameplay arrives in Phase 3. Pick an outcome to continue.</p>
}

export function TriviaPlaceholder({ questions, onDone }: { questions: TriviaQuestion[]; onDone: (r: boolean[]) => void }) {
  const [marks, setMarks] = useState<(boolean | undefined)[]>(() => questions.map(() => undefined))
  const complete = marks.every((m) => m !== undefined)
  return (
    <section className="card">
      <p className="eyebrow">Round 2</p>
      <h2>Quick Three</h2>
      <PlaceholderNote />
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
      <PlaceholderNote />
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
