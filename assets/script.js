// Variables declared to HTML elements for DOM manipulation
const searchBtnElm = document.getElementById('search-btn');
const searchHistoryElm = document.getElementById('search-history');
const searchResultElm = document.getElementById('search-result');
const forecastResultElm = document.getElementById('forecast-result');
const cityNameElm = document.getElementById('city-name');
const tempElm = document.getElementById('temp');
const windElm = document.getElementById('wind');
const humidityElm = document.getElementById('humidity');
const searchInputElm = document.getElementById('search-input');

let formSubmitHander = function (event) {
  event.preventDefault();

  let searchInput = searchInputElm.value.trim();

  if (searchInput) {
    searchResults(searchInput);

    searchInputElm.value = '';
  } else {
    searchResultElm.textContent = '';
    alert('Please enter a city name for your weather forecast');
  }
};

let searchResults = function () {
  let userSearch = searchInputElm.value;
  let weatherCoordsApi = 'https://api.openweathermap.org/geo/1.0/direct';
  weatherCoordsApi = weatherCoordsApi + '?q=' + userSearch + '&limit=&appid=f3dd875ac81e50aaada068245357b0ee';

  fetch(weatherCoordsApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      // console.log(response);
      let city = response[0];
      let cityName = city.name;
      let latitude = city.lat;
      let longitude = city.lon;

      const key = 'f3dd875ac81e50aaada068245357b0ee&units=imperial';

      let weatherForecastApi = 'https://api.openweathermap.org/data/2.5/forecast';
      weatherForecastApi = weatherForecastApi + '?lat=' + latitude + '&lon=' + longitude + '&appid=' + key;

      let currentDate = dayjs().format('MM/DD/YYYY');
      cityNameElm.textContent = cityName + ' ' + currentDate;

      fetch(weatherForecastApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          let forecast = response.list[0];
          let temp = forecast.main.temp;
          let humidity = forecast.main.humidity;
          let wind = forecast.wind.speed;
          let iconUrl = 'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '@2x.png';
          let iconElm = document.createElement('img');

          iconElm.setAttribute('src', iconUrl);
          cityNameElm.append(iconElm);
          tempElm.textContent = 'Temp: ' + temp;
          windElm.textContent = 'Wind: ' + wind;
          humidityElm.textContent = 'Humidity: ' + humidity;
        });

      // let forecastData = [cityName, temp, humidity, wind];

      // for (let i = 0; i < forecastData.length; i++) {
      //   let forecastCardElm = document.getElementById('forecast-card');
      //   let forecastCardDate = document.createElement('h1');
      //   forecastCardDate.classList = 'text-2xl p-2 mx-4 md:text-3xl font-bold text-white md:p-6 md:mx-8';
      //   forecastCardElm.classList = 'bg-blue-900 h-max';
      //   forecastCardDate.append(currentDate);
      //   forecastResultElm.append(forecastCardElm);
      // }
    });
};

// Event listeners applied to search button
searchBtnElm.addEventListener('click', formSubmitHander);

// let weatherCardContainer = document.querySelector('#weather-card-container');
// var weatherData = [{}, {}, {}, {}] // Pretend like this has data,

// for(var i = 0 ; i < weatherData.length; i++) {
//     var weatherCard = document.createElement('div');
//     weatherCard.classList = 'my-3 d-flex align-items-center';
//     weatherCardContainer.append(weatherCard)
// }
