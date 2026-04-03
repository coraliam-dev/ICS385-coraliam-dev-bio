// weather.js
// Fetches and displays weather data for given latitude and longitude

const weatherDiv = document.getElementById('weather');
const form = document.getElementById('location-form');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    await getWeather(lat, lon);
});

async function getWeather(lat, lon) {
    weatherDiv.innerHTML = 'Loading...';
    try {
        // Fetch API key from server endpoint
        const keyRes = await fetch('/apikey');
        if (!keyRes.ok) throw new Error('Failed to get API key');
        const { key: apiKey } = await keyRes.json();
        if (!apiKey) throw new Error('API key missing');
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        renderWeather(data);
    } catch (err) {
        weatherDiv.innerHTML = `<span style=\"color:red\">Error: ${err.message}</span>`;
    }
}

function renderWeather(data) {
    const desc = data.weather[0].description;
    const temp = data.main.temp;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const clouds = data.clouds.all;
    weatherDiv.innerHTML = `
        <h2>${data.name || 'Selected Location'}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
        <p><strong>Description:</strong> ${desc}</p>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind} m/s</p>
        <p><strong>Cloudiness:</strong> ${clouds}%</p>
    `;
}

// Optionally, load default weather on page load
getWeather(form.lat.value, form.lon.value);
