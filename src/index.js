//Time and Date
function formatDate(timeStamp) {
    let now = new Date(timeStamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[now.getDay()];

    let date = now.getDate();

    return ` ${formatHours(timeStamp)} - ${day}, ${date}`
}

function formatHours(timeStamp) {
    let now = new Date(timeStamp);
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}: ${minutes}`
}


//weather API
function displayWeather(response) {
    celsiusTemperature = Math.round(response.data.main.temp);

    document.querySelector("#my-location").innerHTML = response.data.name;
    document.querySelector("#time").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#location-temperature").innerHTML = celsiusTemperature;
    document.querySelector("#temp-min").innerHTML = Math.round(response.data.main.temp_min);
    document.querySelector("#temp-max").innerHTML = Math.round(response.data.main.temp_max);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
    document.querySelector("#wind-direction").innerHTML = response.data.wind.deg;
    document.querySelector(newFunction()).innerHTML = response.data.weather[0].description;
    function newFunction() {
        return "#description";
    }

}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 5; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
        <div class="col-xs-auto" id="day-card">
            <p>
                ${formatHours(forecast.dt * 1000)} <br />
                min | <strong>max</strong>: <br />
                <span id="temp-min1">${Math.round(forecast.main.temp_min)}</span>° |
                <strong><span id="temp-max1">${Math.round(forecast.main.temp_max)}</span>°</strong> <br />
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
            </p>
        </div>
        `;
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

//units
function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#location-temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#location-temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);