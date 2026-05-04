function CTASection({ email }) {
  return (
    <section className="section" aria-labelledby="cta-heading" id="contact">
      <div className="container">
        <div className="cta-card" id="book-now">
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
