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
function drawConstellationChart() {
    const canvas = document.getElementById('constellation-chart');
    const ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Define some stars and their connections (for example: Orion)
    const stars = [
        { x: 300, y: 100 },  // Betelgeuse
        { x: 320, y: 200 },  // Bellatrix
        { x: 400, y: 150 },  // Rigel
        { x: 350, y: 250 },  // Saiph
        { x: 280, y: 250 },  // Meissa
    ];

    // Draw stars
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw lines connecting stars (for Orion)
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(stars[0].x, stars[0].y); // Betelgeuse
    ctx.lineTo(stars[1].x, stars[1].y); // Bellatrix
    ctx.lineTo(stars[2].x, stars[2].y); // Rigel
    ctx.lineTo(stars[3].x, stars[3].y); // Saiph
    ctx.lineTo(stars[0].x, stars[0].y); // Back to Betelgeuse
    ctx.stroke();
}

// Call the draw function
drawConstellationChart();
