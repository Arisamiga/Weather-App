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
    case "Rain, rain with thunderstorm":
        return "11d";
    case "Snow, snow with thunderstorm":
        return "11d";
    case "Rain with thunderstorm":
        return "11d";
  }
}
