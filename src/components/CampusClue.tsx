import { useEffect, useRef, useState } from 'react'
import { feedbackFor, searchPlaces } from '../lib/geo'
import { CLUE_POINTS, MAX_CLUE_GUESSES } from '../lib/scoring'
import type { GuessablePlace, Place, RoundResults } from '../types'
import { Compass } from './Compass'

const MAX_SUGGESTIONS = 6

interface Props {
  target: Place
  /** Every place a player is allowed to guess. */
  places: GuessablePlace[]
  onDone: (result: RoundResults['clue']) => void
}

export function CampusClue({ target, places, onDone }: Props) {
  const [guesses, setGuesses] = useState<GuessablePlace[]>([])
  const [query, setQuery] = useState('')
  const [hint, setHint] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const continueRef = useRef<HTMLButtonElement>(null)

  const solved = guesses.some((g) => g.id === target.id)
  const finished = solved || guesses.length >= MAX_CLUE_GUESSES
  // One clue to start, one more after each wrong guess.
  const cluesShown = Math.min(target.clues.length, guesses.length + (solved ? 0 : 1))
  const suggestions = searchPlaces(
    places,
    query,
    guesses.map((g) => g.id),
  )

  useEffect(() => {
    if (finished) continueRef.current?.focus()
  }, [finished])

  const submit = (place: GuessablePlace) => {
    setGuesses((g) => [...g, place])
    setQuery('')
    setHint('')
    inputRef.current?.focus()
  }

  const submitTyped = () => {
    if (suggestions.length === 1) submit(suggestions[0]!)
    else if (!query.trim()) setHint('Type a campus place to guess.')
    else if (suggestions.length === 0) setHint('No campus place matches that. Try another name.')
    else setHint('Pick one of the matching places below.')
  }

  const last = guesses[guesses.length - 1]
  let announcement = ''
  if (solved) announcement = `Correct! It was ${target.name}.`
  else if (finished) announcement = `Out of guesses. It was ${target.name}.`
  else if (last) announcement = `${last.name} is wrong. The place is ${feedbackFor(last, target).spoken} of there. New clue added.`

  return (
    <section className="page">
      <p className="kicker">Section A · Campus Clue</p>
      <h2 className="headline">Where on campus is this?</h2>

      <ol className="clues" aria-label="Clues">
        {target.clues.slice(0, cluesShown).map((clue, i) => (
          <li key={clue} className={i === cluesShown - 1 && !finished ? 'latest' : ''}>
            <span className="clue-number">Clue {i + 1}</span>
            {clue}
          </li>
        ))}
      </ol>

      {guesses.length > 0 && (
        <ol className="ledger" aria-label="Your guesses">
          {guesses.map((guess, i) => {
            const hit = guess.id === target.id
            const fb = hit ? null : feedbackFor(guess, target)
            return (
              <li key={guess.id} className={hit ? 'hit' : 'miss'}>
                <span className="ledger-number" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="ledger-name">{guess.name}</span>
                {fb ? (
                  <span className="ledger-feedback" aria-label={`${fb.spoken} of here`}>
                    <span className="ledger-distance">
                      {fb.distance}
                      <small>{fb.abbr}</small>
                    </span>
                    <Compass bearing={fb.bearing} />
                  </span>
                ) : (
                  <span className="ledger-feedback found">Found</span>
                )}
              </li>
            )
          })}
        </ol>
      )}

      <p className="sr-only" role="status">
        {announcement}
      </p>

      {finished ? (
        <>
          <div className={`outcome ${solved ? 'win' : 'loss'}`}>
            <span className="outcome-label">{solved ? `+${CLUE_POINTS[guesses.length - 1]} points` : 'The answer'}</span>
            <strong>{solved ? `You found it in ${guesses.length}!` : `It was ${target.name}.`}</strong>
            {!solved && <span className="outcome-note">No points this round.</span>}
          </div>
          <button ref={continueRef} className="btn-ink" onClick={() => onDone({ solved, guesses: guesses.length })}>
            <span>Continue to Quick Three</span>
            <span aria-hidden="true">→</span>
          </button>
        </>
      ) : (
        <form
          className="guess-form"
          onSubmit={(e) => {
            e.preventDefault()
            submitTyped()
          }}
        >
          <div className="guess-head">
            <label htmlFor="clue-guess" className="kicker">
              Guess {guesses.length + 1} of {MAX_CLUE_GUESSES}
            </label>
            <span className="pips" aria-hidden="true">
              {Array.from({ length: MAX_CLUE_GUESSES }, (_, i) => (
                <i key={i} className={i < guesses.length ? 'used' : i === guesses.length ? 'now' : ''} />
              ))}
            </span>
          </div>
          <div className="guess-row">
            <input
              id="clue-guess"
              ref={inputRef}
              className="guess-input"
              type="text"
              value={query}
              placeholder="Type a building or landmark"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="go"
              aria-describedby="clue-hint"
              onChange={(e) => {
                setQuery(e.target.value)
                setHint('')
              }}
            />
            <button type="submit" className="btn-ink small">
              Guess
            </button>
          </div>
          <p id="clue-hint" className="hint" aria-live="polite">
            {hint}
          </p>
          {suggestions.length > 0 && (
            <ul className="suggestions" aria-label="Matching places">
              {suggestions.slice(0, MAX_SUGGESTIONS).map((place) => (
                <li key={place.id}>
                  <button type="button" onClick={() => submit(place)}>
                    <span>{place.name}</span>
                    <span aria-hidden="true">↵</span>
                  </button>
                </li>
              ))}
              {suggestions.length > MAX_SUGGESTIONS && (
                <li className="suggestions-more">{suggestions.length - MAX_SUGGESTIONS} more — keep typing to narrow it down.</li>
              )}
            </ul>
          )}
        </form>
      )}
    </section>
  )
}
