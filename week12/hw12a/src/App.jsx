import './App.css'
import Header from './components/Header'
import IslandCard from './components/IslandCard'

const islands = [
  {
    id: 1,
    name: 'Maui',
    description:
      'Maui blends luxury beaches, scenic drives, and upcountry towns with relaxed island vibes.',
    tip: 'Start Road to Hana early, pack motion-sickness meds, and plan only a few key stops.',
  },
  {
    id: 2,
    name: 'Oahu',
    description:
      'Oahu combines city energy in Honolulu with surf culture, historic sites, and North Shore views.',
    tip: 'Visit popular spots like Diamond Head at sunrise to avoid crowds and midday heat.',
  },
  {
    id: 3,
    name: 'Kauai',
    description:
      'Kauai is lush and dramatic, with rainforest trails, waterfalls, and the stunning Na Pali Coast.',
    tip: 'Reserve canyon and coast tours in advance, especially during weekends and holidays.',
  },
]

function App() {
  return (
    <main className="app">
      <Header />
      <section className="cards-grid">
        {islands.map((island) => (
          <IslandCard
            key={island.id}
            name={island.name}
            description={island.description}
            tip={island.tip}
          />
        ))}
      </section>
    </main>
  )
}

export default App
