const cityInput = document.querySelector('.city-input');
const searchButton = document.querySelector('.city-serach-button');
const warning = document.querySelector('.warning');

const API_KEY = 'c62f6713ed9b9245994f800bded61de2';

const getGeocording = () => {
    const city = cityInput.value;

    if(city === '') {
        warning.textContent = 'Podaj nazwe miasta';
        return;
    }
    
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const lat = data[0].lat;
            const lon = data[0].lon;
            getWeather(lat, lon);
        })
        .catch(err => {
            console.error(err);
            warning.textContent = 'Podaj prawidlowa nazwe miasta';
        })

    warning.textContent = '';
}

const getWeather = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const weatherID = data.weather[0].id;
            const cityName = data.name;
            const weather = data.weather[0].main;
            const weatherDescription = data.weather[0].description;
            const temperature = Math.floor(data.main.temp);
            const humidity = data.main.humidity;

            setProperties(cityName, weather, weatherDescription, temperature, humidity, weatherID);
        })
        .catch(err => console.error(err))
}

const setProperties = (cityName, weather, weatherDescription, temperature, humidity, weatherID) => {
    const cityNameArea = document.querySelector('.city-name');
    const weatherArea = document.querySelector('#weather-area');
    const weatherDescriptionArea = document.querySelector('#weather-description-area');
    const temperatureArea = document.querySelector('#temperature-area');
    const humidityArea = document.querySelector('#humidity-area');

    cityNameArea.textContent = cityName;
    weatherArea.textContent = weather;
    weatherDescriptionArea.textContent = weatherDescription;
    temperatureArea.textContent = temperature + '℃';
    humidityArea.textContent = humidity + '%';

    setImage(weatherID);
}

const setImage = (weatherID) => {
    const image = document.querySelector("#image");

    if(weatherID >= 200 && weatherID <= 232) {
        image.setAttribute('src', 'dist/img/thunderstorm.png')
    } else if(weatherID >= 300 && weatherID <= 321) {
        image.setAttribute('src', 'dist/img/drizzle.png')
    } else if(weatherID >= 500 && weatherID <= 531) {
        image.setAttribute('src', 'dist/img/rain.png')
    } else if(weatherID >= 600 && weatherID <= 622) {
        image.setAttribute('src', 'dist/img/ice.png')
    } else if(weatherID >= 801 && weatherID <= 804) {
        image.setAttribute('src', 'dist/img/cloud.png')
    } else if(weatherID == 741) {
        image.setAttribute('src', 'dist/img/smog.png')
    } else if(weatherID == 800) {
        image.setAttribute('src', 'dist/img/sun.png')
    } else {
        image.setAttribute('src', 'dist/img/unknown.png')
    }
}

searchButton.addEventListener('click', getGeocording);
window.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        getGeocording();
    }
});