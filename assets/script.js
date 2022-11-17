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

// let weatherData = [{}]

// for (let i = 0; i < weatherData.length; i++) {
//   let weatherCard = document.createElement('div');
//   weatherCard.classList = 'styling of elements goes here;
