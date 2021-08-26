// import refs:
import refs from './refs.js';
const { city, temp, icon, description, inputRef, humidity, wind, searchForm, cityCard } = refs;

// import api-service and create instance:
import WeatherApi from './apiService.js';
const weatherApi = new WeatherApi();

// listening to query:
searchForm.addEventListener('submit', onSubmit);

// callback to handle query:
function onSubmit(event) {
  event.preventDefault();

  weatherApi.query = event.currentTarget.elements.query.value;

  if (weatherApi.query === '') {
    return alert(`You didn't type a valid city!🤦‍♂️`);
  }

  fetchWeather();
  inputRef.value = '';
}

// async function to fetch weather:
async function fetchWeather() {
  try {
    const data = await weatherApi.fetchWeather();

    if (data.cod !== 200) {
      return alert('😢 Sorry, no weather info for that city');
    }

    city.textContent = `Weather in ${data.name}`;
    const showInCelsius = Math.round(data.main.temp - 273.15);
    temp.textContent = `${showInCelsius}°C`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.alt = data.weather[0].description;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind speed: ${data.wind.speed} km/h`;
  } catch (error) {
    console.error(error);
  }
}
