function AmenitiesSection({ amenities }) {
  return (
    <section className="section" aria-labelledby="amenities-heading" id="dashboard">
      <div className="container">
        <div className="amenities-card">
          <h2 id="amenities-heading">Amenities</h2>
          <ul className="amenities-list">
            {amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AmenitiesSection
