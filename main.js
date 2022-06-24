const weatherStates = {
    clearSkyDay: `<div class="icon sunny">
  <div class="sun-clear">
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
  </div>
  <div class="rain"></div>
</div>`,
    rainMoon: `<div class="icon sun-shower">
    <div class="cloud"></div>
    <div class="moon"></div>
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
let coord = { lon: '', lat: '' }
document.querySelector('main').style.visibility = 'hidden';
loadSearch('London, UK');
const search = document.querySelector('.search');
// search.addEventListener('click', showMetricToggle);
// document.querySelector('.toggle-btn').addEventListener('click', changeMetric);

// function showMetricToggle() {
//   document.querySelector('.search-toggle').classList.value = 'search-toggle';
// }
// function changeMetric() {
//   if(weatherUnit == 'metric') { weatherUnit = 'imperial'; }
//   else if(weatherUnit == 'imperial') { weatherUnit = 'metric'; }
//   loadSearch(search.firstChild.value);
// }

search.addEventListener('keypress', newSearch);

function loadSearch(a) {
  let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${a}&APPID=07bd9d00d144fa7efbc0540a9556d244&units=${weatherUnit}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', searchURL, true);
  xhr.onload = function() {
    if(this.status == 200) {
      const w = JSON.parse(this.responseText);
      coord.lat = w.coord.lat;
      coord.lon = w.coord.lon;
      getWeather(coord.lat, coord.lon, w);
    }
  }
  xhr.send();
}

function newSearch(a) {
  if (a.key === "Enter") {
    console.log('enter pressed');
    loadSearch(search.firstChild.value);
  }
}

function getWeatherIcon(a,hour) {
  if(a == 'clear sky') { 
    if(hour > 19 && hour < 24 || hour >= 0 && hour <= 7 ) {
      return weatherStates.clearSkyNight;
    } else { return weatherStates.clearSkyDay;  }
  }
  if(a == 'few clouds') { 
    if(hour > 19 && hour < 24 || hour >= 0 && hour <= 7 ) {
      return weatherStates.cloudsMoon; 
    } else { return weatherStates.cloudsSun; }
  }
  if(a == 'scattered clouds') { return weatherStates.scatteredClouds; }
  if(a == 'broken clouds' || a == 'overcast clouds') { return weatherStates.brokenClouds; }
  if(a == 'shower rain' || 'moderate rain') { return weatherStates.showerRain; }
  if(a == 'light rain') { 
    if(hour > 19 && hour < 24 || hour >= 0 && hour <= 7 ) {
      return weatherStates.rainMoon; 
    } else { return weatherStates.rainSun; }
  }
  if(a == 'thunderstorm') { return weatherStates.thunder; }
  if(a == 'snow') { return weatherStates.snow; }
}

function getWeather(a,b,w) {
    console.log(w);
    let onecall = `https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&appid=07bd9d00d144fa7efbc0540a9556d244&units=${weatherUnit}&exclude=minutely,hourly`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', onecall, true);
    xhr.onload = function() {
      if(this.status == 200) {
          const y = JSON.parse(this.responseText);
          console.log(y);
          document.querySelector('main').style.visibility = 'hidden';
          setTimeout("document.querySelector('main').style.visibility = '';", 500);

          // top left section
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

          // top center section
          document.querySelector('.weather-container').innerHTML = getWeatherIcon(y.current.weather[0].description, finalTime.getHours());

          // top right section
          document.querySelector('.max-min').innerHTML = `${Math.round(w.main.temp_max)}° ${Math.round(w.main.temp_min)}°`;
          document.querySelector('.feels-like').innerHTML = `${Math.round(y.current.feels_like)}°`;
          document.querySelector('.humidity').innerHTML = `${y.current.humidity}%`;
          // const rain = y.current.rain['1h'] * 100;
          // document.querySelector('.chance-of-rain').innerHTML = `${rain}%`;
          document.querySelector('.wind').innerHTML = `${Math.round(y.current.wind_speed)} km/h`;

          // 7 day forecast
          let output = '';
          document.querySelector('.weather-forecast').innerHTML = '';
          for(i=1; i<8; i++) {
            output += `
              <div class="forecast-container">
                <div class="forecast-info">
                  <div class="forecast-day">`;
                  if((finalTime.getDay()+i) <= 6) {
                      output+= weekday[finalTime.getDay()+i];
                  } else { output+= weekday[finalTime.getDay()+i-7] };
                  output += `</div>
                  <div class="forecast-max">${Math.round(y.daily[i].temp.max)}°</div>
                  <div class="forecast-min">${Math.round(y.daily[i].temp.min)}°</div>
                </div>
                <div class="forecast-image">${getWeatherIcon(y.daily[i].weather[0].description)}</div> 
              </div>`;
          }
          document.querySelector('.weather-forecast').innerHTML += output;
      }
    }
    xhr.send();
    // getForecast(coord.lon, coord.lat);
}

// RZ 07bd9d00d144fa7efbc0540a9556d244
// 20f7632ffc2c022654e4093c6947b4f4