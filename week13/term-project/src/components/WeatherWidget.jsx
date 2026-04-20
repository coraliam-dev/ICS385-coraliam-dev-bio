import { useEffect, useState } from 'react'

const WeatherWidget = ({ city }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = import.meta.env.VITE_WEATHER_KEY

      if (!apiKey) {
        setError('Weather key not configured in .env')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=${apiKey}`,
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.message || 'Unable to load weather data')
        }

        setWeather({
          temp: data.main.temp,
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
        })
      } catch (err) {
        setError(`Weather unavailable: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  return (
    <section className="weather-card" aria-live="polite">
      <h3>Weather: {city}</h3>
      {loading && <p className="loading">Loading local weather...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && weather && (
        <ul>
          <li>Temperature: {Math.round(weather.temp)}°F</li>
          <li>Condition: {weather.condition}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind} mph</li>
        </ul>
      )}
    </section>
  )
}

export default WeatherWidget
