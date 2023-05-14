var index = 0;
function search() {
  createNewResultsElements();
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city name");
  if (city.length <= 3) return alert("Please enter a valid city name");
  console.log(city);
  document.getElementById("search").disabled = true;
  document.getElementById("search").innerHTML = "Searching...";
  setTimeout(() => {
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
        alert("Cannot Find City Name");
        console.log(err);
      });
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
        alert("Cannot Find City Name");
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
        alert("Cannot Find City Name");
        console.log(err);
      });
  }, 2000);
  setTimeout(() => {
    document.getElementById("search").disabled = false;
    document.getElementById("search").innerHTML = "Search";
  }, 5000);
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
  console.log(wp, temp, wind, description, humidity, pressure, icon, code);
  console.log(wp, data);
  if (code != 200) return alert("Cannot Find City Name");
  wp = index + wp;
  console.log(index);
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  document.getElementById("result" + index).style.display = "block";
  document.getElementsByClassName(wp)[0].style.display = "block";
  document.getElementById(wp + "-temp").innerHTML = "Temperature: " + temp;
  if (!document.getElementById(index + "country").innerHTML) {
    document.getElementById(index + "city-name").innerHTML = data.name;
    document.getElementById(index + "country").innerHTML = regionNames.of(
      data.sys.country
    );
  }
  document.getElementById(wp + "-weather").innerHTML = description;
  document.getElementById(wp + "-humidity").innerHTML = "Humidity: " + humidity;
  document.getElementById(wp + "-pressure").innerHTML = "Pressure: " + pressure;
  document.getElementById(wp + "-wind").innerHTML = "Wind: " + wind;
  document.getElementById(
    wp + "-weather-icon"
  ).src = `https://openweathermap.org/img/wn/${icon}.png`;
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

function createNewResultsElements() {
  index++;
  var wp = ["openWM", "wttr", "goW"];
  var wpNames = ["OpenWeatherMap", "Wttr", "GoWeather"];
  var results = document.createElement("div");
  results.setAttribute("id", "result" + index);
  results.setAttribute("class", "result");
  document.getElementsByClassName("card-footer")[0].appendChild(results);
  var spanList = [index + "city-name", index + "country"];
  var cityName = document.createElement("span");
  cityName.setAttribute("id", spanList[0]);
  document.getElementById("result" + index).appendChild(cityName);
  document.getElementById("result" + index).innerHTML += ", ";

  var country = document.createElement("span");
  country.setAttribute("id", spanList[1]);
  document.getElementById("result" + index).appendChild(country);

  wp.forEach((wpe) => {
    console.log(wpe);
    var newS = document.createElement("span");
    newS.setAttribute("class", index + wpe + " rWP");
    newS.innerHTML = wpNames[wp.indexOf(wpe)];
    console.log(wpNames[wp.indexOf(wpe)]);
    wpe = index + wpe;
    document.getElementById("result" + index).appendChild(newS);
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "R-Dropdown");
    newDiv.setAttribute("id", wpe + "-R");
    document.getElementById("result" + index).appendChild(newDiv);
  });
  var idsToClear = [
    "openWM-temp",
    "openWM-humidity",
    "openWM-pressure",
    "openWM-wind",
    "openWM-weather",
    "wttr-temp",
    "wttr-humidity",
    "wttr-pressure",
    "wttr-wind",
    "wttr-weather",
    "goW-temp",
    "goW-humidity",
    "goW-pressure",
    "goW-wind",
    "goW-weather",
  ];
  idsToClear.forEach((id) => {
    var newP = document.createElement("div");
    newP.setAttribute("id", index + id);
    document.getElementById(index + id.split("-")[0] + "-R").appendChild(newP);
  });
  imgsToAdd = ["openWM-weather-icon", "wttr-weather-icon", "goW-weather-icon"];
  imgsToAdd.forEach((img) => {
    var newImg = document.createElement("img");
    newImg.setAttribute("id", index + img);
    document
      .getElementById(index + img.split("-")[0] + "-R")
      .appendChild(newImg);
  });
}
