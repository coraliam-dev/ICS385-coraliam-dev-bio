import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js'
import { arrivalsByIsland } from '../data/dashboardData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const ArrivalChart = ({ island }) => {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    // TODO: replace local fallback with GET /api/arrivals?island=${island}
    const rows = arrivalsByIsland[island] ?? arrivalsByIsland.Maui

    setChartData({
      labels: rows.map((row) => row.month),
      datasets: [
        {
          label: `${island} Arrivals`,
          data: rows.map((row) => row.arrivals),
          backgroundColor: 'rgba(13,110,122,0.70)',
          borderRadius: 6,
        },
      ],
    })
  }, [island])

  if (!chartData) {
    return <p className="loading">Loading arrivals...</p>
  }

  return (
    <div className="chart-card">
      <h3>Visitor Arrivals by Month</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
          },
        }}
      />
    </div>
  )
}

export default ArrivalChart
