function search(){
    const city = document.getElementById('city').value;
    console.log(city)
    // Call the openweatherapp API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9de243494c0b295cca9337e1e96b00e2&units=metric`)
    .then(response => response.json())
    .then(data => {
        writeResults(data)
    }
    )
    .catch(err => {
    alert("Wrong city name")
    console.log(err)
})
    
}

function writeResults(data){
    console.log(data)
    if(data.cod != 200) return alert("Wrong city name");
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const { main, name, sys, weather } = data;
    console.log(data)
    document.getElementById('result').style.display = "block"
    document.getElementsByClassName('openWM')[0].style.display = "block"
    document.getElementById('temp').innerHTML = "Temperature: " + data.main.temp
    document.getElementById('city-name').innerHTML = data.name
    document.getElementById('country').innerHTML = regionNames.of(data.sys.country)
    document.getElementById('weather').innerHTML = data.weather[0].main
    document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity
    document.getElementById('pressure').innerHTML = "Pressure: " + data.main.pressure
    document.getElementById('wind').innerHTML = "Wind: " + data.wind.speed
    document.getElementById('weather-icon').src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
}

document.addEventListener('click', function(e){
    if(e.target && e.target.className == 'openWM'){
        if(document.getElementById('openWM-R').style.display == "block"){
            document.getElementById('openWM-R').style.display = "none"
            return;
        }
        document.getElementById('openWM-R').style.display = "block"
    }
})