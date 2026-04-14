function CTASection({ email }) {
  return (
    <section className="section" aria-labelledby="cta-heading" id="admin">
      <div className="container">
        <div className="cta-card">
          <h2 id="cta-heading">Plan Your Stay</h2>
          <p>Ready to book your Maui getaway?</p>
          <a className="cta-button" href={`mailto:${email}`}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection
