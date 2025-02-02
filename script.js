document.addEventListener('DOMContentLoaded', function () {
    const weatherButton = document.querySelector('#weather-button');

    weatherButton.addEventListener('click', function () {
        alert('Showing weather information...');
    });
});
async function getWeather() {
    const apiKey = 'your_api_key_here';
    const city = 'New York'; // Or use any location
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Look at the data to see what you get

    // Show the weather on your website (for example)
    const weatherElement = document.querySelector('#weather');
    weatherElement.innerHTML = `<h2>Weather in ${city}</h2><p>${data.weather[0].description}</p><p>Temp: ${data.main.temp}°C</p>`;
}

document.addEventListener('DOMContentLoaded', getWeather);
