//Time stamp
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[now.getMonth()];

let timeStamp = document.querySelector("#time-stamp");
timeStamp.innerHTML = `${hours}:${minutes} - ${day}, ${date} ${month}`;


//Weather API
function displayWeather(response) {
    document.querySelector("#my-location").innerHTML = response.data.name;
    let temperature = document.querySelector("#location-temperature");
    temperature.innerHTML = Math.round(response.data.main.temp);
    let tempMin = document.querySelector("#temp-min")
    tempMin.innerHTML = Math.round(response.data.main.temp_min);
    let tempMax = document.querySelector("#temp-max");
    tempMax.innerHTML = Math.round(response.data.main.temp_max);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind-speed");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind-direction");
    wind.innerHTML = Math.round(response.data.wind.direction);
    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
}

function search(city) {
    let key = "ef3fad40f719ac8a63ea791f6953bb62";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);
}

function searchCity(event) {
    event.preventDefault();
    let city = document.querySelector("input").value;
    search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//current Location
function currentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "ef3fad40f719ac8a63ea791f6953bb62";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(currentLocation);
}
