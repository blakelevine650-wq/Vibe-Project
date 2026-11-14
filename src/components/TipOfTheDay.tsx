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
  onDone: (correct: boolean) => void
}

export function TipOfTheDay({ tip, dateKey, onDone }: Props) {
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
    <section className="card">
      <p className="eyebrow">Round 3</p>
      <h2>Tip of the Day</h2>
      <span className="chip">{SYSTEM_LABELS[tip.system]}</span>

      {stage === 'read' ? (
        <>
          <h3>{tip.title}</h3>
          <Steps steps={tip.steps} />
          <button className="btn primary" onClick={() => setStage('check')}>
            Got it — quick check
          </button>
          <p className="muted center">The steps are hidden during the check. {TIP_POINTS} pts.</p>
        </>
      ) : (
        <>
          <h3 ref={checkHeadingRef} tabIndex={-1}>
            Quick check: {tip.title}
          </h3>
          <ChoiceQuestion
            question={tip.check.question}
            choices={tip.check.choices}
            answerIndex={tip.check.answerIndex}
            seed={`${tip.id}:${dateKey}`}
            onAnswered={setResult}
          />
          {result !== null && (
            <>
              <details className="recap" open={!result}>
                <summary>Review the steps</summary>
                <Steps steps={tip.steps} />
              </details>
              <button ref={finishRef} className="btn primary" onClick={() => onDone(result)}>
                See your results
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
