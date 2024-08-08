const apiKey = "768e0288406389e6e0f9840659813b24";

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");

const searchButton = document.querySelector(".search-box button");

const weather = document.querySelector(".weather");

const errorText = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}&lang=ru`);

  if (response.status === 404) {
    errorText.style.display = "flex";
    weather.style.display = "none";
  } else {
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.sys.country + ", " + data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "<l>°C</l>";
    document.querySelector(".desc").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " км/ч";

    if (data.weather[0].main == "Clear") {
      document.querySelector(".city-pog").innerHTML = '<img class="city__pog" src="images/clear.png">'
    } else if (data.weather[0].main == "Rain") {
      document.querySelector(".city-pog").innerHTML = '<img class="city__pog" src="images/rain.png">'
    } else if (data.weather[0].main == "Mist") {
      document.querySelector(".city-pog").innerHTML = '<img class="city__pog" src="images/mist.png">'
    } else if (data.weather[0].main == "Snow") {
      document.querySelector(".city-pog").innerHTML = '<img class="city__pog" src="images/snow.png">'
    } else if (data.weather[0].main == "Clouds") {
      document.querySelector(".city-pog").innerHTML = '<img class="city__pog" src="images/clouds.png">'
    }

    weather.style.display = "block";
    errorText.style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchInput.value);
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    checkWeather(searchInput.value);
    searchInput.value = "";
  }
});
