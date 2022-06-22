// const weatherStates = {
//     clearSkyDay: `<div class="icon sunny">
//   <div class="sun">
//     <div class="rays"></div>
//   </div>
// </div>`,
//     clearSkyNight: ``,
//     showerRain: `<div class="icon rainy">
//   <div class="cloud"></div>
//   <div class="rain"></div>
// </div>`,
//     scatteredClouds: `<div class="icon cloudy">
// <div class="cloud"></div>
// </div>`,
//     brokenClouds: `<div class="icon cloudy">
//   <div class="cloud"></div>
//   <div class="cloud"></div>
// </div>`,
//     cloudsSun: `<div class="icon sun-shower">
//     <div class="cloud"></div>
//     <div class="sun">
//       <div class="rays"></div>
//     </div>
//   </div>`,
//     rainSun: `<div class="icon sun-shower">
//   <div class="cloud"></div>
//   <div class="sun">
//     <div class="rays"></div>
//   </div>
//   <div class="rain"></div>
// </div>`,
//     thunder: `<div class="icon thunder-storm">
//     <div class="cloud"></div>
//     <div class="lightning">
//       <div class="bolt"></div>
//       <div class="bolt"></div>
//     </div>
//   </div>`,
//     snow: `<div class="icon flurries">
//     <div class="cloud"></div>
//     <div class="snow">
//       <div class="flake"></div>
//       <div class="flake"></div>
//     </div>
//   </div>`
// }

const search = document.querySelector('.search');
search.addEventListener('keypress', getWeather);

function getWeather(a) {
    if (a.key === "Enter") {
      console.log('entered getWeather()')
      const xhr = new XMLHttpRequest();
      let weatherSearch = search.firstChild.value;
      let weatherUnit = 'metric';
      // mine 07bd9d00d144fa7efbc0540a9556d244
      // 20f7632ffc2c022654e4093c6947b4f4
      // let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearch}&APPID=20f7632ffc2c022654e4093c6947b4f4&units=${weatherUnit}`;
      xhr.open('GET', 'http://api.icndb.com/jokes/random/', true);
      console.log(xhr);
      xhr.onload = function() {
        if(this.status == 200) {
            const weather = JSON.parse(this.responseText);
            console.log(weather);
            const main = document.querySelector('main');
            // main.style.visibility = 'hidden';
            document.querySelector('main').style.visibility = 'hidden';
            setTimeout("document.querySelector('main').style.visibility = '';", 500);
            document.querySelector('.weather-one-info').firstChild.innerHTML = w.name;
            document.querySelector('.weather-container').innerHTML = "";
            // if(w.weather[0].description == 'clear sky') { document.querySelector('.weather-container').innerHTML = weatherStates.clear; }
            // if(w.weather[0].description == 'few clouds') { 
            //   // day document.querySelector('.weather-container').innerHTML = weatherStates.cloudsSun; 
            //   // night document.querySelector('.weather-container').innerHTML = weatherStates.cloudsMoon; 
            // }
            // if(w.weather[0].description == 'scattered clouds') { document.querySelector('.weather-container').innerHTML = weatherStates.scatteredClouds; }
            // if(w.weather[0].description == 'broken clouds') { document.querySelector('.weather-container').innerHTML = weatherStates.brokenClouds; }
            // if(w.weather[0].description == 'shower rain') { document.querySelector('.weather-container').innerHTML = weatherStates.showerRain; }
            // if(w.weather[0].description == 'rain') { 
            //   // day document.querySelector('.weather-container').innerHTML = weatherStates.rainSun;
            //   // day document.querySelector('.weather-container').innerHTML = weatherStates.rainMoon;
            // }
            // if(w.weather[0].description == 'thunderstorm') { document.querySelector('.weather-container').innerHTML = weatherStates.thunder; }
            // if(w.weather[0].description == 'snow') { document.querySelector('.weather-container').innerHTML = weatherStates.snow; }
        }
      xhr.send();
      }
    }
}

function showWeather(a) {
    // document.querySelector('main').innerHTML = '';
    // let output = 

}

document.querySelector('.search-bar').addEventListener('click', searchBarFocus);
const searchMetric = document.querySelector('.search-toggle');

function searchBarFocus(e) {
    // console.log(e.target.classList);
    // if(e.target.classList.contains('search-box center')) {
        searchMetric.className = 'search-toggle';
    // }
}

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
