import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import AmenitiesSection from './components/AmenitiesSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

const property = {
  name: 'Kai Nani',
  island: 'Maui',
  tagline: 'A serene romantic escape on the Valley Isle.',
  imageURL: '/images/wailea-hero.svg',
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

        <AmenitiesSection amenities={property.amenities} />

        <CTASection email={property.contactEmail} />
      </main>
      <Footer />
    </div>
  )
}

export default App
