import { useEffect, useMemo, useState } from 'react'
import WeatherCard from './WeatherCard'
import SoundBathInfo from './SoundBathInfo'
import RecommendationBadge from './RecommendationBadge'

const WAILEA_LAT = 20.6897
const WAILEA_LON = -156.4403

function getWindDescriptor(windMph) {
  if (windMph < 8) return 'Light trade winds'
  if (windMph < 15) return 'Gentle ocean breeze'
  return 'Breezy conditions'
}

function getRecommendation({ rainProbability, windMph, cloudCover, hour }) {
  const isEveningWindow = hour >= 18 && hour <= 22
  const rainRitualWindow = rainProbability > 38 && windMph < 11
  const calmEveningWindow = isEveningWindow && cloudCover > 58 && windMph < 14

  if (rainRitualWindow) return 'perfect'
  if (calmEveningWindow) return 'calm'
  return 'notIdeal'
}

function getRecommendationNarrative(status) {
  if (status === 'perfect') {
    return 'Rain acoustics and gentle trade winds create a beautiful window for a guided couple sound bath.'
  }
  if (status === 'calm') {
    return 'Evening cloud cover is supportive for a slower, grounding meditation ritual.'
  }
  return 'Conditions are bright today—ideal for ocean activity now, and a candlelit sound bath later tonight.'
}

function buildBookingMessage({ status, rainProbability, windMph, cloudCover }) {
  const label =
    status === 'perfect'
      ? 'Perfect for Sound Bath 🌧️'
      : status === 'calm'
        ? 'Good for Meditation 🌙'
        : 'Not Ideal Today ☀️'

  return [
    'Aloha Kai Nani Wellness Team,',
    '',
    'I would love to reserve a Rain Sound Bath Moment for two.',
    `Current Wailea recommendation: ${label}`,
    `Live conditions: Rain ${Math.round(rainProbability)}%, Wind ${Math.round(windMph)} mph, Cloud Cover ${Math.round(cloudCover)}%.`,
    '',
    'Please share available evening options and package details.',
    '',
    'Mahalo,',
  ].join('\n')
}

function WellnessWeatherSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [forecast, setForecast] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [bookingForm, setBookingForm] = useState({
    guestName: '',
    guestEmail: '',
    preferredTime: 'Evening (6pm–10pm)',
    notes: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function fetchWeather() {
      try {
        setLoading(true)
        setError('')

        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${WAILEA_LAT}&longitude=${WAILEA_LON}` +
          '&hourly=temperature_2m,precipitation_probability,wind_speed_10m,cloud_cover' +
          '&forecast_days=2&timezone=Pacific%2FHonolulu'

        const response = await fetch(url, { signal: controller.signal })
        if (!response.ok) throw new Error('Unable to load weather data.')

        const data = await response.json()
        setForecast(data)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Live weather is temporarily unavailable. Please try again shortly.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()

    return () => controller.abort()
  }, [])

  const weatherView = useMemo(() => {
    if (!forecast?.hourly) return null

    const now = new Date()
    const isoHour = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 13)

    const index = forecast.hourly.time.findIndex((time) => time.startsWith(isoHour))
    const currentIndex = index >= 0 ? index : 0

    const temp = forecast.hourly.temperature_2m[currentIndex]
    const rainProbability = forecast.hourly.precipitation_probability[currentIndex]
    const windMph = forecast.hourly.wind_speed_10m[currentIndex] * 0.621371
    const cloudCover = forecast.hourly.cloud_cover[currentIndex]

    const status = getRecommendation({
      rainProbability,
      windMph,
      cloudCover,
      hour: new Date(forecast.hourly.time[currentIndex]).getHours(),
    })

    const hourly = Array.from({ length: 8 }, (_, i) => {
      const idx = currentIndex + i
      return {
        time: forecast.hourly.time[idx],
        temp: forecast.hourly.temperature_2m[idx],
        rainProbability: forecast.hourly.precipitation_probability[idx],
        windMph: forecast.hourly.wind_speed_10m[idx] * 0.621371,
      }
    }).filter((item) => item.time)

    return {
      temp,
      rainProbability,
      windMph,
      cloudCover,
      status,
      hourly,
    }
  }, [forecast])

  useEffect(() => {
    if (!isBookingOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsBookingOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isBookingOpen])

  const showRain = weatherView?.status === 'perfect'

  const openBookingModal = () => {
    setRequestSent(false)
    setBookingForm((previous) => ({
      ...previous,
      notes: weatherView ? buildBookingMessage(weatherView) : previous.notes,
    }))
    setIsBookingOpen(true)
  }

  const handleSubmitBooking = (event) => {
    event.preventDefault()
    setRequestSent(true)
    setIsBookingOpen(false)
  }

  return (
    <section
      id="wellness-weather"
      aria-labelledby="wellness-weather-heading"
      className="section animate-fade-in"
    >
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] border border-teal-100/70 bg-gradient-to-br from-sky-100/65 via-emerald-50/65 to-cyan-100/55 p-5 shadow-[0_25px_70px_rgba(31,72,86,0.18)] md:p-8">
          {showRain ? <div className="rain-overlay" aria-hidden="true" /> : null}

          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 id="wellness-weather-heading" className="font-serif text-[clamp(1.6rem,4.2vw,2.6rem)] text-slate-800">
                Wellness Weather
              </h2>
              {weatherView ? <RecommendationBadge status={weatherView.status} /> : null}
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              {loading ? (
                <div className="md:col-span-3 rounded-2xl border border-white/70 bg-white/50 p-5 text-slate-700 backdrop-blur-md">
                  Loading Wailea wellness conditions…
                </div>
              ) : error ? (
                <div className="md:col-span-3 rounded-2xl border border-rose-200 bg-rose-50/80 p-5 text-rose-700">
                  {error}
                </div>
              ) : (
                <>
                  <WeatherCard
                    title="Current Temperature"
                    value={`${Math.round(weatherView.temp)}°F`}
                    detail="Wailea, Maui"
                    tone="blue"
                  />
                  <WeatherCard
                    title="Chance of Rain"
                    value={`${Math.round(weatherView.rainProbability)}%`}
                    detail={weatherView.rainProbability > 40 ? 'Rain ambience likely' : 'Mostly clear cycle'}
                    tone="mint"
                  />
                  <WeatherCard
                    title="Wind Conditions"
                    value={`${Math.round(weatherView.windMph)} mph`}
                    detail={getWindDescriptor(weatherView.windMph)}
                    tone="teal"
                  />
                </>
              )}
            </div>

            {!loading && !error && weatherView ? (
              <div className="mb-6 rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-xl md:p-5">
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Hour-by-hour forecast</p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {weatherView.hourly.map((entry) => (
                    <div key={entry.time} className="rounded-xl border border-white/70 bg-white/65 p-3 text-sm text-slate-700">
                      <p className="font-semibold text-slate-800">
                        {new Date(entry.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                      </p>
                      <p>{Math.round(entry.temp)}°F</p>
                      <p>Rain: {Math.round(entry.rainProbability)}%</p>
                      <p>Wind: {Math.round(entry.windMph)} mph</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-3 rounded-xl border border-teal-200/70 bg-white/65 p-4 text-slate-700 md:flex-row md:items-center md:justify-between">
                  <p className="text-sm leading-relaxed">{getRecommendationNarrative(weatherView.status)}</p>
                  <button
                    type="button"
                    onClick={openBookingModal}
                    className="inline-flex min-h-11 items-center justify-center rounded-md border border-teal-700/80 bg-teal-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-teal-800"
                  >
                    Book Rain Sound Bath Moment
                  </button>
                </div>
              </div>
            ) : null}

            {requestSent ? (
              <div className="mb-6 rounded-xl border border-emerald-200/70 bg-emerald-50/70 p-4 text-sm text-emerald-900">
                Your wellness request has been prepared. Our concierge will follow up shortly to confirm your Rain Sound Bath Moment.
              </div>
            ) : null}

            <SoundBathInfo />
          </div>
        </div>
      </div>

      {isBookingOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Book Rain Sound Bath Moment">
          <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-sm" onClick={() => setIsBookingOpen(false)} />
          <div className="relative w-full max-w-xl rounded-3xl border border-white/80 bg-[#f8f4ec]/95 p-6 shadow-[0_25px_80px_rgba(23,45,58,0.28)] md:p-7">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-slate-500">Kai Nani Wellness Concierge</p>
                <h3 className="mt-1 font-serif text-3xl text-slate-800">Reserve Rain Sound Bath Moment</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-400/45 text-slate-700 transition hover:bg-white/70"
                aria-label="Close booking form"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitBooking}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-700">
                  Name
                  <input
                    required
                    value={bookingForm.guestName}
                    onChange={(event) => setBookingForm((previous) => ({ ...previous, guestName: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                    placeholder="Your name"
                  />
                </label>
                <label className="text-sm text-slate-700">
                  Email
                  <input
                    required
                    type="email"
                    value={bookingForm.guestEmail}
                    onChange={(event) => setBookingForm((previous) => ({ ...previous, guestEmail: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="block text-sm text-slate-700">
                Preferred time
                <select
                  value={bookingForm.preferredTime}
                  onChange={(event) => setBookingForm((previous) => ({ ...previous, preferredTime: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                >
                  <option>Evening (6pm–10pm)</option>
                  <option>Sunset (5pm–7pm)</option>
                  <option>Moonlight Session (8pm–10pm)</option>
                </select>
              </label>

              <label className="block text-sm text-slate-700">
                Notes for concierge
                <textarea
                  rows={5}
                  value={bookingForm.notes}
                  onChange={(event) => setBookingForm((previous) => ({ ...previous, notes: event.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white/75 px-3 py-2 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
              </label>

              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-teal-800 bg-teal-800 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-teal-900"
              >
                Confirm Wellness Request
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default WellnessWeatherSection
