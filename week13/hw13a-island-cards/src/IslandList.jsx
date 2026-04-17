import { useState } from 'react'
import IslandCard from './IslandCard'

export default function IslandList({ islands }) {
  const [segment, setSegment] = useState('All')

  const filtered =
    segment === 'All' ? islands : islands.filter((island) => island.segment === segment)
  const displayed = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  const segments = ['All', ...new Set(islands.map((island) => island.segment))]

  const avgStay = displayed.length
    ? (displayed.reduce((sum, island) => sum + island.avgStay, 0) / displayed.length).toFixed(1)
    : '0.0'

  return (
    <section className="list-section">
      <div className="controls-card">
        <label htmlFor="segment-filter">Filter by visitor segment</label>
        <select
          id="segment-filter"
          value={segment}
          onChange={(event) => setSegment(event.target.value)}
        >
          {segments.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {displayed.map((island) => (
          <IslandCard key={island.id} {...island} />
        ))}
      </div>

      <aside className="summary-card" aria-live="polite">
        <h2>Summary</h2>
        <p>
          Showing <strong>{displayed.length}</strong> island card{displayed.length === 1 ? '' : 's'}.
        </p>
        <p>
          Average stay: <strong>{avgStay}</strong> days
        </p>
      </aside>
    </section>
  )
}