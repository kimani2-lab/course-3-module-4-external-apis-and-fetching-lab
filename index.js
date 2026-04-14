// Get elements from HTML
const button = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const cityText = document.getElementById("city");
const tempText = document.getElementById("temp");
const conditionText = document.getElementById("condition");
const icon = document.getElementById("icon");

// Convert weather code → text
function getWeatherCondition(code) {
  if (code === 0) return "Clear";
  if (code === 1 || code === 2) return "Partly Cloudy";
  if (code === 3) return "Cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 67) return "Drizzle";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

// Convert weather code → icon image
function getWeatherIcon(code) {
  if (code === 0) return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
  if (code === 1 || code === 2) return "https://cdn-icons-png.flaticon.com/512/1163/1163661.png";
  if (code === 3) return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
  if (code >= 45 && code <= 48) return "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
  if (code >= 51 && code <= 67) return "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
  if (code >= 71 && code <= 77) return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
  if (code >= 80 && code <= 82) return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
  if (code >= 95) return "https://cdn-icons-png.flaticon.com/512/1146/1146860.png";
  return "";
}

// Main function (runs when searching)
function getWeather() {
  const city = input.value;

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(res => res.json())
    .then(locationData => {

      if (!locationData.results) {
        cityText.textContent = "City not found";
        tempText.textContent = "";
        conditionText.textContent = "";
        icon.src = "";
        return;
      }

      const lat = locationData.results[0].latitude;
      const lon = locationData.results[0].longitude;
      const name = locationData.results[0].name;

      return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(res => res.json())
        .then(weatherData => {

          const code = weatherData.current_weather.weathercode;

          cityText.textContent = name;
          tempText.textContent = weatherData.current_weather.temperature + "°C";
          conditionText.textContent = getWeatherCondition(code);
          icon.src = getWeatherIcon(code);
        });
    })
    .catch(err => console.log("Error:", err));
}

// Click button
button.addEventListener("click", getWeather);

// Press Enter key
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
