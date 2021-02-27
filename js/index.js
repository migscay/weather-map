// emojis object used to find the right emoji from the icon code sent from the api
const emojis = {
    '01d': '☀️',
    '02d': '⛅️',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧',
    '10d': '🌦',
    '11d': '⛈',
    '13d': '❄️',
    '50d': '💨',
    '01n': '☀️',
    '02n': '⛅️',
    '03n': '☁️',
    '04n': '☁️',
    '09n': '🌧',
    '10n': '🌦',
    '11n': '⛈',
    '13n': '❄️',
    '50n': '💨',
  };
  
let map = L.map('map').setView([40.91, -96.63], 4);
let latitude = 0;
let longtitude = 0;
let name = "";
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var searchControl = new L.esri.Controls.Geosearch().addTo(map);

var results = new L.LayerGroup().addTo(map);

const appId = '845430a58cee863a49f14a3861b49ff7'; 
 
const getWeather = latLng => fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&appid=${appId}&units=metric`)
.then(response => response.json()); 

searchControl.addEventListener('results', function(data) {
    console.log('search done');
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
      name = data.results[i].name; 
    } 
    latitude = data.results[0].latlng.lat;
    longtitude = data.results[0].latlng.lng;
    const latLng = data.results[0].latlng;
    getWeather(latLng) 
        .then(data => {
            const emoji = emojis[data.current.weather[0].icon];
            const feelsLike = data.current.feels_like;
            const description = data.current.weather[0].description;
            const temp = data.current.temp;

            const infowindow = `${name}  ${emoji} ${description}          ${temp}c, feels like ${feelsLike}c`;

            const marker = L.marker(latLng).addTo(map);
            marker.bindPopup(infowindow).openPopup();
        } )    
})