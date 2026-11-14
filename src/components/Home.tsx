import { CLUE_POINTS, MAX_SCORE, TIP_POINTS, TRIVIA_POINTS } from '../lib/scoring'

const ROUNDS = [
  { name: 'Campus Clue', text: 'One mystery place. Five guesses. Every miss tells you how far and which way.', points: CLUE_POINTS[0]! },
  { name: 'Quick Three', text: 'Sports, traditions and campus life — one question each.', points: 3 * TRIVIA_POINTS },
  { name: 'Tip of the Day', text: 'A Canvas or Wolverine Access how-to, then a one-question check.', points: TIP_POINTS },
]

export function Home({ onStart }: { onStart: () => void }) {
  return (
    <section className="page">
      <p className="kicker">Today's edition</p>
      <h2 className="headline xl">
        A place to find, three things to know, <em>one thing to learn.</em>
      </h2>
      <p className="deck">About five minutes. Everyone on campus gets the same puzzle, and a new one lands at midnight.</p>

      <button className="btn-ink" onClick={onStart}>
        <span>Play today's puzzle</span>
        <span aria-hidden="true">→</span>
      </button>
      <p className="fineprint">{MAX_SCORE} points on the table.</p>

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
