document.addEventListener('DOMContentLoaded', function () {
    const weatherButton = document.getElementById('get-weather-button');
    const weatherInfoDiv = document.getElementById('weather-info');

    async function getWeather() {
        const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
        const city = 'New York'; // Change to your desired location
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=40.7128&lon=-74.0060&exclude=hourly,minutely&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                weatherInfoDiv.innerHTML = `<p>Unable to fetch weather data. Please try again later.</p>`;
                return;
            }

            const dailyForecast = data.daily;
            let forecastHTML = `<h3>7-Day Weather Forecast for ${city}</h3>`;

            dailyForecast.forEach((day, index) => {
                const date = new Date(day.dt * 1000).toLocaleDateString();
                const description = day.weather[0].description;
                const temperature = day.temp.day;

                forecastHTML += `
                    <div class="forecast-day">
                        <h4>${date}</h4>
                        <p>Condition: ${description}</p>
                        <p>Temperature: ${temperature}°C</p>
                    </div>
                `;
            });

            weatherInfoDiv.innerHTML = forecastHTML;

        } catch (error) {
            weatherInfoDiv.innerHTML = `<p>Error fetching weather data. Check your internet connection.</p>`;
        }
    }

    weatherButton.addEventListener('click', getWeather);
});
