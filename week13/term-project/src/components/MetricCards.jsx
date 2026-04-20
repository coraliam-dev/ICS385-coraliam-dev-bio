import { useMemo } from 'react'
import { metricsByIsland } from '../data/dashboardData'

const MetricCards = ({ island }) => {
  const metrics = useMemo(() => {
    const source = metricsByIsland[island] ?? metricsByIsland.Maui
    const avgLengthOfStay =
      source.staySeries.reduce((sum, value) => sum + value, 0) /
      source.staySeries.length

    return {
      adr: source.adr,
      occupancy: source.occupancy,
      avgLengthOfStay,
    }
  }, [island])

  return (
    <section className="kpi-grid" aria-label="Key performance indicators">
      <article className="kpi-card">
        <h3>💵 Average Daily Rate</h3>
        <p>${metrics.adr} / night</p>
      </article>

      <article className="kpi-card">
        <h3>🏨 Occupancy Rate</h3>
        <p>{metrics.occupancy}%</p>
      </article>

      <article className="kpi-card">
        <h3>🧳 Avg Length of Stay</h3>
        <p>{metrics.avgLengthOfStay.toFixed(2)} days</p>
      </article>
    </section>
  )
}

export default MetricCards
