import type { GuessablePlace as Place } from '../types'

const EARTH_RADIUS_MILES = 3958.8
const toRad = (deg: number) => (deg * Math.PI) / 180

interface LatLng {
  lat: number
  lng: number
}

/** Great-circle distance in miles (haversine). */
export function distanceMiles(from: LatLng, to: LatLng): number {
  const dLat = toRad(to.lat - from.lat)
  const dLng = toRad(to.lng - from.lng)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a))
}

/** Compass bearing from one point toward another: 0 = north, 90 = east. */
export function bearingDegrees(from: LatLng, to: LatLng): number {
  const dLng = toRad(to.lng - from.lng)
  const y = Math.sin(dLng) * Math.cos(toRad(to.lat))
  const x =
    Math.cos(toRad(from.lat)) * Math.sin(toRad(to.lat)) -
    Math.sin(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.cos(dLng)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

const COMPASS = [
  { arrow: '↑', label: 'north', abbr: 'N' },
  { arrow: '↗', label: 'northeast', abbr: 'NE' },
  { arrow: '→', label: 'east', abbr: 'E' },
  { arrow: '↘', label: 'southeast', abbr: 'SE' },
  { arrow: '↓', label: 'south', abbr: 'S' },
  { arrow: '↙', label: 'southwest', abbr: 'SW' },
  { arrow: '←', label: 'west', abbr: 'W' },
  { arrow: '↖', label: 'northwest', abbr: 'NW' },
]

export function compassFor(bearing: number): { arrow: string; label: string; abbr: string } {
  return COMPASS[Math.round(bearing / 45) % 8]!
}

/** "0.8 mi" normally; feet when closer than a tenth of a mile. */
export function formatDistance(miles: number): string {
  if (miles < 0.1) return `${Math.max(10, Math.round((miles * 5280) / 10) * 10)} ft`
  return `${miles.toFixed(1)} mi`
}

export interface GuessFeedback {
  distance: string
  arrow: string
  /** Compass abbreviation, e.g. "NE". */
  abbr: string
  /** Exact bearing toward the target, in degrees clockwise from north. */
  bearing: number
  /** Spoken version, e.g. "0.8 mi northeast". */
  spoken: string
}

/** How far and which way the target is from a wrong guess. */
export function feedbackFor(guess: Place, target: Place): GuessFeedback {
  const distance = formatDistance(distanceMiles(guess, target))
  const bearing = bearingDegrees(guess, target)
  const { arrow, label, abbr } = compassFor(bearing)
  return { distance, arrow, abbr, bearing, spoken: `${distance} ${label}` }
}

/** Lowercase, strip punctuation and a leading "the", collapse spaces. */
export function normalizeName(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^the /, '')
}

/** Places whose name or an alias contains the typed text. Name-prefix matches come first. */
export function searchPlaces(places: readonly Place[], query: string, excludeIds: readonly string[] = []): Place[] {
  const q = normalizeName(query)
  if (!q) return []
  const scored: { place: Place; rank: number }[] = []
  for (const place of places) {
    if (excludeIds.includes(place.id)) continue
    const names = [place.name, ...(place.aliases ?? [])].map(normalizeName)
    if (!names.some((n) => n.includes(q))) continue
    const rank = names.some((n) => n === q) ? 0 : names.some((n) => n.startsWith(q)) ? 1 : 2
    scored.push({ place, rank })
  }
  return scored.sort((a, b) => a.rank - b.rank || a.place.name.localeCompare(b.place.name)).map((s) => s.place)
}
