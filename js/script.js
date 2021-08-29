const api = {
    key: '132116852d4d672c20f12ca541a8f8b3',
}
const searchBox = document.querySelector('.search-input');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value)
    }
}

function getResults(query) {
    // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`)
        .then(res => res.json())
        .then(data => displayResult(data));
}

function displayResult(weather) {
    console.log(weather);
    const city = document.querySelector('.location');
    city.innerText = `${weather.name}: ${weather.sys.country}`
    // const date = document.querySelector('.day-time');
    // date.innerText = dateBuilder(now);
    const temp = document.querySelector('.tem');
    temp.innerHTML = `${Math.round((weather.main.temp-273.15))}<span>℃</span>`;

    const wetherIcon = document.querySelector('.wether-icon');
    wetherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    const wetherType = document.querySelector('.wether-type');
    wetherType.innerText = weather.weather[0].main;

    const hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_min - 273.15)}℃ / ${Math.round(weather.main.temp_max - 273.15)}℃`;
    
    
    let str = "GMT +0:00";
    if (weather.timezone / 3600 > 0) {
        str = `GMT +${(weather.timezone / 3600).toFixed(2)}`;
    } else {
        str = `GMT ${(weather.timezone / 3600).toFixed(2)}`;
    }
    const time = document.querySelector('.time-watch');
    time.innerText = `${str}`
}

// function dateBuilder (d) {
//     let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//     let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//     let day = days[d.getDay()];
//     let date = d.getDate();
//     let month = months[d.getMonth()];
//     let year = d.getFullYear();

//     return `${day} ${date} ${month} ${year}`;
// }