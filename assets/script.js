// Variables declared to HTML elements for DOM manipulation
const searchBtnElm = document.getElementById('search-btn');
const searchHistoryElm = document.getElementById('search-history');
const searchResultElm = document.getElementById('search-result');
const forecastResultElm = document.getElementById('forecast-result');

// Event listeners applied to search button
searchBtnElm.addEventListener('click', function (event) {});

let searchResults = function () {
  const searchInputElm = document.getElementById('search-input');
  let userSearch = searchInputElm.value;
  let weatherCoordsApi = 'https://api.openweathermap.org/geo/1.0/direct';
  weatherCoordsApi = weatherCoordsApi + '?q=' + userSearch + '&limit=&appid=f3dd875ac81e50aaada068245357b0ee';
  // console.log(weatherCoordsApi);

  fetch(weatherCoordsApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);

      let latitude = response[0].lat;
      console.log(latitude);

      let longitude = response[0].lon;
      console.log(longitude);

      let weatherForecastApi = 'https://api.openweathermap.org/data/2.5/forecast';
      weatherForecastApi = weatherForecastApi + '?lat=' + latitude + '&lon=' + longitude + '&appid=f3dd875ac81e50aaada068245357b0ee';
      console.log(weatherForecastApi);

      fetch(weatherForecastApi)
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response.list[0].wind.speed);
        });

      let temp = response.list[0].main.temp;
      let humidity = response.list[0].main.humidity;
      let wind = response.list[0].main.wind.speed;
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
