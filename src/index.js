//Time and Date
let now = new Date();

let hours = now.getHours();

let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()];

let date = now.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let month = months[now.getMonth()]

let timeStamp = document.querySelector("#time-stamp")
timeStamp.innerHTML = (` ${hours}:${minutes} - ${day}, ${date} ${month}`)

//weather API
function displayWeather(response) {
    document.querySelector("#my-location").innerHTML = response.data.name;
    document.querySelector("#location-temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#temp-min").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#temp-max").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
    document.querySelector("#wind-direction").innerHTML = response.data.wind.deg;
    document.querySelector(newFunction())
    response.data.weather[0].description;

    function newFunction(response) {
        return "#description";
    }
}

//current location default 
function currentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "ef3fad40f719ac8a63ea791f6953bb62";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(currentLocation);
}

getCurrentLocation()


//search location
function search(city) {
    let key = "ef3fad40f719ac8a63ea791f6953bb62";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    axios.get(url).then(displayWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("#search-field").value;
    search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//weather forecast 