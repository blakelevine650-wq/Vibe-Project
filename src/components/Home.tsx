import { CLUE_POINTS, MAX_SCORE, TIP_POINTS, TRIVIA_POINTS } from '../lib/scoring'

const ROUNDS = [
  { name: 'Campus Clue', text: 'One mystery place. Five guesses. Every miss tells you how far and which way.', points: CLUE_POINTS[0]! },
  { name: 'Quick Three', text: 'Sports, traditions and campus life — one question each.', points: 3 * TRIVIA_POINTS },
  { name: 'Tip of the Day', text: 'A Canvas or Wolverine Access how-to, then a one-question check.', points: TIP_POINTS },
]

interface Props {
  status: 'new' | 'in-progress' | 'done'
  streak: number
  onStart: () => void
  onPractice: () => void
}

export function Home({ status, streak, onStart, onPractice }: Props) {
  const streakLine = streak > 0 ? `${streak}-day streak` : null
  return (
    <section className="page">
      <p className="kicker">{status === 'done' ? "Today's edition · finished" : "Today's edition"}</p>
      {status === 'done' ? (
        <>
          <h2 className="headline xl">
            That's today's paper read. <em>Back at midnight.</em>
          </h2>
          <p className="deck">You can look over your results, or pull a back issue to practice. Practice never touches your streak.</p>
        </>
      ) : (
        <>
          <h2 className="headline xl">
            A place to find, three things to know, <em>one thing to learn.</em>
          </h2>
          <p className="deck">About five minutes. Everyone on campus gets the same puzzle, and a new one lands at midnight.</p>
        </>
      )}

      <button className="btn-ink" onClick={onStart}>
        <span>{status === 'done' ? "See today's results" : status === 'in-progress' ? "Continue today's puzzle" : "Play today's puzzle"}</span>
        <span aria-hidden="true">→</span>
      </button>
      <button className="btn-line" onClick={onPractice}>
        <span>Practice with a back issue</span>
        <span aria-hidden="true">↺</span>
      </button>
      <p className="fineprint">{[streakLine, status === 'done' ? null : `${MAX_SCORE} points on the table`].filter(Boolean).join(' · ')}</p>

      <p className="kicker index-kicker">In this edition</p>
      <ol className="index">
        {ROUNDS.map((round, i) => (
          <li key={round.name}>
            <span className="index-letter" aria-hidden="true">
              {'ABC'[i]}
            </span>
            <div className="index-body">
              <h3>{round.name}</h3>
              <p>{round.text}</p>
            </div>
            <span className="index-points">
              {round.points}
              <small>pts</small>
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
