function HeroSection({ name, island, tagline, imageURL, imageAlt }) {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p>{island}, Hawaiʻi</p>
          <h1>{name}</h1>
          <p className="hero-tagline">{tagline}</p>
        </div>
        <img className="hero-image" src={imageURL} alt={imageAlt} />
      </div>
    </section>
  )
}

export default HeroSection
