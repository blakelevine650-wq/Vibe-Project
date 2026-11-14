import { useEffect, useState } from 'react'
import { getDateKey, msUntilNextDay } from './date'

/** Ticks once a second: the current Detroit date key and time left in the day. */
export function useToday(): { dateKey: string; msLeft: number } {
  const read = () => ({ dateKey: getDateKey(), msLeft: msUntilNextDay() })
  const [state, setState] = useState(read)
  useEffect(() => {
    const id = setInterval(() => setState(read()), 1000)
    return () => clearInterval(id)
  }, [])
  return state
}
