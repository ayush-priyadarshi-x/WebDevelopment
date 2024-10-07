const apikey = "a24cc7928e96c22eab5aee5aef0f1719";
const apirul = "https://api.openweathermap.org/data/2.5/weather?unit=metric&q=";

async function createWeatherDisplay() {
  const middle = document.querySelector(".middle");
  const lower = document.querySelector(".lower");

  // Clear existing weather display elements
  middle.innerHTML = "";
  lower.innerHTML = "";

  // Create elements for weather display
  const image = document.createElement("div");
  image.id = "image";
  middle.appendChild(image);

  const temperature = document.createElement("div");
  temperature.id = "temperature";
  middle.appendChild(temperature);

  const city = document.createElement("div");
  city.id = "city";
  middle.appendChild(city);

  const humidity = document.createElement("div");
  humidity.id = "humidity";
  humidity.className = "aditional_info";
  lower.appendChild(humidity);

  const wind_speed = document.createElement("div");
  wind_speed.id = "wind_speed";
  wind_speed.className = "aditional_info";
  lower.appendChild(wind_speed);
}

async function fetchWeather(place) {
  try {
    const response = await fetch(`${apirul}${place}&appid=${apikey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    displayError(place);
  }
}

function displayError(place) {
  const display = document.createElement('div');
  display.innerHTML = `<div class="alert alert-danger" role="alert">The spelling "${place}" doesn't match any city name. <button class="close-btn" onclick="location.reload()" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
  document.querySelector('.container').prepend(display);
}

async function displayWeather(place) {
  try {
    const data = await fetchWeather(place);
    createWeatherDisplay();

    const { humidity, temp } = data.main;
    document.getElementById("temperature").textContent = Math.round(temp - 273) + "°C";

    const display = place.charAt(0).toUpperCase() + place.slice(1);
    document.getElementById("city").textContent = display;

    document.getElementById("humidity").textContent = `Humidity: ${humidity} %`;
    document.getElementById("wind_speed").textContent = `Wind Speed: ${data.wind.speed} km/hr`;

    const type = data.weather[0].main.toUpperCase();
    const imagebox = document.getElementById("image");
    imagebox.className = getTypeClassName(type);
  } catch (error) {
    console.error(error);
  }
}

function getTypeClassName(weatherType) {
  switch (weatherType) {
    case "CLEAR":
      return "sunny";
    case "CLOUDS":
      return "cloudy";
    case "RAINY":
      return "rainy";
    case "MIST":
      return "foggy";
    case "HAZE":
      return "haze";
    default:
      return "";
  }
}

document.getElementById("searchbutton").addEventListener("click", () => {
  const place = document.getElementById("searchbox").value.trim();
  if (place) {
    displayWeather(place);
  }
});
