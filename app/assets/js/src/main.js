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

    //$('#modal').modal()
});
