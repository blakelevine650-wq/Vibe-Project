import { useEffect, useRef, useState } from 'react'
import { CATEGORY_LABELS } from '../lib/daily'
import { TRIVIA_POINTS } from '../lib/scoring'
import type { TriviaQuestion } from '../types'
import { ChoiceQuestion } from './ChoiceQuestion'

interface Props {
  questions: TriviaQuestion[]
  /** Seeds the choice order. */
  dateKey: string
  /** Answers already given, when resuming a saved game. */
  initialAnswers: boolean[]
  /** Called with every answer so far each time one is added. */
  onAnswer: (answers: boolean[]) => void
  onDone: (results: boolean[]) => void
}

export function QuickThree({ questions, dateKey, initialAnswers, onAnswer, onDone }: Props) {
  const [answers, setAnswers] = useState<boolean[]>(initialAnswers)
  // Resuming picks up at the first unanswered question.
  const [index, setIndex] = useState(Math.min(initialAnswers.length, questions.length - 1))
  const nextRef = useRef<HTMLButtonElement>(null)
  const question = questions[index]!
  const answered = answers.length > index
  const isLast = index === questions.length - 1

  useEffect(() => {
    if (answered) nextRef.current?.focus()
  }, [answered])

  return (
    <section className="page">
      <p className="kicker">Section B · Quick Three</p>
      <div className="question-meta">
        <span className="tag">{CATEGORY_LABELS[question.category]}</span>
        <span className="meta-note">
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
        onAnswered={(correct) => {
          const next = [...answers, correct]
          setAnswers(next)
          onAnswer(next)
        }}
      />

      {answered && (
        <button ref={nextRef} className="btn-ink" onClick={() => (isLast ? onDone(answers) : setIndex(index + 1))}>
          <span>{isLast ? 'Continue to Tip of the Day' : 'Next question'}</span>
          <span aria-hidden="true">→</span>
        </button>
      )}
    </section>
  )
}
