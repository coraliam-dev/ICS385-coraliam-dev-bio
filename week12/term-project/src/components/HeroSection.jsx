function HeroSection({ name, island, tagline, imageURL, imageAlt }) {
  const fallback =
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=6d2a1f0f8b0b6e1a3b5c8f4f7b5b2a8f'
  const bg = imageURL || fallback

  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${bg})` }}
      aria-label="Hero banner"
    >
      <div className="hero-inner container">
        <div className="hero-center">
          <p className="hero-location">{island}, Hawaiʻi</p>
          <h1 className="hero-title">{name}</h1>
          <p className="hero-tagline">{tagline}</p>
        </div>

        <div className="hero-cta">
          <div className="cta-grid">
            <div className="cta-block">
              <small>What are your dates?</small>
              <div className="muted">05/04/2026 → 05/05/2026</div>
            </div>
            <div className="cta-block">
              <small>Rooms & Guests</small>
              <div className="muted">1 Room(s) • 1 Guest(s)</div>
            </div>
            <div className="cta-action">
              <button className="cta-button large">CHECK RATES</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
