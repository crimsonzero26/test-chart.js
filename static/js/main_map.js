// Map Creation
let myMap = L.map("map", {
    center: [20, 0],
    zoom: 2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

d3.json("/static/data/countries.geojson").then(function(data){
  // console.log(data.features[0].properties);

  // let myAdmins = data.features.map(o => o.ADMIN);
  // console.log(myAdmins);
  // chooseColor(feature.properties.ADMIN);
  L.geoJson(data, {
    style: function(feature) {
      return {
      // whatever: chooseColor(feature.properties.ADMIN),
      color: "black",
      fillColor: chooseColor(feature.properties.ADMIN),
      fillOpacity: 0.5,
      weight: 1.5
    };
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h5>" + feature.properties.ADMIN + "</h5>");
    }
  }).addTo(myMap);
});

const url = "/countries"

let colorLookUp = {};

d3.json(url).then(data => {
  data.forEach(o => {
    colorLookUp[o.country] = o.total_litres_of_pure_alcohol;
  });
});

// Shout out to Dom's help on HW 14 came in handy with making these functions

// Country Data Table
function ShowCountryData(currentCountry) 
{
  // console.log(`Show Country Data: ${currentCountry}`);

  d3.json(url).then(data => {
    data.forEach(item => {
      if (item.country == currentCountry) {
        // console.log(item);
        let countryData = `
        <h4>Country : ${item.country}<h4/>
        <hr>
        <h5>Beer Servings : ${item.beer_servings}L<h5>
        <h5>Wine Servings : ${item.wine_servings}L<h5>
        <h5>Spirit Servings : ${item.spirit_servings}L<h5>
        <h5>Total Average Litres : ${item.total_litres_of_pure_alcohol}<h5>
        `;
        d3.select('#country-info').html(countryData);
      }
    });
  });
}

// Unemploy Data Visual
function ShowUnemploymentData(currentCountry) 
{
  // console.log(`Show Unemploy Data: ${currentCountry}`);

  d3.json(url).then(data => {
    data.forEach(item => {
      if (item.country == currentCountry) {
        // console.log(item);
        let unemploymentData = `
        <h4>Country : ${item.country}<h4>
        <hr>
        <h5>Unemployment Rate : ${item.unemployment_rate}%
        `
        d3.select('#unemployment-info').html(unemploymentData);
      }
    });
  });
}

// Choose Color
function chooseColor(geocountry) 
{
  let total = colorLookUp[geocountry]
  if (total > 12) {
    return "Violet";
  }
  else if (total > 10) {
    return "Indigo";
  }
  else if (total > 8) {
    return "Blue";
  }
  else if (total > 6) {
    return "Green";
  }
  else if (total > 4) {
    return "Yellow";
  }
  else if (total > 2) {
    return "Orange";
  }
  else if (total > 0) {
    return "Red";
  }
  else if (total == 0) {
    return "DarkGrey";
  }
  else {
    return "Black";
  }
}


// Option Changer
function optionChanged(currentCountry) 
{
  // console.log(`Option Changed: ${currentCountry}`);
  ShowCountryData(currentCountry);
  ShowUnemploymentData(currentCountry);
}

// Dropdown
function InitDashboard(currentCountry) 
{

  let selector = d3.select("#selDataset");

  d3.json(url).then(function(data) {
    // console.log(data);

    for (let i = 0;i < data.length; i++){
      
      let country = data[i].country;
      // console.log(country);
      selector.append("option").text(country).property("value", country);
    };

    let intialCountry = selector.property("value");
    // console.log(intialCountry);
    ShowCountryData(intialCountry);
    ShowUnemploymentData(intialCountry);
  });
}

InitDashboard()