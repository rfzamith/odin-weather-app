const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
const search = prompt('Insert City, Country');
let unit = 'metric';
let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=07bd9d00d144fa7efbc0540a9556d244&units=${unit}`;
onLoad(searchURL);

// Get jobs from array and show them in the web page
function onLoad(a) {
  a.onload = function(e) {
    if(this.status == 200) {
        const jobs = JSON.parse(this.responseText);
        showJobs(jobs);
    }
  }
  a.send();
};

function showJobs(a) {
    let output = featJob = featBox = newBox = '';
    document.querySelector('main').innerHTML = '';
    a.forEach((job) => {
        if(job.featured == true) {
            featJob = 'featured';
            featBox = '';
        } else { 
            featJob = '';
            featBox = 'hidden';
        }
        if(job.new == true) { newBox = ''; }
        else { newBox = 'hidden'; }
        output += `
        <div class="job ${featJob}">
            <img class="job_logo" src="${job.logo}">
            <div class="job_details">
            <div class="details">
                <span class="company">${job.company}</span>
                <span class="box light ${newBox}">New!</span>
                <span class="box dark ${featBox}">Featured</span>
            </div>
            <div class="details"><h1 class="title">${job.position}</h1></div>
            <div class="details">
                <span class="grey">${job.postedAt}</span><span class="grey">&#183;</span>
                <span class="grey">${job.contract}</span><span class="grey">&#183;</span>
                <span class="grey">${job.location}</span>
            </div>
            </div>
            <div class="job_categories">
                <div class="category" data-cat="role" data-name="${job.role}">${job.role}</div>
                <div class="category" data-cat="level" data-name="${job.level}">${job.level}</div>`;
            job.languages.forEach((lang) => {
                output+= `<div class="category" data-cat="languages" data-name="${lang}">${lang}</div>`;
            });
            job.tools.forEach((tool) => {
                output+= `<div class="category" data-cat="tools" data-name="${tool}">${tool}</div>`;
            });
            output += `</div>
        </div>
        `;
    });
    document.querySelector('main').innerHTML += output;
    console.log('Total Jobs: ' + a.length);

}

// Filter jobs by categories that are selected

document.querySelector('main').addEventListener('click', selectCategory);
const filterBar = document.querySelector('.filter_section');
const filterCat = document.querySelector('.filter_categories');
let list = [];

// Add category to filter bar

function selectCategory(e) {
    if(e.target.classList.contains('category')) {

        // If filter section empty, show filter bar and add category
        if(filterCat.hasChildNodes() == false) {
            filterBar.className = 'filter_section';
            const newCat = document.createElement('div');
            newCat.className = 'filtercategory';
            newCat.dataset.cat = e.target.dataset.cat;
            newCat.dataset.name = e.target.dataset.name;
            newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
            filterCat.appendChild(newCat); 
        }

        // If not empty, check if selected category in already in the filter bar
        else {
            if(filterCat.innerHTML.indexOf(e.target.innerHTML) == -1) {
                const newCat = document.createElement('div');
                newCat.className = 'filtercategory';
                newCat.dataset.cat = e.target.dataset.cat;
                newCat.dataset.name = e.target.dataset.name;
                newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
                filterCat.appendChild(newCat);
            }
        }
        getFilteredJobs();
    }
}

function getFilteredJobs() {
    // Check which categories are currently selected
    let list = JSON.parse(xhr.responseText);
    let filterCat = document.querySelector('.filter_categories').getElementsByTagName('div');
    for(i = 0; i < filterCat.length; i++) {
        if(filterCat[i].dataset.cat == 'role') {
            list = list.filter(function(a) {
                return filterCat[i].dataset.name == a.role;
            })
        }
        if(filterCat[i].dataset.cat == 'level') {
            list = list.filter(function(a) {
                return filterCat[i].dataset.name == a.level;
            })
        }
        if(filterCat[i].dataset.cat == 'languages') {
            list = list.filter(function(a) {
                return a.languages.includes(filterCat[i].dataset.name) == true;
            })
        }
        if(filterCat[i].dataset.cat == 'tools') {
            list = list.filter(function(a) {
                return a.tools.includes(filterCat[i].dataset.name) == true;
            })
        }
    }
    showJobs(list);
}

// Filter bar clear button
document.querySelector('.clear_button').addEventListener('click', clearJobs);
function clearJobs() {
    filterBar.className = 'filter_section hidden';
    document.querySelector('.filter_categories').innerHTML = '';
    let list = JSON.parse(xhr.responseText);
    showJobs(list);
}

// Remove category from filter bar
document.querySelector('.filter_categories').addEventListener('click', removeCategory);
function removeCategory(e) {
    if(e.target.classList.contains('filter_button')) {
        console.log(e.target.parentElement);
        e.target.parentElement.remove();
        if(document.querySelector('.filter_categories').innerHTML == '') {
            clearJobs();
        } else { 
            getFilteredJobs();
        }
    }
}