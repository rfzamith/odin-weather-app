const weatherStates = {
    clearSkyDay: `<div class="icon sunny">
  <div class="sun">
    <div class="rays"></div>
  </div>
</div>`,
    clearSkyNight: `<div class="icon sunny">
    <div class="moon-clear"></div>
    <div class="moon-clear"></div>
  </div>`,
    showerRain: `<div class="icon rainy">
  <div class="cloud"></div>
  <div class="rain"></div>
</div>`,
    scatteredClouds: `<div class="icon cloudy">
<div class="cloud"></div>
</div>`,
    brokenClouds: `<div class="icon cloudy">
  <div class="cloud"></div>
  <div class="cloud"></div>
</div>`,
    cloudsSun: `<div class="icon sun-shower">
    <div class="cloud"></div>
    <div class="sun">
    </div>
  </div>`,
    cloudsMoon: `<div class="icon sun-shower">
    <div class="cloud"></div>
    <div class="moon">
    </div>
  </div>`,
    rainSun: `<div class="icon sun-shower">
  <div class="cloud"></div>
  <div class="sun">
    <div class="rays"></div>
  </div>
  <div class="rain"></div>
</div>`,
    thunder: `<div class="icon thunder-storm">
    <div class="cloud"></div>
    <div class="lightning">
      <div class="bolt"></div>
      <div class="bolt"></div>
    </div>
  </div>`,
    snow: `<div class="icon flurries">
    <div class="cloud"></div>
    <div class="snow">
      <div class="flake"></div>
      <div class="flake"></div>
    </div>`,
    mist: `<div class="icon flurries">
    <div class="cloud"></div>
    <div class="snow">
      <div class="flake"></div>
      <div class="flake"></div>
    </div>
  </div>`
}

let weatherUnit = 'metric';
document.querySelector('main').style.visibility = 'hidden';

const search = document.querySelector('.search');
search.firstChild.value = 'London, UK';
getWeather(search.firstChild.value);
getForecast(search.firstChild.value);
search.addEventListener('keypress', loadSearch);

function loadSearch(a) {
  if (a.key === "Enter") {
    console.log('enter pressed');
    getWeather(search.firstChild.value);
  }
}

function getWeather(a) {
    let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${a}&APPID=07bd9d00d144fa7efbc0540a9556d244&units=${weatherUnit}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL, true);
    xhr.onload = function() {
      if(this.status == 200) {
          const w = JSON.parse(this.responseText);
          console.log(w);
          document.querySelector('main').style.visibility = 'hidden';
          setTimeout("document.querySelector('main').style.visibility = '';", 500);
          document.querySelector('.weather-one-info').firstChild.innerHTML = w.name;
          const d = new Date();
          const localTime = d.getTime();
          const localOffset = d.getTimezoneOffset() * 60000;
          const time = (localTime + localOffset) + (1000 * w.timezone);
          const finalTime = new Date(time);
          const hour = finalTime.getHours();
          const minutes = String(finalTime.getMinutes()).padStart(2, '0');
          const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          document.querySelector('.date').innerHTML = `${weekday[finalTime.getDay()]}, ${finalTime.getDate()} ${finalTime.toLocaleString('default', 
                    { month: 'long' })} ${finalTime.getHours()}:${minutes}`;
          document.querySelector('.temp').innerHTML = `${Math.round(w.main.temp)}°`;
          // document.querySelector('.temp-max').innerHTML = `${Math.round(w.main.temp_max)}°`;
          // document.querySelector('.temp-min').innerHTML = `${Math.round(w.main.temp_min)}°`;
          document.querySelector('.feels-like').innerHTML = `${Math.round(w.main.feels_like)}°`;
          document.querySelector('.humidity').innerHTML = `${w.main.humidity}%`;
          document.querySelector('.chance-of-rain').innerHTML = `${Math.round(w.main.feels_like)}°`;
          document.querySelector('.wind').innerHTML = `${Math.round(w.wind.speed)} km/h`;

          if(w.weather[0].description == 'clear sky') { 
            if(hour > 19 && hour < 24 || hour >= 0 && hour <= 7 ) {
              document.querySelector('.weather-container').innerHTML = weatherStates.clearSkyNight;
            } else { document.querySelector('.weather-container').innerHTML = weatherStates.clearSkyDay;  }
          }
          if(w.weather[0].description == 'few clouds') { 
            if(hour > 19 && hour < 24 || hour >= 0 && hour <= 20 ) {
              document.querySelector('.weather-container').innerHTML = weatherStates.cloudsMoon; 
            } else { document.querySelector('.weather-container').innerHTML = weatherStates.cloudsSun; }
          }
          if(w.weather[0].description == 'scattered clouds') { document.querySelector('.weather-container').innerHTML = weatherStates.scatteredClouds; }
          if(w.weather[0].description == 'broken clouds' || w.weather[0].description == 'overcast clouds') { document.querySelector('.weather-container').innerHTML = weatherStates.brokenClouds; }
          if(w.weather[0].description == 'shower rain') { document.querySelector('.weather-container').innerHTML = weatherStates.showerRain; }
          if(w.weather[0].description == 'rain') { 
            // day document.querySelector('.weather-container').innerHTML = weatherStates.rainSun;
            // day document.querySelector('.weather-container').innerHTML = weatherStates.rainMoon;
          }
          if(w.weather[0].description == 'thunderstorm') { document.querySelector('.weather-container').innerHTML = weatherStates.thunder; }
          if(w.weather[0].description == 'snow') { document.querySelector('.weather-container').innerHTML = weatherStates.snow; }
      }
    }
    xhr.send();
}

function getForecast(a) {
    let searchURL = `https://api.openweathermap.org/data/2.5/forecast?q=${a}&APPID=07bd9d00d144fa7efbc0540a9556d244&units=${weatherUnit}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', searchURL, true);
    xhr.onload = function() {
    if(this.status == 200) {
        const w = JSON.parse(this.responseText);
        console.log(w);
      }
    }
    xhr.send();
}

// function showWeather(a) {
//     // document.querySelector('main').innerHTML = '';
//     // let output = 

// }

// document.querySelector('.search-bar').addEventListener('click', searchBarFocus);
// const searchMetric = document.querySelector('.search-toggle');

// function searchBarFocus(e) {
//     // console.log(e.target.classList);
//     // if(e.target.classList.contains('search-box center')) {
//         searchMetric.className = 'search-toggle';
//     // }
// }

// Filter jobs by categories that are selected

// document.querySelector('main').addEventListener('click', selectCategory);
// const filterBar = document.querySelector('.filter_section');
// const filterCat = document.querySelector('.filter_categories');
// let list = [];

// Add category to filter bar

// function selectCategory(e) {
//     if(e.target.classList.contains('category')) {

//         // If filter section empty, show filter bar and add category
//         if(filterCat.hasChildNodes() == false) {
//             filterBar.className = 'filter_section';
//             const newCat = document.createElement('div');
//             newCat.className = 'filtercategory';
//             newCat.dataset.cat = e.target.dataset.cat;
//             newCat.dataset.name = e.target.dataset.name;
//             newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
//             filterCat.appendChild(newCat); 
//         }

//         // If not empty, check if selected category in already in the filter bar
//         else {
//             if(filterCat.innerHTML.indexOf(e.target.innerHTML) == -1) {
//                 const newCat = document.createElement('div');
//                 newCat.className = 'filtercategory';
//                 newCat.dataset.cat = e.target.dataset.cat;
//                 newCat.dataset.name = e.target.dataset.name;
//                 newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
//                 filterCat.appendChild(newCat);
//             }
//         }
//         getFilteredJobs();
//     }
// }
