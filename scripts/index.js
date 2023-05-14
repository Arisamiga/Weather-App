function search() {
  clearResults();
  const city = document.getElementById("city").value;
  if(!city) return alert("Please enter a city name")
  console.log(city);
  // Call wttr API
  fetch(`https://wttr.in/${city}?format=j1`)
    .then(async (response) => {
      var data = await response.json();
      console.log(data);
      writeResults(
        data,
        "wttr",
        data.current_condition[0].FeelsLikeC + " °C",
        data.current_condition[0].windspeedKmph + " km/h",
        data.current_condition[0].weatherDesc[0].value,
        data.current_condition[0].humidity,
        data.current_condition[0].pressure,
        toWeatherIcon(data.current_condition[0].weatherDesc[0].value),
        response.status
      );
    })
    .catch((err) => {
      alert("4Wrong city name");
      console.log(err);
    });
  // Call goweatherapp API
  fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(async (response) => {
      data = await response.json();
      console.log(data);
      var code = response.status;
      if (data.wind == "") code = 404;
      writeResults(
        data,
        "goW",
        data.temperature,
        data.wind,
        data.description,
        "Not available",
        "Not available",
        toWeatherIcon(data.description),
        code
      );
    })
    .catch((err) => {
      alert("3Wrong city name");
      console.log(err);
    });
  // Call the openweatherapp API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9de243494c0b295cca9337e1e96b00e2&units=metric`
  )
    .then(async (response) => {
      var data = await response.json();

      writeResults(
        data,
        "openWM",
        data.main.temp + " °C",
        data.wind.speed,
        data.weather[0].main,
        data.main.humidity,
        data.main.pressure,
        data.weather[0]["icon"],
        response.status
      );
    })
    .catch((err) => {
      alert("2Wrong city name");
      console.log(err);
    });
}

function clearResults() {
  var wp = ["wttr", "goW", "openWM"];
  wp.forEach((wp) => {
    document.getElementsByClassName(wp)[0].style.display = "none";
    document.getElementById(wp + "-R").style.display = "none";
  });
  document.getElementById("result").style.display = "none";
  document.getElementById("city-name").innerHTML = "";
  document.getElementById("country").innerHTML = "";
  var idsToClear = [
    "openWM-temp",
    "openWM-weather",
    "openWM-humidity",
    "openWM-pressure",
    "openWM-wind",
    "openWM-weather-icon",
    "wttr-temp",
    "wttr-weather",
    "wttr-humidity",
    "wttr-pressure",
    "wttr-wind",
    "wttr-weather-icon",
    "goW-temp",
    "goW-weather",
    "goW-humidity",
    "goW-pressure",
    "goW-wind",
    "goW-weather-icon",
  ];
  idsToClear.forEach((id) => {
    document.getElementById(id).innerHTML = "";
  });
}

function toWeatherIcon(icon) {
  switch (icon) {
    case "Sunny":
      return "01d";
    case "Clear":
      return "01d";
    case "Partly cloudy":
      return "02d";
    case "Cloudy":
      return "03d";
    case "Overcast":
      return "04d";
    case "Mist":
      return "50d";
    case "Patchy rain possible":
      return "09d";
    case "Patchy snow possible":
      return "13d";
    case "Patchy sleet possible":
      return "13d";
    case "Patchy freezing drizzle possible":
      return "13d";
    case "Thundery outbreaks possible":
      return "11d";
    case "Blowing snow":
      return "13d";
    case "Blizzard":
      return "13d";
    case "Fog":
      return "50d";
    case "Freezing fog":
      return "50d";
    case "Patchy light drizzle" ||
      "Patchy light rain" ||
      "Light drizzle" ||
      "Freezing drizzle" ||
      "Heavy freezing drizzle" ||
      "Light rain" ||
      "Moderate rain at times" ||
      "Moderate rain" ||
      "Heavy rain at times" ||
      "Heavy rain" ||
      "Light freezing rain" ||
      "Moderate or heavy freezing rain":
      return "09d";
    case "Light sleet" ||
      "Moderate or heavy sleet" ||
      "Patchy light snow" ||
      "Light snow" ||
      "Patchy moderate snow" ||
      "Moderate snow" ||
      "Patchy heavy snow" ||
      "Heavy snow" ||
      "Ice pellets":
      return "13d";
    case "Light rain shower":
      return "09d";
    case "Moderate or heavy rain shower":
      return "09d";
    case "Torrential rain shower":
      return "09d";
    case "Light sleet showers":
      return "13d";
    case "Moderate or heavy sleet showers":
      return "13d";
    case "Light snow showers":
      return "13d";
    case "Moderate or heavy snow showers":
      return "13d";
    case "Light showers of ice pellets":
      return "13d";
    case "Moderate or heavy showers of ice pellets":
      return "13d";
    case "Patchy light rain with thunder":
      return "11d";
    case "Moderate or heavy rain with thunder":
      return "11d";
    case "Patchy light snow with thunder":
      return "11d";
    case "Moderate or heavy snow with thunder":
      return "11d";
    default:
      return "01d";
  }
}

function writeResults(
  data,
  wp,
  temp,
  wind,
  description,
  humidity,
  pressure,
  icon,
  code
) {
  console.log(wp, data);
  if (code != 200) return alert("1Wrong city name");
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  document.getElementById("result").style.display = "block";
  document.getElementsByClassName(wp)[0].style.display = "block";
  document.getElementById(wp + "-temp").innerHTML = "Temperature: " + temp;
  if (!document.getElementById("country").innerHTML) {
    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("country").innerHTML = regionNames.of(
      data.sys.country
    );
  }
  document.getElementById(wp + "-weather").innerHTML = description;
  document.getElementById(wp + "-humidity").innerHTML = "Humidity: " + humidity;
  document.getElementById(wp + "-pressure").innerHTML = "Pressure: " + pressure;
  document.getElementById(wp + "-wind").innerHTML = "Wind: " + wind;
  if (!icon) return console.log("no icon");
  document.getElementById(
    wp + "-weather-icon"
  ).src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`;
}

document.addEventListener("click", function (e) {
  if (e.target && e.target.className.includes("rWP")) {
    console.log(e.target.className.replace("rWP", "") + "-R");
    const dropdown =
      e.target.className.replace("rWP", "").replace(" ", "") + "-R";
    if (document.getElementById(dropdown).style.display == "block") {
      document.getElementById(dropdown).style.display = "none";
      return;
    }
    document.getElementById(dropdown).style.display = "block";
  }
});
