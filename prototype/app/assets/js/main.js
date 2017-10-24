var map = L.map('map', {
  center: [40.000, -75.1639],
  zoom: 12
});
var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


$(document).ready(function() {
  /*
   * Mobile sidebar toggle
   */
  $('#sidebar-toggle').on('click', function(el) {
    el.preventDefault();

    $('.sidebar').toggleClass('active');
  });


  /*
   * MSA graduated symbol map
   */


  // Remove objects with an NA value for a particular key
  function removeNAs(geoJson, field) {
    geoJson.features = _.filter(geoJson.features, function(d) {
      return d.properties[field] != "NA";
    });
    return geoJson;
  }


    // temp (sample inputs to be replaced by input from jquery)
  var valueField = "upt_total";
  var msaMap = new cartoSql('msaMap');


  // this shoud be updated according to the 
  msaMap.getJson(valueField).done(function(data) {
    data = removeNAs(data, valueField);
    featureGroup = L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
          /* 
           * TODO: function to scale values
           * TODO: timeseries stylesheet interferes with 
           *  graduated symbols, fix this
           */
          radius: feature.properties[valueField] / 1000000,
          fillOpacity: 0.5,
          color: "#0000FF"
        });
      },
    });
    map.addLayer(featureGroup);
  });



  /*
   * Time series
   */

  // temp (sample inputs to be replaced by input from jquery)
  var tsVal = "average_speed";
  var tsMsa = "Boston-Cambridge-Newton, MA-NH";


  var timeSeriesSql = new cartoSql("timeSeries");
  tsChart = new timeSeriesObj("#timeSeries");


  timeSeriesSql.getJson(tsVal, tsMsa).done(function(data) {
    tsChart.plot(data, tsVal);
  })



  /*
   * Selectize
   */
  $('.selectize').selectize({
    create: true,
    sortField: 'text'
  });



  //$('#modal').modal()
});
var tsChart;