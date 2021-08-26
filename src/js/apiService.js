const API_KEY = '7c511c1fd9bf88bf9a9d5d01c37e0441';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export default class WeatherApi {
  constructor() {
    this.searchQuery = '';
  }

  async fetchWeather() {
    const request = `?q=${this.searchQuery}&appid=${API_KEY}`;
    const response = await fetch(BASE_URL + request);
    const newResponse = await response.json();
    return newResponse;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
