/* global L */

// TODO: should these be in a config file?
var map = L.map('map', {
    center: [39.500, -98.35],
    zoom: 4
});

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
}).addTo(map);

$(document).ready(function() {

    /*
     Initialize objects
     */
    // Carto connections
    TCVIZ.Connections.msaMap = new TCVIZ.Carto.SQL('msaMap');
    TCVIZ.Connections.timeSeriesSql = new TCVIZ.Carto.SQL('timeSeries');
    TCVIZ.Connections.tractMap = new TCVIZ.Carto.SQL('censusTracts');

    // Time Series plot
    TCVIZ.State.timeseries = new TCVIZ.Charts.TimeSeries();

    /*
    Initialize
     */
    initialize();

    /*
    Listeners
     */
    $('#toggle')[0].selectize.on('change', function() {
        setMap();
        setTimeSeries();
    });
    $('#MSA_toggle')[0].selectize.on('change', setTimeSeries);
    map.on('zoomstart', onZoomChange);

    /*
    Functions--------------------------------------------------------------
     */

    /**
     * Change layer selector options when zoom level changes
     * @param  {Selector}
     * @param  {Array}
     */
    function changeToggle(select, layer_options) {
        select.clear();
        select.clearOptions();
        select.addOption(layer_options);
    }


    /**
     * Determine whether the app is zoomed out beyond nationwide
     * mapping threshhold
     * @return {Boolean}
     */
    function isNationWide() {
        return (map.getZoom() <= TCVIZ.Config.zoomThreshold);
    }

    /**
     * Initialize app
     */
    function initialize() {

        /**
         * All initialize functions
         */
        setUpEventListeners();
        initializeDropdowns();
        setMap();
        setTimeSeries();

        function initializeDropdowns() {
            populateMapDropdown();
            populateMSADropdown();
            setMapDropdownValue();
            setDefaultMSADropdownValue();
        }

        function populateMapDropdown() {
            $('#toggle')[0].selectize
                .addOption(TCVIZ.Config.nationwide_layers);
        }

        function populateMSADropdown() {
            $('#MSA_toggle')[0].selectize.addOption(TCVIZ.Config.MSA_list);
        }

        function setDefaultMSADropdownValue() {
            // TODO: what will the default value for MSA dropdown be?
            $('#MSA_toggle')[0].selectize.setValue(TCVIZ.Config.defaultMSA);
        }

        function setUpEventListeners() {
            setUpSidebarToggle();
            setUpSelectize();
        }

        function setUpSelectize() {
            $('.selectize').selectize({
                create: true,
                sortField: 'text'
            });
        }

        function setUpSidebarToggle() {
            $('#sidebar-toggle').on('click', function(el) {
                el.preventDefault();
                $('.sidebar').toggleClass('active');
            });
        }
    }

    /**
     * Get the layer toggle object
     * @return {Selector}
     */
    function layerToggle() {
        return $('#toggle')[0].selectize;
    }

    /**
     * Get the string associated with selected variable
     * @return {String}
     */
    function layerToggleValue() {
        return layerToggle().items[0];
    }

    /**
     * 
     * @param  {[type]}
     * @return {[type]}
     */
    function msaValToName(msaVal) {
        return $('#MSA_toggle')[0].selectize.options[msaVal].text;
    }

    /**
     * React to change in zoom level, changing map if user crosses threshold
     * @return {[type]}
     */
    function onZoomChange() {
        var startNationWide = isNationWide();
        // move this ^ out to it's own
        map.on('zoomend', function() {
            if (startNationWide !== isNationWide()) {
                if (isNationWide()) {
                    changeToggle(layerToggle(), TCVIZ.Config.nationwide_layers);
                    setMapDropdownValue();
                    TCVIZ.State.ntdField = layerToggleValue();
                } else {
                    changeToggle(layerToggle(), TCVIZ.Config.MSA_layers);
                    setMapDropdownValue();
                    TCVIZ.State.censusField = layerToggleValue();
                }
            }
        });
    }

    /** 
     * Remove objects with an NA value for a particular key
     * @param  {GeoJSON}
     * @param  {String}
     * @return {GeoJSON}
     */
    function removeNAs(geoJson, field) {
        geoJson.features = _.filter(geoJson.features, function(d) {
            return d.properties[field] != 'NA';
        });
        return geoJson;
    }

    /**
     * Send a layer to the map calling function based on map zoom
     */
    function setMap() {
        if (isNationWide()) {
            setNationalGeoJSONLayer();
        } else {
            setMSAGeoJSONLayer();
        }
    }

    /**
     * Set polygon layer of MSAs
     */
    function setMSAGeoJSONLayer() {
        var valueField = layerToggleValue();
        if (valueField !== undefined) {
            if (map.hasLayer(TCVIZ.State.featureGroup)) {
                map.removeLayer(TCVIZ.State.featureGroup);
            }
            TCVIZ.State.censusField = valueField;
            // TCVIZ.Connections.tractMap.getJson()
            //     .done(function(data) {
            // // TODO: add the rest of this function once census data are up
            //     });
        }
    }

    /**
     * Set a nationwide point layer
     */
    function setNationalGeoJSONLayer() {
        var valueField = $('#toggle')[0].selectize.items[0];
        if (valueField !== undefined) {
            if (map.hasLayer(TCVIZ.State.featureGroup)) {
                map.removeLayer(TCVIZ.State.featureGroup);
            }
            TCVIZ.State.ntdField = valueField;
            TCVIZ.Connections.msaMap.getJson(valueField)
                .done(function(data) {
                    data = removeNAs(data, valueField);
                    TCVIZ.State.featureGroup = L.geoJson(data, {
                        pointToLayer: function(feature, latlng) {
                            return new L.CircleMarker(latlng, {
                                // * TODO: function to scale values
                                // * TODO: timeseries stylesheet interferes with
                                // *  graduated symbols, fix this
                                radius: feature.properties[valueField] / 1000000,
                                fillOpacity: 0.5,
                                color: '#0000FF'
                            });
                        }
                    });
                    map.addLayer(TCVIZ.State.featureGroup);
                });
        }
    }

    function setTimeSeries() {
        // TODO: more succinct way to do this?
        var msaField = msaValToName($('#MSA_toggle')[0].selectize.items[0]);
        // For the time being I will use the TCVIS.Config.ntdField var
        // since the census data are not in the time series dataset yet
        // TODO: connect this to the map var toggle 
        if (msaField !== undefined && TCVIZ.State.ntdField !== null) {
            TCVIZ.Connections.timeSeriesSql
                .getJson(TCVIZ.State.ntdField, msaField)
                .done(function(data) {
                    // TODO: Remove chart elements before adding more
                    TCVIZ.State.timeseries.clear();
                    TCVIZ.State.timeseries.plot(data, TCVIZ.State.ntdField);
                });
        }
    }

    /**
     * Set the default/stored map variable value for the current 
     * zoom level
     */
    function setMapDropdownValue() {
        if (isNationWide()) {
            if (TCVIZ.State.ntdField !== undefined) {
                $('#toggle')[0].selectize.setValue(TCVIZ.State.ntdField);
            } else {
                $('#toggle')[0].selectize.setValue(TCVIZ.Config.defaultNtdField);
            }

        } else {
            if (TCVIZ.State.censusField !== undefined) {
                $('#toggle')[0].selectize.setValue(TCVIZ.State.censusField);
            } else {
                $('#toggle')[0].selectize.setValue(TCVIZ.Config.defaultCensusField);
            }
        }
    }

});