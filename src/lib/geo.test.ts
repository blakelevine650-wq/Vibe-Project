import { describe, expect, it } from 'vitest'
import type { Place } from '../types'
import { bearingDegrees, compassFor, distanceMiles, feedbackFor, formatDistance, normalizeName, searchPlaces } from './geo'

const place = (id: string, name: string, lat: number, lng: number, aliases?: string[]): Place => ({
  id,
  name,
  lat,
  lng,
  aliases,
  clues: [],
})

const origin = place('o', 'Origin', 42.28, -83.74)

describe('distance and direction', () => {
  it('measures distance in miles', () => {
    // One degree of latitude is about 69 miles.
    expect(distanceMiles(origin, { lat: 43.28, lng: -83.74 })).toBeCloseTo(69.1, 0)
    expect(distanceMiles(origin, origin)).toBe(0)
  })

  it('points from the guess toward the target', () => {
    const cases: [number, number, string][] = [
      [0.01, 0, '↑'],
      [0.01, 0.0135, '↗'],
      [0, 0.01, '→'],
      [-0.01, 0.0135, '↘'],
      [-0.01, 0, '↓'],
      [-0.01, -0.0135, '↙'],
      [0, -0.01, '←'],
      [0.01, -0.0135, '↖'],
    ]
    for (const [dLat, dLng, arrow] of cases) {
      const target = { lat: origin.lat + dLat, lng: origin.lng + dLng }
      expect(compassFor(bearingDegrees(origin, target)).arrow).toBe(arrow)
    }
    expect(compassFor(359).arrow).toBe('↑')
  })

  it('formats distance', () => {
    expect(formatDistance(0.84)).toBe('0.8 mi')
    expect(formatDistance(0.05)).toBe('260 ft')
    expect(formatDistance(0.0001)).toBe('10 ft')
  })

  it('combines both into feedback', () => {
    const target = place('t', 'Target', origin.lat - 0.0116, origin.lng) // ~0.8 mi south
    expect(feedbackFor(origin, target)).toEqual({ distance: '0.8 mi', arrow: '↓', abbr: 'S', bearing: 180, spoken: '0.8 mi south' })
  })
})

describe('place search', () => {
  const places = [
    place('cube', 'The Cube', 0, 0, ['Endover']),
    place('hatcher', 'Hatcher Graduate Library', 0, 0, ['Grad Library']),
    place('ugli', 'Shapiro Undergraduate Library', 0, 0, ['UGLi']),
  ]

  it('normalizes names', () => {
    expect(normalizeName("  The Regents'  Plaza ")).toBe('regents plaza')
  })

  it('matches names and aliases, ignoring case and "the"', () => {
    expect(searchPlaces(places, 'cube').map((p) => p.id)).toEqual(['cube'])
    expect(searchPlaces(places, 'ENDO').map((p) => p.id)).toEqual(['cube'])
    expect(searchPlaces(places, 'ugli').map((p) => p.id)).toEqual(['ugli'])
    expect(searchPlaces(places, '   ')).toEqual([])
  })

  it('matches the start of words, not letters in the middle of them', () => {
    const more = [...places, place('bsb', 'Biological Sciences Building', 0, 0), place('diag', 'The Diag', 0, 0)]
    expect(searchPlaces(more, 'di').map((p) => p.id)).toEqual(['diag'])
    expect(searchPlaces(more, 'build').map((p) => p.id)).toEqual(['bsb'])
    expect(searchPlaces(more, 'sciences b').map((p) => p.id)).toEqual(['bsb'])
    expect(searchPlaces(more, 'raduate')).toEqual([])
  })

  it('ranks prefix matches first and skips excluded places', () => {
    expect(searchPlaces(places, 'grad').map((p) => p.id)).toEqual(['hatcher'])
    expect(searchPlaces(places, 'library', ['hatcher']).map((p) => p.id)).toEqual(['ugli'])
  })
})
