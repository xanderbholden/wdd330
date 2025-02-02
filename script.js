document.addEventListener('DOMContentLoaded', function () {
    const weatherButton = document.querySelector('#get-weather-button');
    const weatherInfoDiv = document.querySelector('#weather-info');

    // Function to fetch weather info
    async function getWeather() {
        const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
        const city = 'New York'; // Or replace with a dynamic city input if needed
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                weatherInfoDiv.innerHTML = `<h3>Current Weather in ${city}</h3>
                                            <p>Condition: ${weatherDescription}</p>
                                            <p>Temperature: ${temperature}°C</p>`;
            } else {
                weatherInfoDiv.innerHTML = `<p>Sorry, couldn't fetch weather data at this moment.</p>`;
            }
        } catch (error) {
            weatherInfoDiv.innerHTML = `<p>Failed to retrieve weather data. Please try again later.</p>`;
        }
    }

    // Event listener for button click
    weatherButton.addEventListener('click', getWeather);
});
