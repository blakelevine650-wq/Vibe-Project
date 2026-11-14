import { useEffect, useRef, useState } from 'react'
import { TIP_POINTS } from '../lib/scoring'
import type { Tip } from '../types'
import { ChoiceQuestion } from './ChoiceQuestion'

const SYSTEM_LABELS: Record<Tip['system'], string> = {
  canvas: 'Canvas',
  'wolverine-access': 'Wolverine Access',
}

function Steps({ steps }: { steps: string[] }) {
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  )
}

interface Props {
  tip: Tip
  /** Seeds the choice order. */
  dateKey: string
  /** Called as soon as the check is answered, so the result is saved before the player moves on. */
  onAnswered: (correct: boolean) => void
  onDone: () => void
}

export function TipOfTheDay({ tip, dateKey, onAnswered, onDone }: Props) {
  // Read the card first; the steps are hidden while you answer, then shown again.
  const [stage, setStage] = useState<'read' | 'check'>('read')
  const [result, setResult] = useState<boolean | null>(null)
  const finishRef = useRef<HTMLButtonElement>(null)
  const checkHeadingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (result !== null) finishRef.current?.focus()
    else if (stage === 'check') checkHeadingRef.current?.focus()
  }, [stage, result])

  return (
    <section className="page">
      <p className="kicker">Section C · Tip of the Day</p>

      {stage === 'read' ? (
        <>
          <div className="clipping">
            <p className="clipping-label">
              <span>Clip &amp; save</span>
              <span>{SYSTEM_LABELS[tip.system]}</span>
            </p>
            <h3 className="headline">{tip.title}</h3>
            <Steps steps={tip.steps} />
          </div>
          <button className="btn-ink" onClick={() => setStage('check')}>
            <span>Got it — quick check</span>
            <span aria-hidden="true">→</span>
          </button>
          <p className="fineprint">The steps are hidden during the check. {TIP_POINTS} pts.</p>
        </>
      ) : (
        <>
          <div className="question-meta">
            <span className="tag">{SYSTEM_LABELS[tip.system]}</span>
            <span className="meta-note">Quick check · {TIP_POINTS} pts</span>
          </div>
          <h3 ref={checkHeadingRef} tabIndex={-1} className="check-title">
            Quick check: {tip.title}
          </h3>
          <ChoiceQuestion
            question={tip.check.question}
            choices={tip.check.choices}
            answerIndex={tip.check.answerIndex}
            seed={`${tip.id}:${dateKey}`}
            onAnswered={(correct) => {
              setResult(correct)
              onAnswered(correct)
            }}
          />
          {result !== null && (
            <>
              <details className="recap" open={!result}>
                <summary>Review the steps</summary>
                <Steps steps={tip.steps} />
              </details>
              <button ref={finishRef} className="btn-ink" onClick={onDone}>
                <span>See your results</span>
                <span aria-hidden="true">→</span>
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
