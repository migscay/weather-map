// const [position, setPosition] = useState(null)
// const map = useMapEvents({
// click() {
//   map.locate()
//   console('looking for location')
// },
// locationfound(e) {
// console('location found')  
// setPosition(e.latlng)
// map.flyTo(e.latlng, map.getZoom())
// },
// })

// return position === null ? null : (
// <Marker position={position}>
//   <Popup>You are here</Popup>
// </Marker>
// )

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
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var searchControl = new L.esri.Controls.Geosearch().addTo(map);

var results = new L.LayerGroup().addTo(map);

const appId = '845430a58cee863a49f14a3861b49ff7'; 
 
const getWeather = latLng => fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&appid=${appId}&units=metric`)
.then(response => response.json()); 
//const getWeather = latLng => fetch(`https://api.openweathermap.org/data/2.5/weather?q='Penrith,au'&appid=${appId}&units=metric`)
//.then(response => response.json()); 

searchControl.addEventListener('results', function(data) {
    console.log('search done');
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
      console.log(data.results[i].latlng)
    } 
    latitude = data.results[0].latlng.lat;
    longtitude = data.results[0].latlng.lng;
    const latLng = data.results[0].latlng;
    getWeather(latLng) 
        .then(data => {
            //data = JSON.stringify(data);
            
            //const weather = data.weather.id;
            console.log(`weather is ${data.lat}`);    
            console.log(`weather is ${data.lon}`);    
            console.log(`timezone is ${data.timezone}`);    
            console.log(`Temp is ${data.current.temp}`);   
            console.log(`weather is ${data.current.weather.icon}`);           
            const emoji = emojis[data.weather.icon];
            console.log(`emoji is ${emoji}`);
            const feelsLike = data.current.feels_like;
            console.log(`feelsLike is ${feelsLike}`);
            //console.log(`weather is ${data.lat}`);    
            // var geocodeService = L.esri.Geocoding.geocodeService();

            // geocodeService.reverse().latlng(latLng).run(function (error, result) {
            // if (error) {
            //     return;
            // } else {
            //     console.log(result);
            // }
            // });   
            // const name = data.name;
            // console.log(`name is ${name}`);
            // const emoji = emojis[data.weather[0].icon];
            // console.log(`name is ${emoji}`);
            // const temp = data.main.temp;
            // console.log(`name is ${temp}`);
            // const feelsLike = data.main.feels_like;
            // console.log(`name is ${feelsLike}`);
            // const description = data.weather[0].description;
            // console.log(`name is ${description}`);            
        } 
        )    
})
//searchControl.on('results', function(data){
    
// const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.results[i].latlng.lat}&lon=${data.results[i].latlng.lng}&appid=${appid}`;
// console.log(api);

// const getWeather = latlng => fetch(api).then(response => response.json);
// getWeather(latlng) 
//   .then(data => {
//   // get the data we need for our html from the response
//   const name = data.name;
//   const emoji = emojis[data.weather[0].icon];
//   const temp = data.main.temp;
//   const feelsLike = data.main.feels_like;
//   const description = data.weather[0].description;            
// });
//}});

