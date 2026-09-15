async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    weatherDiv.innerHTML =
      '<p class="error">Please enter a city name.</p>';
    return;
  }

  weatherDiv.innerHTML = "<p>Loading weather data...</p>";

  try {
    // Step 1: Find the city coordinates
    const locationResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );

    if (!locationResponse.ok) {
      throw new Error("Unable to find the city.");
    }

    const locationData = await locationResponse.json();

    if (!locationData.results || locationData.results.length === 0) {
      weatherDiv.innerHTML =
        '<p class="error">City not found. Please try another city.</p>';
      return;
    }

    const location = locationData.results[0];

    // Step 2: Get weather using latitude and longitude
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error("Unable to fetch weather data.");
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    // Step 3: Display the JSON data
    weatherDiv.innerHTML = `
      <h2>${location.name}, ${location.country}</h2>

      <div class="weather-info">
        <p><strong>Temperature:</strong> ${current.temperature_2m} °C</p>
        <p><strong>Humidity:</strong> ${current.relative_humidity_2m}%</p>
        <p><strong>Wind Speed:</strong> ${current.wind_speed_10m} km/h</p>
        <p><strong>Time:</strong> ${current.time}</p>
      </div>
    `;
  } catch (error) {
    weatherDiv.innerHTML =
      `<p class="error">Error: ${error.message}</p>`;
  }
}
