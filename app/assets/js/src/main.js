/* global L */

var map = L.map('map', {
    center: [40.000, -75.1639],
    zoom: 12
});

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}).addTo(map);

//function to change layer selector options when zoom level changes
var changeToggle = function (select, layer_options){
    select.clear();
    select.clearOptions();
    select.addOption(layer_options);
};

$(document).ready(function () {
    /*
    * Mobile sidebar toggle
    */
    $('#sidebar-toggle').on('click', function (el) {
        el.preventDefault();

        $('.sidebar').toggleClass('active');
    });

    /*
    * Selectize
    */
    $('.selectize').selectize({
        create: true,
        sortField: 'text'
    });

    //initial option of nationwide layers in layer selector
    var layerToggle = $('#toggle')[0].selectize;
    layerToggle.addOption(TCVIZ.Config.nationwide_layers);

    //populate list of MSAs in dropdown
    $('#MSA_toggle')[0].selectize.addOption(TCVIZ.Config.MSA_list);

    // change layer selector options based on zoom level of the map
    map.on('zoomend', function () {
        if (map.getZoom() > TCVIZ.Config.zoomThreshold) {
            changeToggle(layerToggle, TCVIZ.Config.MSA_layers);
        }
        if (map.getZoom() <= TCVIZ.Config.zoomThreshold) {
            changeToggle(layerToggle, TCVIZ.Config.nationwide_layers);
        }
    });

    // MSA graduated symbol map

    // Remove objects with an NA value for a particular key
    function removeNAs(geoJson, field) {
        geoJson.features = _.filter(geoJson.features, function(d) {
            return d.properties[field] != 'NA';
        });
        return geoJson;
    }

    // temp (sample inputs to be replaced by input from jquery)
    var valueField = 'upt_total';
    var msaMap = new TCVIZ.Carto.SQL('msaMap');

    // this shoud be updated according to the
    msaMap.getJson(valueField).done(function(data) {
        var featureGroup = L.geoJson(removeNAs(data, valueField), {
            pointToLayer: function(feature, latlng) {
                return new L.CircleMarker(latlng, {
                    /*
                    * TODO: function to scale values
                    * TODO: timeseries stylesheet interferes with
                    *  graduated symbols, fix this
                    */
                    radius: feature.properties[valueField] / 1000000,
                    fillOpacity: 0.5,
                    color: '#0000FF'
                });
            }
        });
        map.addLayer(featureGroup);
    });

    // TIME SERIES

    // temp (sample inputs to be replaced by input from jquery)
    var tsVal = 'average_speed';
    var tsMsa = 'Boston-Cambridge-Newton, MA-NH';
    var timeSeriesSql = new TCVIZ.Carto.SQL('timeSeries');
    var tsChart = new TCVIZ.Charts.TimeSeries();

    timeSeriesSql.getJson(tsVal, tsMsa).done(function(data) {
        tsChart.plot(data, tsVal);
    });
});
