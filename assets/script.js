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
const forecastCardElm = document.getElementById('forecast-card');

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
          let todayForecast = response.list[0];
          let temp = todayForecast.main.temp;
          let humidity = todayForecast.main.humidity;
          let wind = todayForecast.wind.speed;
          let iconUrl = 'http://openweathermap.org/img/wn/' + todayForecast.weather[0].icon + '@2x.png';
          let iconElm = document.createElement('img');

          iconElm.setAttribute('src', iconUrl);
          cityNameElm.append(iconElm);
          tempElm.textContent = 'Temp: ' + temp;
          windElm.textContent = 'Wind: ' + wind;
          humidityElm.textContent = 'Humidity: ' + humidity;

          document.querySelector('.weekF').innerHTML = '';
          for (let i = 5; i < response.list.length; i += 7) {
            console.log(response.list[i]);
            let divCard = document.createElement('div');
            divCard.setAttribute('class', `bg-blue-900 h-max`);

            let forecastDate = document.createElement('h1');
            forecastDate.setAttribute('class', `text-2xl p-2 mx-4 md:text-3xl font-bold text-white md:p-6 md:mx-8`);
            forecastDate.innerHTML = currentDate;
            divCard.appendChild(forecastDate);

            let iconForest = document.createElement('i');
            iconForest.setAttribute('class', `text-3xl mx8`);
            iconForest.setAttribute('src', 'http://openweathermap.org/img/wn/' + response.list[i].weather[0].icon + '@2x.png');
            divCard.appendChild(iconForest);

            let tempForecast = document.createElement('p');
            tempForecast.setAttribute('class', `text-xl my-4 mx-2 p-2 md:text-2xl text-white md:my-6`);
            tempForecast.innerHTML = 'Temp: ' + Math.floor(response.list[i].main.temp) + ' °F';
            divCard.appendChild(tempForecast);

            let windForecast = document.createElement('p');
            windForecast.setAttribute('class', `text-xl mx-2 my-2 p-2 md:text-2xl text-white md:my-6`);
            windForecast.innerHTML = 'Wind: ' + response.list[i].wind.speed + ' MPH';
            divCard.appendChild(windForecast);

            let humidityForecast = document.createElement('p');
            humidityForecast.setAttribute('class', `text-xl mx-2 my-2 p-2 md:text-2xl text-white md:my-6`);
            humidityForecast.innerHTML = 'Humidity: ' + response.list[i].main.humidity + '%';
            divCard.appendChild(humidityForecast);

            document.querySelector('.weekF').appendChild(divCard);
          }
        });
    });
};

// Event listeners applied to search button
searchBtnElm.addEventListener('click', formSubmitHander);

// let forecastData = [cityName, temp, humidity, wind];
// let weatherCardContainer = document.querySelector('#weather-card-container');
// var weatherData = [{}, {}, {}, {}] // Pretend like this has data,

// for(var i = 0 ; i < weatherData.length; i++) {
//     var weatherCard = document.createElement('div');
//     weatherCard.classList = 'my-3 d-flex align-items-center';
//     weatherCardContainer.append(weatherCard)
// }

// let dayForecast = response.list;
//           for (let i = 5; i < dayForecast.length; i += 5) {
//             document.getElementById('day' + [i + 1] + '-date').innerHTML = currentDate;
//           }

//           for (let i = 0; i < 5; i++) {
//             document.getElementById('day' + [i + 1] + '-icon').src = 'http://openweathermap.org/img/wn/' + dayForecast[i].weather[0].icon + '@2x.png';
//           }

//           for (let i = 0; i < 5; i++) {
//             document.getElementById('day' + [i + 1] + 'temp').innerHTML = dayForecast[i].main.temp;
//           }
