// config.js - Secure configuration management for client-side dashboard
class SecureConfig {
  constructor() {
    try {
      // Attempt to load config with real API keys from localStorage
      this.config = this.loadConfiguration();
      this.hasAllKeys = true;
    } catch (e) {
      // If keys are missing, set a flag and provide dummy config (prevents app from crashing)
      this.config = {
        apis: {
          openWeather: { key: '', baseUrl: '', endpoints: {}, rateLimit: {requests:1,period:1}, timeout: 1 },
          rapidApi: { key: '', host: '', baseUrl: '', endpoints: {}, rateLimit: {requests:1,period:1}, timeout: 1 },
          jokeApi: { baseUrl: '', endpoints: {}, rateLimit: {requests:1,period:1}, timeout: 1 }
        },
        app: {},
        ui: {}
      };
      this.hasAllKeys = false;
    }
  }
  loadConfiguration() {
    // In production, use environment variables (see .env.example)
    // For this static dashboard, load API keys from browser localStorage
    return {
      apis: {
        openWeather: {
          key: this.getSecureApiKey('openweather'),
          baseUrl: 'https://api.openweathermap.org/data/2.5',
          endpoints: {
            current: '/weather',
            forecast: '/forecast'
          },
          rateLimit: {
            requests: 60,
            period: 60000 // 1 minute
          },
          timeout: 5000
        },
        rapidApi: {
          key: this.getSecureApiKey('rapidapi'),
          host: 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
          baseUrl: 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
          endpoints: {
            random: '/jokes/random',
            categories: '/jokes/categories'
          },
          rateLimit: {
            requests: 100,
            period: 60000
          },
          timeout: 3000
        },
        jokeApi: {
          baseUrl: 'https://v2.jokeapi.dev',
          endpoints: {
            joke: '/joke/Programming',
            categories: '/categories'
          },
          rateLimit: {
            requests: 120,
            period: 60000
          },
          timeout: 3000
        }
      },
      app: {
        name: 'UH Maui Campus Dashboard',
        version: '1.0.0',
        defaultCity: 'Kahului',
        refreshInterval: 10 * 60 * 1000, // 10 minutes
        cacheExpiry: 10 * 60 * 1000, // 10 minutes
        maxRetries: 3,
        retryDelay: 1000
      },
      ui: {
        animationDuration: 300,
        toastDuration: 5000,
        modalTimeout: 10000,
        loadingDelay: 500
      }
    };
  }
  getSecureApiKey(service) {
    // Retrieve API key from localStorage (never hardcoded)
    // Throws if missing, so constructor can handle and set dummy config
    const key = localStorage.getItem(service + '_api_key');
    if (!key) {
      throw new Error('API key for ' + service + ' not configured. Please set up your API keys.');
    }
    return key;
  }
  validateConfiguration() {
    // No longer throws, just checks
    const required = ['openweather_api_key', 'rapidapi_api_key'];
    const missing = required.filter(key => !localStorage.getItem(key));
    return missing.length === 0;
  }
  getApiConfig(service) {
    if (!this.config.apis[service]) {
      throw new Error('Unknown API service: ' + service);
    }
    return this.config.apis[service];
  }
  getAppConfig() {
    return this.config.app;
  }
  getUiConfig() {
    return this.config.ui;
  }
}
// Initialize configuration
const appConfig = new SecureConfig();
