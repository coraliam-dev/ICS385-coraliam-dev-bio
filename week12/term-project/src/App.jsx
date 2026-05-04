import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import AmenitiesSection from './components/AmenitiesSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import WellnessWeatherSection from './components/WellnessWeatherSection'
import AppErrorBoundary from './components/AppErrorBoundary'

const property = {
  name: 'Kai Nani',
  island: 'Maui',
  tagline: 'A serene romantic escape on the Valley Isle.',
    imageURL: '/images/pexels-kelsey-175966935-11109300.jpg',
  imageAlt:
    'Sunset ocean view at Kai Nani with palm trees and a calm shoreline in Maui',
  about:
    'Kai Nani is a boutique Hawaiian property designed for couples and honeymoon travelers seeking comfort, privacy, and oceanfront beauty. Guests enjoy easy beach access, peaceful evenings, and personalized hospitality with local island charm. The experience is curated for visitors who value wellness, romance, and memorable sunset moments.',
  visitorSegment: 'Couples and honeymoon travelers',
  amenities: [
    'Ocean View Lanai Suites',
    'Infinity Pool with Cabanas',
    'Couples Spa Experiences',
    'Farm-to-Table Island Dining',
  ],
  contactEmail: 'reservations@wailearetreat.com',
}

function App() {
  return (
    <AppErrorBoundary>
      <div className="app-shell">
        <Header />
        <main>
          <HeroSection
            name={property.name}
            island={property.island}
            tagline={property.tagline}
            imageURL={property.imageURL}
            imageAlt={property.imageAlt}
          />

          <AboutSection
            description={property.about}
            visitorSegment={property.visitorSegment}
          />

          <section className="section" id="experiences" aria-labelledby="experiences-heading">
            <div className="container section-grid">
              <div className="about-card luxury-card">
                <h2 id="experiences-heading">Experiences</h2>
                <p>Sunset Cruises • Couples Spa • Road to Hana</p>
              </div>
              <div className="about-card luxury-card" id="dining">
                <h2>Dining</h2>
                <p>Beachfront Dining • Coffee Bar • Private Dinner</p>
              </div>
              <div className="about-card luxury-card" id="wellness">
                <h2>Wellness</h2>
                <p>Spa Rituals • Yoga Sessions • Signature Massage</p>
              </div>
              <div className="about-card luxury-card" id="gallery">
                <h2>Gallery</h2>
                <p>Explore curated moments from Kai Nani’s Maui escape.</p>
              </div>
            </div>
          </section>

          <WellnessWeatherSection />

          <AmenitiesSection amenities={property.amenities} />

          <CTASection email={property.contactEmail} />
        </main>
        <Footer />
      </div>
    </AppErrorBoundary>
  )
}

export default App
