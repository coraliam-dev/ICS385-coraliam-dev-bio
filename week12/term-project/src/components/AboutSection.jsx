function AboutSection({ description, visitorSegment }) {
  return (
    <section className="section" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-card">
          <h2 id="about-heading">About the Property</h2>
          <p>{description}</p>
          <p>
            <strong>Ideal for:</strong> {visitorSegment}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
