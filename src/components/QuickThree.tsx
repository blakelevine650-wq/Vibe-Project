import { useEffect, useRef, useState } from 'react'
import { CATEGORY_LABELS } from '../lib/daily'
import { TRIVIA_POINTS } from '../lib/scoring'
import type { TriviaQuestion } from '../types'
import { ChoiceQuestion } from './ChoiceQuestion'

interface Props {
  questions: TriviaQuestion[]
  /** Seeds the choice order. */
  dateKey: string
  onDone: (results: boolean[]) => void
}

export function QuickThree({ questions, dateKey, onDone }: Props) {
  const [answers, setAnswers] = useState<boolean[]>([])
  const [index, setIndex] = useState(0)
  const nextRef = useRef<HTMLButtonElement>(null)
  const question = questions[index]!
  const answered = answers.length > index
  const isLast = index === questions.length - 1

  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  return (
    <section className="card">
      <p className="eyebrow">Round 2</p>
      <h2>Quick Three</h2>
      <div className="question-meta">
        <span className="chip">{CATEGORY_LABELS[question.category]}</span>
        <span className="muted">
          Question {index + 1} of {questions.length} · {TRIVIA_POINTS} pts
        </span>
      </div>

      <ChoiceQuestion
        key={question.id}
        question={question.question}
        choices={question.choices}
        answerIndex={question.answerIndex}
        explanation={question.explanation}
        seed={`${question.id}:${dateKey}`}
        onAnswered={(correct) => setAnswers((a) => [...a, correct])}
      />

      {answered && (
        <button ref={nextRef} className="btn primary" onClick={() => (isLast ? onDone(answers) : setIndex(index + 1))}>
          {isLast ? 'Continue to Tip of the Day' : 'Next question'}
        </button>
      )}
    </section>
  )
}
