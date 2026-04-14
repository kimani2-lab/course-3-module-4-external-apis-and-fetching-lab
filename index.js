async function fetchWeatherData(state) {
  const alertsDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');
  
  // Reset displays
  alertsDisplay.innerHTML = '';
  errorMessage.classList.add('hidden');
  errorMessage.textContent = '';

  const url = `https://api.weather.gov/alerts/active?area=${state}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data.');
    }
    const data = await response.json();

    if (data.features.length === 0) {
      displayError("No active alerts for this state.");
    } else {
      displayWeather(data);
    }
  } catch (error) {
    displayError(error.message);
  }
}

function displayWeather(data) {
  const alertsDisplay = document.getElementById('alerts-display');
  data.features.forEach(alert => {
    const headline = alert.properties.headline;
    const p = document.createElement('p');
    p.textContent = headline;
    alertsDisplay.appendChild(p);
  });
}

function displayError(message) {
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
}

// Event Listener for the button
document.getElementById('fetch-alerts').addEventListener('click', () => {
  const stateInput = document.getElementById('state-input').value.toUpperCase();
  if (stateInput) {
    fetchWeatherData(stateInput);
  } else {
    displayError("Please enter a state abbreviation.");
  }
});

// Export for tests
if (typeof module !== 'undefined') {
  module.exports = { fetchWeatherData, displayWeather, displayError };
}
