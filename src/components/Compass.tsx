/** A small dial whose needle points along a bearing (degrees clockwise from north). */
export function Compass({ bearing }: { bearing: number }) {
  return (
    <svg className="compass" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" />
      <path className="compass-tick" d="M16 1.5v3.5M16 27v3.5M1.5 16h3.5M27 16h3.5" />
      <g transform={`rotate(${bearing.toFixed(1)} 16 16)`}>
        <path className="compass-needle" d="M16 4.5 21 21 16 17.5 11 21z" />
      </g>
    </svg>
  )
}
