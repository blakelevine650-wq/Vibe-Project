import { useMemo, useState } from 'react'
import { choiceOrder } from '../lib/rng'

interface Props {
  question: string
  choices: string[]
  answerIndex: number
  /** Fixes the on-screen order of the choices, so it is the same for everyone that day. */
  seed: string
  explanation?: string
  onAnswered: (correct: boolean) => void
}

/** A multiple-choice question that locks after one answer and shows what was right. */
export function ChoiceQuestion({ question, choices, answerIndex, seed, explanation, onAnswered }: Props) {
  const order = useMemo(() => choiceOrder(choices.length, seed), [choices.length, seed])
  const [picked, setPicked] = useState<number | null>(null)
  const answered = picked !== null
  const correct = picked === answerIndex

  return (
    <div className="choice-question">
      <p className="question-text">{question}</p>
      <div className="choices">
        {order.map((index, position) => {
          const isAnswer = index === answerIndex
          const state = !answered ? '' : isAnswer ? 'correct' : index === picked ? 'wrong' : 'dim'
          return (
            <button
              key={index}
              className={`choice ${state}`}
              // Kept focusable after answering so keyboard and screen-reader users don't lose their place.
              aria-disabled={answered}
              onClick={() => {
                if (answered) return
                setPicked(index)
                onAnswered(isAnswer)
              }}
            >
              <span className="choice-letter" aria-hidden="true">
                {'ABCDEF'[position]}
              </span>
              <span className="choice-text">{choices[index]}</span>
              {state === 'correct' && (
                <span className="choice-mark" aria-label="correct answer">
                  ✓
                </span>
              )}
              {state === 'wrong' && (
                <span className="choice-mark" aria-label="your answer, incorrect">
                  ✗
                </span>
              )}
            </button>
          )
        })}
      </div>
      <div role="status">
        {answered && (
          <p className={`verdict ${correct ? 'right' : 'missed'}`}>
            <strong>{correct ? 'Correct.' : `Not quite. Answer: ${choices[answerIndex]}`}</strong>
            {explanation && <span> {explanation}</span>}
          </p>
        )}
      </div>
    </div>
  )
}
