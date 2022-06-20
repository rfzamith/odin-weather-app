function getWeatherForecast() {
  
    const xhr = new XMLHttpRequest();
  
    let weatherSearch = 'Porto, Portugal';
    let weatherUnit = 'metric';

    let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearch}&APPID=07bd9d00d144fa7efbc0540a9556d244&units=${weatherUnit}`;
    xhr.open('GET', searchURL, true);
    
    xhr.onload = function(e) {
      if(this.status == 200) {
          const list = JSON.parse(this.responseText);
          console.log(list);
          showWeather(list);
          // const output = `<span id='joke'>${joke.value.joke}</span>`
          // document.querySelector('.box').innerHTML = output;
      }
    }
    xhr.send();
  }
  
getWeatherForecast();

function showWeather(a) {
    // document.querySelector('main').innerHTML = '';
    // let output = 
    // `
    // <div class="job">
    //     <img class="job_logo" src="#">
    //     <div class="job_details">
    //     <div class="details">
    //         <span class="company"> </span>
    //         <span class="box light ">New!</span>
    //         <span class="box dark ">Featured</span>
    //     </div>
    //     <div class="details"><h1 class="title"> </h1></div>
    //     <div class="details">
    //         <span class="grey"> </span><span class="grey">&#183;</span>
    //         <span class="grey"> </span><span class="grey">&#183;</span>
    //         <span class="grey"> </span>
    //     </div>
    //     </div>
    //     <div class="job_categories">
    //         <div class="category" data-cat="role" data-name=" "> </div>
    //         <div class="category" data-cat="level" data-name=" "> </div>
    //     </div>
    // </div>
    // `;
    // document.querySelector('main').innerHTML = output;
}

document.querySelector('.search-bar').addEventListener('click', searchBarFocus);
const searchBox = document.querySelector('.search-box');
const searchMetric = document.querySelector('.search-toggle');

function searchBarFocus(e) {
    // console.log(e.target.classList);
    // if(e.target.classList.contains('search-box center')) {
        searchBox.className = 'search-box hidden';
        searchBox.className = 'search-box left';
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
