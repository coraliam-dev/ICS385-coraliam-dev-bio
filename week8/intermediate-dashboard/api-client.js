// api-client.js - Unified API client with error handling and caching
class UnifiedApiClient {
  constructor(config) {
    this.config = config;
    this.cache = new Map();
    this.requestTimestamps = new Map();
    this.rateLimiters = new Map();
    this.initializeRateLimiters();
  }
  initializeRateLimiters() {
    Object.keys(this.config.apis).forEach(service => {
      this.rateLimiters.set(service, {
        requests: [],
        limit: this.config.apis[service].rateLimit.requests,
        period: this.config.apis[service].rateLimit.period
      });
    });
  }
  /**
   * Unified API request handler with rate limiting, caching, and error handling.
   * Returns fallback data on error (never throws to UI).
   */
  async makeRequest(service, endpoint, params = {}, options = {}) {
    try {
      // Check rate limiting for each API
      if (!this.checkRateLimit(service)) {
        throw new Error('Rate limit exceeded for ' + service + '. Please wait.');
      }
      // Check cache for recent data
      const cacheKey = this.getCacheKey(service, endpoint, params);
      if (this.isValidCache(cacheKey)) {
        console.log('Returning cached data for', service, endpoint);
        return this.cache.get(cacheKey).data;
      }
      // Build request config (URL, headers, etc.)
      const requestConfig = this.buildRequest(service, endpoint, params, options);
      // Make fetch request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.apis[service].timeout);
      const response = await fetch(requestConfig.url, {
        ...requestConfig.options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(service + ' API error: ' + response.status + ' - ' + response.statusText);
      }
      const data = await response.json();
      // Cache successful response
      this.cacheResponse(cacheKey, data);
      // Update rate limiting
      this.updateRateLimit(service);
      return data;
    } catch (error) {
      // Log and return fallback data (never crash UI)
      console.error('API request failed:', error);
      return this.handleApiError(service, endpoint, error);
    }
  }
  /**
   * Build request URL and headers for each API type.
   * Handles OpenWeather (query params), RapidAPI (headers), JokeAPI (params).
   */
  buildRequest(service, endpoint, params, options) {
    const apiConfig = this.config.apis[service];
    let url = apiConfig.baseUrl + endpoint;
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    switch (service) {
      case 'openWeather': {
        // Weather API: add key and units as query params
        const weatherParams = new URLSearchParams({
          ...params,
          appid: apiConfig.key,
          units: 'imperial'
        });
        url += '?' + weatherParams.toString();
        break;
      }
      case 'rapidApi': {
        // RapidAPI: add key and host as headers
        headers['X-RapidAPI-Key'] = apiConfig.key;
        headers['X-RapidAPI-Host'] = apiConfig.host;
        break;
      }
      case 'jokeApi': {
        // JokeAPI: add params if present
        if (Object.keys(params).length > 0) {
          url += '?' + new URLSearchParams(params).toString();
        }
        break;
      }
    }
    return {
      url: url,
      options: {
        method: 'GET',
        headers: headers
      }
    };
  }
  checkRateLimit(service) {
    const limiter = this.rateLimiters.get(service);
    const now = Date.now();
    // Remove old requests outside the time window
    limiter.requests = limiter.requests.filter(time => now - time < limiter.period);
    return limiter.requests.length < limiter.limit;
  }
  updateRateLimit(service) {
    this.rateLimiters.get(service).requests.push(Date.now());
  }
  getCacheKey(service, endpoint, params) {
    return service + ':' + endpoint + ':' + JSON.stringify(params);
  }
  isValidCache(cacheKey) {
    if (!this.cache.has(cacheKey)) return false;
    const cached = this.cache.get(cacheKey);
    return Date.now() - cached.timestamp < this.config.app.cacheExpiry;
  }
  cacheResponse(cacheKey, data) {
    this.cache.set(cacheKey, {
      data: data,
      timestamp: Date.now()
    });
  }
  /**
   * Handles API errors: logs details and returns safe fallback data for each service.
   * Never throws to UI—dashboard always displays something.
   */
  handleApiError(service, endpoint, error) {
    console.error('API Error Details:', {
      service: service,
      endpoint: endpoint,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    // Return fallback data based on service
    switch (service) {
      case 'openWeather':
        return {
          name: 'Kahului',
          main: { temp: 78, humidity: 65 },
          weather: [{ description: 'partly cloudy', icon: '02d' }],
          wind: { speed: 12 },
          error: true,
          message: 'Weather data temporarily unavailable'
        };
      case 'rapidApi':
        return {
          value: "Chuck Norris doesn't need the internet. The internet needs Chuck Norris.",
          error: true,
          message: 'Chuck Norris jokes temporarily unavailable'
        };
      case 'jokeApi':
        return {
          joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
          error: true,
          message: 'Programming jokes temporarily unavailable'
        };
      default:
        throw error;
    }
  }
  // Convenience methods for specific APIs
  async getWeather(city = 'Kahului') {
    return this.makeRequest('openWeather', '/weather', { q: city + ',US' });
  }
  async getChuckNorrisJoke() {
    return this.makeRequest('rapidApi', '/jokes/random');
  }
  async getProgrammingJoke() {
    return this.makeRequest('jokeApi', '/joke/Programming', { type: 'single' });
  }
  async getAllJokes() {
    try {
      const [chuck, programming] = await Promise.allSettled([
        this.getChuckNorrisJoke(),
        this.getProgrammingJoke()
      ]);
      return {
        chuck: chuck.status === 'fulfilled' ? chuck.value : null,
        programming: programming.status === 'fulfilled' ? programming.value : null
      };
    } catch (error) {
      console.error('Failed to fetch jokes:', error);
      return { chuck: null, programming: null };
    }
  }
}
