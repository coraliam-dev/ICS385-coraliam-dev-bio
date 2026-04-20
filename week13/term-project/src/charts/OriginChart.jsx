import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { originByIsland } from '../data/dashboardData'

ChartJS.register(ArcElement, Tooltip, Legend)

const OriginChart = ({ island }) => {
  const chartData = useMemo(() => {
    const source = originByIsland[island] ?? originByIsland.Maui

    return {
      labels: source.labels,
      datasets: [
        {
          label: `${island} Origin Mix (%)`,
          data: source.values,
          backgroundColor: ['#2b7a78', '#3aafa9', '#def2f1', '#17252a'],
          borderWidth: 1,
        },
      ],
    }
  }, [island])

  return (
    <div className="chart-card">
      <h3>Visitor Origin Mix</h3>
      <Doughnut data={chartData} />
    </div>
  )
}

export default OriginChart
