import { useEffect, useState } from 'react'
import Dashboard from './Dashboard'

const fallbackProperty = {
  name: 'Kai Nani',
  island: 'Maui',
  tagline: 'A serene luxury spa escape on the Valley Isle.',
  imageURL:
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
  description:
    'Kai Nani blends oceanfront relaxation with restorative spa rituals for couples and honeymoon visitors who want comfort, privacy, and wellness-focused hospitality in Maui.',
  amenities: [
    'Couples spa suites',
    'Beach sound bath sessions',
    'Aromatherapy rain sanctuary',
    'Farm-to-table wellness dining',
  ],
}

const App = () => {
  const [view, setView] = useState('marketing')
  const [property, setProperty] = useState(fallbackProperty)
  const [loadingProperty, setLoadingProperty] = useState(true)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/properties')

        if (!response.ok) {
          throw new Error('Unable to fetch property data')
        }

        const payload = await response.json()
        const firstProperty = Array.isArray(payload) ? payload[0] : payload

        if (firstProperty?.name) {
          setProperty((prev) => ({
            ...prev,
            name: firstProperty.name ?? prev.name,
            island: firstProperty.island ?? prev.island,
            description: firstProperty.description ?? prev.description,
            amenities:
              Array.isArray(firstProperty.amenities) && firstProperty.amenities.length
                ? firstProperty.amenities
                : prev.amenities,
          }))
        }
      } catch {
        // fallback to local property data when backend is unavailable
      } finally {
        setLoadingProperty(false)
      }
    }

    fetchProperty()
  }, [])

  if (view === 'dashboard') {
    return (
      <div className="app-shell">
        <nav className="top-nav container">
          <button className="nav-button" onClick={() => setView('marketing')}>
            ← Back to Marketing Page
          </button>
        </nav>
        <Dashboard />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{property.island} • Luxury Wellness Retreat</p>
            <h1>{property.name}</h1>
            <p>{property.tagline}</p>
            {loadingProperty && <p className="loading">Loading property details...</p>}
            <button className="primary-button" onClick={() => setView('dashboard')}>
              View Dashboard
            </button>
          </div>
          <img src={property.imageURL} alt="Kai Nani resort view in Maui" />
        </div>
      </header>

      <main className="container marketing-main">
        <section className="card">
          <h2>About</h2>
          <p>{property.description}</p>
        </section>

        <section className="card">
          <h2>Amenities</h2>
          <ul>
            {property.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
        </section>

        <section className="card">
          <h2>Call to Action</h2>
          <p>Explore visitor trends, occupancy, and live weather before booking.</p>
          <button className="primary-button" onClick={() => setView('dashboard')}>
            Open Visitor Dashboard
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
