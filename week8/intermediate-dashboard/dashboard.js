// dashboard.js - Main dashboard controller
class CampusDashboard {
  constructor() {
    this.config = appConfig;
    this.apiClient = new UnifiedApiClient(this.config);
    this.courseCatalog = null;
    this.widgets = new Map();
    this.refreshTimers = new Map();
    this.lastUpdated = new Map();
    this.initialize();
  }
  async initialize() {
    try {
      this.setupEventListeners();
      this.createDashboardLayout();
      this.initializeApiKeySetup();
      await this.loadInitialData();
      this.startAutoRefresh();
      this.showWelcomeMessage();
    } catch (error) {
      this.handleInitializationError(error);
    }
  }
  initializeApiKeySetup() {
    // Show API key setup modal if keys are missing
    const hasOpenWeather = localStorage.getItem('openweather_api_key');
    const hasRapidApi = localStorage.getItem('rapidapi_api_key');
    if (!hasOpenWeather || !hasRapidApi) {
      this.showApiKeySetupModal();
    }
  }
  async loadInitialData() {
    // Show loading state
    this.showLoadingState();
    try {
      // Load course data (from previous assignment)
      await this.loadCourseData();
      // Load weather data
      await this.loadWeatherData();
      // Load jokes
      await this.loadHumorData();
      // Update dashboard statistics
      this.updateDashboardStats();
    } catch (error) {
      console.error('Failed to load initial data:', error);
      this.showErrorState('Failed to load dashboard data');
    } finally {
      this.hideLoadingState();
    }
  }
  async loadWeatherData() {
    try {
      const weatherData = await this.apiClient.getWeather();
      this.displayWeatherWidget(weatherData);
      this.lastUpdated.set('weather', Date.now());
    } catch (error) {
      console.error('Weather loading failed:', error);
      this.displayWeatherError();
    }
  }
  async loadHumorData() {
    try {
      const jokes = await this.apiClient.getAllJokes();
      this.displayHumorWidget(jokes);
      this.lastUpdated.set('humor', Date.now());
    } catch (error) {
      console.error('Humor loading failed:', error);
      this.displayHumorError();
    }
  }
  displayWeatherWidget(data) {
    const weatherContainer = document.getElementById('weather-widget');
    const isError = data.error;
    weatherContainer.innerHTML =
      '<div class="widget-header">' +
      '<h3>Campus Weather</h3>' +
      '<span class="last-updated">' + this.getTimeAgo('weather') + '</span>' + '</div>' +
      '<div class="weather-content ' + (isError ? 'error-state' : '') + '">' + '<div class="location">' + data.name + '</div>' +
      '<div class="temperature">' + Math.round(data.main.temp) + '°F</div>' + '<div class="description">' + data.weather[0].description + '</div>' + '<div class="details">' +
      '<span>Humidity: ' + data.main.humidity + '%</span>' +
      '<span>Wind: ' + data.wind.speed + ' mph</span>' +
      '</div>' +
      (isError ? '<div class="error-message">' + data.message + '</div>' : '') + '</div>';
  }
  displayHumorWidget(jokes) {
    const humorContainer = document.getElementById('humor-widget');
    const chuckJoke = jokes.chuck ? (jokes.chuck.value || jokes.chuck.joke) : 'Chuck Norris joke unavailable';
    const progJoke = jokes.programming ? (jokes.programming.joke || (jokes.programming.setup + ' ' + jokes.programming.delivery)) : 'Programming joke unavailable';
    humorContainer.innerHTML =
      '<div class="widget-header">' +
      '<h3>Campus Humor</h3>' +
      '<button class="refresh-btn" onclick="dashboard.refreshHumor()">New Jokes</button>' +
      '</div>' +
      '<div class="humor-content">' +
      '<div class="joke-section">' +
      '<h4>Chuck Norris Fact</h4>' +
      '<p class="joke-text">' + chuckJoke + '</p>' +
      '</div>' +
      '<div class="joke-section">' +
      '<h4>Programming Humor</h4>' +
      '<p class="joke-text">' + progJoke + '</p>' +
      '</div>' +
      '</div>';
  }
  updateDashboardStats() {
    if (!this.courseCatalog) return;
    const totalCourses = this.getAllCourses().length;
    const totalStudents = this.calculateTotalEnrollment();
    const averageCapacity = this.calculateAverageCapacity();
    const weatherStatus = this.lastUpdated.has('weather') ? 'Connected' : 'Disconnected';
    document.getElementById('total-courses').textContent = totalCourses;
    document.getElementById('total-students').textContent = totalStudents;
    document.getElementById('avg-capacity').textContent = averageCapacity + '%';
    document.getElementById('api-status').textContent = weatherStatus;
  }
  startAutoRefresh() {
    // Refresh weather every 10 minutes
    this.refreshTimers.set('weather', setInterval(() => {
      this.loadWeatherData();
    }, 10 * 60 * 1000));
    // Update time displays every minute
    this.refreshTimers.set('time', setInterval(() => {
      this.updateTimeDisplays();
    }, 60 * 1000));
  }
  async refreshHumor() {
    const button = document.querySelector('.refresh-btn');
    button.textContent = 'Loading...';
    button.disabled = true;
    try {
      await this.loadHumorData();
    } finally {
      button.textContent = 'New Jokes';
      button.disabled = false;
    }
  }
  showApiKeySetupModal() {
    const modal = document.getElementById('apiKeyModal');
    modal.style.display = 'block';
  }
  saveApiKeys() {
    const openWeatherKey = document.getElementById('openWeatherKey').value;
    const rapidApiKey = document.getElementById('rapidApiKey').value;
    if (openWeatherKey) localStorage.setItem('openweather_api_key', openWeatherKey);
    if (rapidApiKey) localStorage.setItem('rapidapi_api_key', rapidApiKey);
    document.getElementById('apiKeyModal').style.display = 'none';
    // Reload the page to initialize with new keys
    window.location.reload();
  }
  handleInitializationError(error) {
    console.error('Dashboard initialization failed:', error);
    document.getElementById('dashboard-container').innerHTML =
      '<div class="initialization-error">' +
      '<h2>Dashboard Initialization Failed</h2>' +
      '<p>' + error.message + '</p>' +
      '<button onclick="location.reload()">Retry</button>' +
      '</div>';
  }
  getTimeAgo(service) {
    if (!this.lastUpdated.has(service)) return 'Never';
    const minutes = Math.floor((Date.now() - this.lastUpdated.get(service)) / 60000);
    return minutes === 0 ? 'Just now' : minutes + ' min ago';
  }
  // Placeholder methods for demo (implement as needed)
  setupEventListeners() {}
  createDashboardLayout() {}
  showWelcomeMessage() {}
  showLoadingState() {}
  hideLoadingState() {}
  showErrorState(msg) {}
  displayWeatherError() {}
  displayHumorError() {}
  updateTimeDisplays() {}
  async loadCourseData() {}
  getAllCourses() { return []; }
  calculateTotalEnrollment() { return 0; }
  calculateAverageCapacity() { return 0; }
}
// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.dashboard = new CampusDashboard();
  // Ensure saveApiKeys is globally accessible for the modal button
  window.saveApiKeys = function() {
    if (window.dashboard && typeof window.dashboard.saveApiKeys === 'function') {
      window.dashboard.saveApiKeys();
    }
  };
});
