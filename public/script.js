

// UI goodies
function activate(elem){
    let potholes = document.getElementsByClassName('potholes')[0];
    let roadquality = document.getElementsByClassName('roadquality')[0];
      // potholes.classList.toggle('hidden');
      // roadquality.classList.toggle('hidden');
    switch(elem){
      case 0:
        potholes.classList.remove('hidden')
        roadquality.classList.add('hidden')
        break;
      case 1:
        potholes.classList.add('hidden')
        roadquality.classList.remove('hidden')
        break;
      default:
        console.log("Invalid input to the funciton activate")
        break;
    }
  }

  // Event Listners
  document.getElementById("pot-trigger").addEventListener("click", function() {
    activate(0)
    
    document.getElementById('rdq-trigger').classList.add('inactive')
    document.getElementById('pot-trigger').classList.remove('inactive')
    
    document.getElementsByClassName('m-pth')[0].classList.add('visible')
    document.getElementsByClassName('m-rdq')[0].classList.remove('visible')
    
    
  })
  
  document.getElementById("rdq-trigger").addEventListener("click", function() {
    activate(1)
    
    document.getElementById('rdq-trigger').classList.remove('inactive')
    document.getElementById('pot-trigger').classList.add('inactive')

    document.getElementsByClassName('m-pth')[0].classList.remove('visible')
    document.getElementsByClassName('m-rdq')[0].classList.add('visible')
  })

  document.getElementsByClassName('controls')[0].addEventListener("click", function() {
    l();
  })
  
  document.getElementsByClassName('nav-trigger')[0].addEventListener("click", function() {
    document.getElementsByClassName('nav-trigger')[0].classList.toggle('close')
    document.getElementsByClassName('nav-trigger')[0].classList.toggle('open')
    document.getElementsByClassName('navigation')[0].classList.toggle('open')
  })

// UI goodies end here.



let returnData = {}
let markers = {}
let geoJson = {}
// when we call the getData function it updates the markers and returnData vairable
function getData(longitude,lattitude){
  // Step 1 -> make the request *
  // Step 2 -> send the request *
  // Step 3 -> get the response *
  // Step 4 -> conver to JSON object *
  // Step 5 -> return the JSON object *

  // let url = 'http://localhost:8080/location'
  let url ='http://localhost:8080/location'
  let data = {
    'long': longitude,
    'latt': lattitude
  }
  
  let req = {
    method : 'POST',
    mode : 'cors',
    cache : 'no-cache',
    credentials : 'same-origin',
    headers : {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch(url,req).then((response)=>{
    return response.json()
  })
  .then((data)=>{
    // making json obejcts containg data and markers
    markers = data['markers']
    returnData = data
    console.log(data);
  })
  .catch((error)=>{
    console.log("Error!!! :"+error)
    returnData = "Error : "+error
  })
  plotData()
}


// Plotting
let userLocation =undefined
mapcentre = undefined
var map = L.map('potholes-map');

function GotUserLocation(data){
  userLocation = {
    'latt':data.coords['latitude'],
    'long': data.coords['longitude']
  }
  mapcentre = [userLocation['latt'],userLocation['long']]
  mapcentre = [30.415927729495323,77.96679368267777]  //I don't know why but it is breaking
  console.log("calling init map mapcentre -> "+mapcentre)
  // plotData()

  initMap()
  getData(1234,4321)
  
}
function NotGotUserLocation(){
  console.log("Please Allow Geo-Location")
  mapcentre = [30.415927729495323,77.96679368267777]
}

// Asking for location
function l(){
  // if (navigator.geolocation) {
  //   window.navigator.geolocation.getCurrentPosition(GotUserLocation,NotGotUserLocation)
  // } else {
  //   document.getElementById('potholes-map').innerHTML = "Geolocation is not supported by this browser."
  // }
  //we will use the location of the device once everything sorts out
  GotUserLocation({coords:{'latitude':1,'longitude':2}})
}
function initMap(){
  console.log(mapcentre)
  map.setView(mapcentre, 13)
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXl1c2hwYmgiLCJhIjoiY2wwZ3UxNWxmMDE3aDNvbzJnOWR0c3k1MyJ9.k8KDKms3lwtkl1jGv4QoyA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(map);
}
function plotData() {

  // var marker = L.marker([30.415927729495323, 77.96679368267777]).addTo(map);
  // var marker2 = L.marker([30.412714400054732, 77.96725365856815]).addTo(map);
  // var marker3 = L.marker([30.404709275563498, 77.96976693453013]).addTo(map);
  // var marker4 = L.marker([30.399142248152913, 77.96922429535724]).addTo(map);
  console.log("Hey")
  for (var i in markers) {
    var latlng = L.latLng( markers[i].Latitude,  markers[i].Longitude );
    console.log(i+' Lattitue = '+markers[i].Latitude+', Longitude'+markers[i].Longitude)
    L.marker( latlng ).addTo(map);
  }
}


// mongodb
/*
mongodb+srv://yefj:<password>@cluster0.amxov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
*/