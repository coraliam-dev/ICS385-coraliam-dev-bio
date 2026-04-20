import { useState } from 'react'
import ArrivalChart from './charts/ArrivalChart'
import OriginChart from './charts/OriginChart'
import LengthOfStayChart from './charts/LengthOfStayChart'
import MetricCards from './components/MetricCards'
import WeatherWidget from './components/WeatherWidget'

const ISLANDS = ['Maui', "O'ahu", "Kaua'i"]

const CITY_BY_ISLAND = {
  Maui: 'Kahului',
  "O'ahu": 'Honolulu',
  "Kaua'i": 'Lihue',
  "Hawai'i": 'Hilo',
}

const Dashboard = () => {
  const [selectedIsland, setSelectedIsland] = useState('Maui')

  return (
    <main className="dashboard container">
      <header className="dashboard-header">
        <div>
          <h1>Kai Nani Visitor Statistics Dashboard</h1>
          <p>Luxury wellness trends for couples and honeymoon travelers.</p>
        </div>

        <label className="island-select-label">
          Select island
          <select
            value={selectedIsland}
            onChange={(event) => setSelectedIsland(event.target.value)}
            aria-label="Select island"
          >
            {ISLANDS.map((island) => (
              <option key={island} value={island}>
                {island}
              </option>
            ))}
          </select>
        </label>
      </header>

      <MetricCards island={selectedIsland} />

      <section className="charts-grid">
        <ArrivalChart island={selectedIsland} />
        <OriginChart island={selectedIsland} />
        <LengthOfStayChart island={selectedIsland} />
      </section>

      <WeatherWidget city={CITY_BY_ISLAND[selectedIsland]} />
    </main>
  )
}

export default Dashboard
