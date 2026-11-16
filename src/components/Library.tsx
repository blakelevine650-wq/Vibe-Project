import { useState } from 'react'
import { normalizeName } from '../lib/geo'
import type { Tip } from '../types'

const GROUPS: { system: Tip['system']; label: string }[] = [
  { system: 'canvas', label: 'Canvas' },
  { system: 'wolverine-access', label: 'Wolverine Access' },
]

interface Props {
  /** Tips that have already run as Tip of the Day. */
  tips: Tip[]
  /** How many tips exist in total, published or not. */
  total: number
  /** True when today's tip is held back because today's puzzle isn't finished. */
  todayPending: boolean
}

export function Library({ tips, total, todayPending }: Props) {
  const [query, setQuery] = useState('')
  const q = normalizeName(query)
  const matches = q ? tips.filter((t) => normalizeName([t.title, ...t.steps].join(' ')).includes(q)) : tips

  return (
    <section className="page">
      <p className="kicker">How-to library</p>
      <h2 className="headline">Every tip we've run, clipped and filed.</h2>

      {tips.length === 0 ? (
        <p className="deck">
          Nothing filed yet. {todayPending ? "Finish today's puzzle and its tip lands here." : 'A new tip is filed with each edition.'}
        </p>
      ) : (
        <>
          <div className="search">
            <label htmlFor="library-search" className="kicker">
              Search the library
            </label>
            <input
              id="library-search"
              className="guess-input"
              type="search"
              value={query}
              placeholder="grades, schedule, transcript…"
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p className="fineprint left" role="status">
            {q ? `${matches.length} of ${tips.length} match` : `${tips.length} of ${total} filed so far`}
            {todayPending && !q ? " · today's tip is filed when you finish today's puzzle" : ''}
          </p>

          {GROUPS.map((group) => {
            const groupTips = matches.filter((t) => t.system === group.system)
            if (groupTips.length === 0) return null
            return (
              <div key={group.system} className="shelf">
                <h3 className="shelf-title">
                  <span>{group.label}</span>
                  <span>{groupTips.length}</span>
                </h3>
                {groupTips.map((tip) => (
                  <details key={tip.id} className="recap filed" open={!!q && matches.length <= 2}>
                    <summary>{tip.title}</summary>
                    <ol className="steps">
                      {tip.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </details>
                ))}
              </div>
            )
          })}
          {matches.length === 0 && <p className="deck">No filed tip mentions “{query.trim()}”.</p>}
        </>
      )}
    </section>
  )
}
