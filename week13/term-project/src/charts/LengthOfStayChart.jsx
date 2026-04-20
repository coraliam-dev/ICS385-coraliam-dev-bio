import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import { metricsByIsland } from '../data/dashboardData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

const YEARS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']

const LengthOfStayChart = ({ island }) => {
  const chartData = useMemo(() => {
    const source = metricsByIsland[island] ?? metricsByIsland.Maui

    return {
      labels: YEARS,
      datasets: [
        {
          label: `${island} Avg Length of Stay (days)`,
          data: source.staySeries,
          borderColor: '#0d6e7a',
          backgroundColor: 'rgba(13,110,122,0.2)',
          tension: 0.3,
          fill: true,
        },
      ],
    }
  }, [island])

  return (
    <div className="chart-card">
      <h3>Average Length of Stay Trend</h3>
      <Line data={chartData} />
    </div>
  )
}

export default LengthOfStayChart
