// Variables declared to HTML elements for DOM manipulation
let searchInputElm = document.getElementById('search-input');
let searchBtnElm = document.getElementById('search-btn');
let searchHistoryElm = document.getElementById('search-history');
let searchResultElm = document.getElementById('search-result');
let forecastResultElm = document.getElementById('forecast-result');

// Event listeners applied to search button
searchBtnElm.addEventListener('click', function (event) {
  console.log(event);
});

let searchResults = function () {
  let searchInputElm = document.getElementById('search-input');
  let userSearch = searchInputElm.value;
  let weatherApi = 'https://api.openweathermap.org/data/2.5/forecast';
  weatherApi = weatherApi + '?q=' + userSearch + '&appid=f3dd875ac81e50aaada068245357b0ee';
};

// var weatherCardContainer = document.querySelector('#weather-card-container');
// var weatherData = [{}, {}, {}, {}] // Pretend like this has data,

// for(var i = 0 ; i < weatherData.length; i++) {
//     var weatherCard = document.createElement('div');
//     weatherCard.classList = 'my-3 d-flex align-items-center';
//     weatherCardContainer.append(weatherCard)
// }
