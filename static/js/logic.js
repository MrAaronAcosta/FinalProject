
 function onEachFeature(feature, layer) {
  layer.bindPopup("<h1>" + feature.properties.name + "<br/>" + "<h2>" + " Ranking (2019): " + feature.properties.robHabitacion2021 +
    "</h3><hr><p>" + "Happiness Score (2019): " + feature.properties.robHabitacion2019 + "<br/>" + "Happinesss Score Prediction (2020): " + 
    feature.properties.robHabitacion2020 + "<br/>" + "</h3><hr><p><b>" + "Ranking (2020): " + feature.properties.robHabitacion2022 + "<br/>" +
     "Percent Change: " + (((feature.properties.robHabitacion2020/feature.properties.robHabitacion2019) - 1) * 100).toFixed(2) + "%"
      + "</p>");
}


function createMap(earthquakes,earthquakeData) {

  function indexFilter(happinessScore){
    if (happinessScore <= 4.66){
      return "blue";
    } 
  }

  function indexFilter2(happinessScore){
      if (happinessScore > 4.66 && happinessScore < 6.32){
      return "red";
    }
  }

  function indexFilter3(happinessScore){
    if (happinessScore > 6.32 && happinessScore <= 8){
    return "yellow";
  }
}
  var overlayMaps = {
    Mexico: earthquakes
  };


  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });


  var myMap = L.map("map", {
    center: [
      19.432608, -99.133209
    ],
    zoom: 2,
    layers: [streetmap, earthquakes]
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

//TRISTE
  var indexmap  = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      return  {color:indexFilter(feature.properties.robHabitacion2019)}
    }
  });

  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  //FELIZ
  var indexmap2  = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      return  {color:indexFilter2(feature.properties.robHabitacion2019)}
    }
  });

  //SUPER FELIZ
  var indexmap3  = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      return  {color:indexFilter3(feature.properties.robHabitacion2019)}
    }
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "LEAST HAPPY" : indexmap,
    "HAPPY" : indexmap2,
    "SUPER HAPPY" : indexmap3
  };
  L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(myMap);

  myMap.on('baselayerchange', onOverlayAdd);

  function onOverlayAdd(e){
      if (e.name=="LEAST HAPPY" || e.name=="HAPPY" || e.name=="SUPER HAPPY"){
        myMap.removeLayer(earthquakes);
      }
      else{
        myMap.addLayer(earthquakes);
      }
  }  
}


function obtienecolor(estado) {
  console.log(estado);
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}


function createFeatures(earthquakeData) {
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      return  {color:obtienecolor(feature.properties.name)};
    }
  });


  createMap(earthquakes,earthquakeData);
}


for (let i = 0; i < paisesmundo.features.length; i++) {
  poligonoActual =   paisesmundo.features[i].properties.name;
  for (let t = 0; t < datacountries.length; t++) { 
    if(datacountries[t].Country==poligonoActual){
      paisesmundo.features[i].properties.name = datacountries[t]["Country"]
      paisesmundo.features[i].properties.robHabitacion2019 = datacountries[t]["Happiness score"]
      paisesmundo.features[i].properties.robHabitacion2020 = datacountries[t]["Happiness Score Prediction"]
      paisesmundo.features[i].properties.robHabitacion2021 = datacountries[t]["Ranking"]
      paisesmundo.features[i].properties.robHabitacion2022 = datacountries[t]["Ranking 2020"]
      console.log(paisesmundo.features[i].properties)
    }
  }
}
createFeatures(paisesmundo);
