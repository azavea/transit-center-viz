// functions
function initialize() {
  app = {
    apikey: "2ff8aa5a85798053a1b951eeee2a8375b58b4c03",
    map: L.map('map', {
      center: [39.7796999, -86.2731762],
      zoom: 5
    }),
  };
}

function addTiles() {
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(app.map);
}

function getQuery() {
  $.getJSON('https://ridership.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM msas&api_key=2ff8aa5a85798053a1b951eeee2a8375b58b4c03', function(data) {
    featureGroup = L.geoJson(data);
    app.map.addLayer(featureGroup);
  });
}

function main() {
  // add map tiles
  initialize();
  addTiles();
  getQuery();
}

// run
main();
