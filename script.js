
const inputBox = document.querySelector('.input-box');
const searchbtn = document.getElementById('search-btn');
const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.Temprature');
const description = document.querySelector('.weather-text');
const humidity = document.querySelector('.humidity-text');
const wind_speed = document.querySelector('.windspeed');
const weather_body = document.querySelector('.weather-body');
const weather_details = document.querySelector('.weather-details');
const location_not_found = document.querySelector('.location-not-found');



const apiKey = "29b56eca79e0aa311792ff391d75f210";
function apiUrl(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
}
async function checkWeather(city) {
    const response = await fetch(apiUrl(city));
    const weather_data = await response.json();
    
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        weather_details.style.display = "none";
        console.log("error");
        return;
    }
    console.log(weather_data);
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    temp.innerHTML = `${weather_data.main.temp}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`
    humidity.innerHTML = `${weather_data.main.humidity}%`;

    switch (weather_data[0].main) {
        case 'Clouds':
            weatherImg.src = "/img/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/img/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/img/rain.png";
            break;
        case 'Snow':
            weatherImg.src = "/img/snow.png";
            break;
        case 'Mist':
            weatherImg.src = "/img/mist.png";
            break;
    }
}
searchbtn.addEventListener('click', () => {
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    weather_details.style.display = "flex";
    checkWeather(inputBox.value)
})

inputBox.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        weather_details.style.display = "flex";
        checkWeather(inputBox.value);
    }
});