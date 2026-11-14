import { MAX_CLUE_GUESSES, MAX_SCORE } from '../lib/scoring'
import type { Stats } from '../lib/stats'
import type { CompletedGame } from '../lib/storage'

interface Props {
  stats: Stats
  /** Today's finished game, if there is one, so its bar can be highlighted. */
  todayGame: CompletedGame | undefined
  onPractice: () => void
}

export function StatsPage({ stats, todayGame, onPractice }: Props) {
  const figures = [
    { label: 'Played', value: stats.played },
    { label: 'Win %', value: stats.winPct },
    { label: 'Current streak', value: stats.currentStreak },
    { label: 'Best streak', value: stats.maxStreak },
  ]
  const most = Math.max(1, ...stats.distribution)
  const todaySlot = todayGame ? (todayGame.results.clue.solved ? todayGame.results.clue.guesses - 1 : MAX_CLUE_GUESSES) : -1

  return (
    <section className="page">
      <p className="kicker">Standings</p>
      <h2 className="headline">{stats.played ? 'Your record, by the numbers.' : 'No editions on record yet.'}</h2>
      {!stats.played && <p className="deck">Finish today's puzzle and your streak, win rate and guess history start here.</p>}

      <dl className="figures">
        {figures.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="fineprint left">A win is finding the Campus Clue place. Practice games aren't counted.</p>

      <h3 className="kicker subhead">Campus Clue · guesses to find it</h3>
      <ol className="distribution">
        {stats.distribution.map((count, slot) => {
          const label = slot < MAX_CLUE_GUESSES ? String(slot + 1) : '✗'
          const spoken = slot < MAX_CLUE_GUESSES ? `Found on guess ${slot + 1}` : 'Missed'
          return (
            <li key={label} className={slot === todaySlot ? 'today' : ''} aria-label={`${spoken}: ${count} ${count === 1 ? 'game' : 'games'}`}>
              <span className="distribution-label" aria-hidden="true">
                {label}
              </span>
              <span className="distribution-track" aria-hidden="true">
                <span className="distribution-bar" style={{ width: `${(count / most) * 100}%` }} />
              </span>
              <span className="distribution-count" aria-hidden="true">
                {count}
              </span>
            </li>
          )
        })}
      </ol>
      {todaySlot >= 0 && <p className="fineprint left">Highlighted: today.</p>}

      <dl className="scoreline">
        <div>
          <dt>Average score</dt>
          <dd>
            {stats.averageScore}
            <small>/ {MAX_SCORE}</small>
          </dd>
        </div>
        <div>
          <dt>Best score</dt>
          <dd>
            {stats.bestScore}
            <small>/ {MAX_SCORE}</small>
          </dd>
        </div>
      </dl>

      <button className="btn-line" onClick={onPractice}>
        <span>Practice with a back issue</span>
        <span aria-hidden="true">↺</span>
      </button>
    </section>
  )
}
