// Variables declared to HTML elements for DOM manipulation
const searchBtnElm = document.getElementById('search-btn');
const searchHistoryElm = document.getElementById('search-history');
const searchResultElm = document.getElementById('search-result');
const forecastResultElm = document.getElementById('forecast-result');
const cityNameElm = document.getElementById('city-name');
const tempElm = document.getElementById('temp');
const windElm = document.getElementById('wind');
const humidityElm = document.getElementById('humidity');

// Event listeners applied to search button
searchBtnElm.addEventListener('click', function (event) {});

let searchResults = function () {
  const searchInputElm = document.getElementById('search-input');
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

      console.log(cityName, latitude, longitude);
      const key = 'f3dd875ac81e50aaada068245357b0ee&units=imperial';

      let weatherForecastApi = 'https://api.openweathermap.org/data/2.5/forecast';
      weatherForecastApi = weatherForecastApi + '?lat=' + latitude + '&lon=' + longitude + '&appid=' + key;

      cityNameElm.textContent = cityName + ' ' + dayjs().format('MM/DD/YYYY');

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

          console.log(temp);
          console.log(humidity);
          console.log(wind);
          console.log(response);
          console.log(iconUrl);

          tempElm.textContent = 'Temp: ' + temp;
          windElm.textContent = 'Wind: ' + wind;
          humidityElm.textContent = 'Humidity: ' + humidity;
        });
    });
};

searchBtnElm.addEventListener('click', searchResults);

// let weatherCardContainer = document.querySelector('#weather-card-container');
// var weatherData = [{}, {}, {}, {}] // Pretend like this has data,

// for(var i = 0 ; i < weatherData.length; i++) {
//     var weatherCard = document.createElement('div');
//     weatherCard.classList = 'my-3 d-flex align-items-center';
//     weatherCardContainer.append(weatherCard)
// }
