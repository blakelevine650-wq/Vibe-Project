/** All "what day is it" logic runs in this zone so every player shares a puzzle. */
export const GAME_TIME_ZONE = 'America/Detroit'

/** Puzzle #1. Day numbers count up from here. */
export const EPOCH_DATE_KEY = '2026-11-14'

const MS_PER_DAY = 86_400_000

function zonedParts(now: Date): Record<string, number> {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: GAME_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const out: Record<string, number> = {}
  for (const p of parts) if (p.type !== 'literal') out[p.type] = Number(p.value)
  return out
}

/** Calendar date in Detroit as YYYY-MM-DD. */
export function getDateKey(now: Date = new Date()): string {
  const p = zonedParts(now)
  const pad = (n: number | undefined, len: number) => String(n).padStart(len, '0')
  return `${pad(p.year, 4)}-${pad(p.month, 2)}-${pad(p.day, 2)}`
}

function dateKeyToUtcMs(dateKey: string): number {
  const [y, m, d] = dateKey.split('-').map(Number)
  return Date.UTC(y!, m! - 1, d!)
}

/** 1 on the epoch date, 2 the day after, and so on. Can be ≤ 0 before launch. */
export function getDayNumber(dateKey: string): number {
  return Math.round((dateKeyToUtcMs(dateKey) - dateKeyToUtcMs(EPOCH_DATE_KEY)) / MS_PER_DAY) + 1
}

export function dateKeyForDayNumber(dayNumber: number): string {
  const ms = dateKeyToUtcMs(EPOCH_DATE_KEY) + (dayNumber - 1) * MS_PER_DAY
  return new Date(ms).toISOString().slice(0, 10)
}

/**
 * Milliseconds until the next Detroit midnight.
 * Uses the wall clock, so on the two DST-change days it is off by an hour
 * until the 2 a.m. switch has happened; the rollover itself is still detected
 * by comparing date keys.
 */
export function msUntilNextDay(now: Date = new Date()): number {
  const p = zonedParts(now)
  const elapsed = ((p.hour! * 60 + p.minute!) * 60 + p.second!) * 1000 + now.getMilliseconds()
  return MS_PER_DAY - elapsed
}

export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(Math.floor(total / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`
}
