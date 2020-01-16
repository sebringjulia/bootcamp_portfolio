// API endpoint for tracked earthquakes
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place + "</h3><hr><h2> Magnitude: " + feature.properties.mag + "</h2><p>" + new Date(feature.properties.time) + "</p>");
  }

  function getColor(d) {
    return d > 5 ? '#243173' :
           d > 4  ? '#475163' :
           d > 3  ? '#6a7253' :
           d > 2  ? '#8d9243' :
           d > 1   ? '#c1c32b' :           
                      '#f6f313';  
  }

  function getSize(d) {
    return d*7;
  }

  function geojsonMarkerOptions (feature) {
    return {
      radius: getSize(feature.properties.mag),
      fillColor: getColor(feature.properties.mag),
      color: "white",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8
    };
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions(feature));
    }
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: streetmap
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          mag = [1, 2, 3, 4, 5],
          labels = [];
  
      // loop through magnitude intervals and generate a label with a colored square for each interval
      for (var i = 0; i < mag.length; i++) {
          
        function getColor(d) {
          return d > 5 ? '#243173' :
                 d > 4  ? '#475163' :
                 d > 3  ? '#6a7253' :
                 d > 2  ? '#8d9243' :
                 d > 1   ? '#c1c32b' :           
                            '#f6f313';  
      }
          
          div.innerHTML +=
              '<i style="background:' + getColor(mag[i] + 1) + '"></i> ' +
              mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);}
