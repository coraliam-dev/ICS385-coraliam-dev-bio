import { useEffect, useState } from 'react'

const MENU_SECTIONS = [
  {
    label: 'Stay',
    items: [
      { label: 'Ocean Suites', href: '#stay' },
      { label: 'Villas', href: '#stay' },
      { label: 'Honeymoon Packages', href: '#stay' },
    ],
  },
  {
    label: 'Experiences',
    items: [
      { label: 'Sunset Cruises', href: '#experiences' },
      { label: 'Couples Spa', href: '#experiences' },
      { label: 'Road to Hana', href: '#experiences' },
    ],
  },
  {
    label: 'Dining',
    items: [
      { label: 'Beachfront Dining', href: '#dining' },
      { label: 'Coffee Bar', href: '#dining' },
      { label: 'Private Dinner', href: '#dining' },
    ],
  },
  {
    label: 'Wellness',
    items: [
      { label: 'Spa', href: '#wellness' },
      { label: 'Yoga', href: '#wellness' },
      { label: 'Massage', href: '#wellness' },
      { label: 'Wellness Weather', href: '#wellness-weather' },
    ],
  },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState('Stay')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    if (open) {
      window.addEventListener('keydown', onKeyDown)
    }

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className="site-header">
      <div className="container header-inner header-hero">
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-xl text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>

        <div className="brand centered">Kai Nani</div>

        <div className="actions">
          <a
            className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/40 px-3 text-xs tracking-[0.16em] text-white/95 transition hover:bg-white/20"
            href="/admin/login"
            aria-label="Admin"
          >
            ADMIN
          </a>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[100] transition-all duration-500 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-black/25 backdrop-blur-md transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />

        <nav
          className={`absolute inset-0 bg-[#f7f3eb]/95 px-6 py-8 text-[#2f2a25] transition-all duration-500 md:px-12 ${open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'}`}
          aria-label="Luxury menu"
        >
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#3d352d]/30 text-xl text-[#3d352d] transition hover:bg-[#ece5d8]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <div className="mx-auto mt-8 grid max-w-6xl gap-8 md:mt-10 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-8 font-serif text-[clamp(1.7rem,4.8vw,3.4rem)] leading-[1.1] tracking-wide text-[#2c241f]">
                Discover Maui in quiet luxury.
              </p>

              <ul className="space-y-4">
                {MENU_SECTIONS.map((section) => {
                  const isOpen = expanded === section.label
                  return (
                    <li key={section.label} className="border-b border-[#cfc5b6] pb-3">
                      <button
                        className="flex w-full items-center justify-between py-1 text-left font-serif text-[clamp(1.15rem,2.6vw,1.5rem)] tracking-[0.04em] text-[#2f2a25] transition hover:text-[#7a6043]"
                        onClick={() => setExpanded(isOpen ? '' : section.label)}
                        aria-expanded={isOpen}
                      >
                        <span>{section.label}</span>
                        <span className={`text-sm transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
                      </button>

                      <div
                        className={`grid overflow-hidden transition-all duration-500 ${isOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                      >
                        <ul className="min-h-0 space-y-2 pl-1 pb-1 text-sm uppercase tracking-[0.12em] text-[#6a5a4d]">
                            {section.items.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="inline-block py-1 transition hover:text-[#2f2a25] hover:translate-x-1"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-8 md:pl-8">
              <ul className="space-y-4 font-serif text-2xl tracking-[0.03em] text-[#2f2a25]">
                <li><a href="#wellness-weather" onClick={() => setOpen(false)} className="transition hover:text-[#7a6043]">Wellness Weather</a></li>
                <li><a href="#gallery" onClick={() => setOpen(false)} className="transition hover:text-[#7a6043]">Gallery</a></li>
                <li><a href="#about-property" onClick={() => setOpen(false)} className="transition hover:text-[#7a6043]">About the Property</a></li>
                <li><a href="#contact" onClick={() => setOpen(false)} className="transition hover:text-[#7a6043]">Contact</a></li>
              </ul>

              <div className="space-y-4">
                <a
                  href="#book-now"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#2f2a25] bg-[#2f2a25] px-5 py-3 text-sm uppercase tracking-[0.14em] text-[#f7f3eb] transition hover:bg-[#453a31] active:translate-y-[1px]"
                >
                  Book Now
                </a>
                <a
                  href="/admin/login"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#2f2a25]/35 px-5 py-3 text-xs uppercase tracking-[0.14em] text-[#4f4338] transition hover:bg-[#ece5d8]"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
