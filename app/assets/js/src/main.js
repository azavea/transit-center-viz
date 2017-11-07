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
    var layerToggle = null;
    var msaToggle = null;
    var featureGroup = {};
    var nationWide = isNationWide();

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
    $('#MSA_toggle')[0].selectize.on('change', function() {
        setTimeSeries();
        setMap();
    });
    map.on('zoomstart', onZoomStart);
    map.on('zoomend', onZoomEnd);

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
     * Get breaks of a variable
     * @param  {GeoJSON} featureGroup Returned from SQL query
     * @param  {string}  variable     Variable being mapped
     * @return {array}                An array of quintile breaks for this variable              
     */
    function getQuintiles(featureGroup, variable) {
        var varArray = _.map(featureGroup.features,
            function(x) {
                return x.properties[variable];
            });
        var theLimits = chroma.limits(varArray, 'q', 5);
        return theLimits;
    }

    /**
     * Find which quintile bucket a value falls into
     * @param  {object} feature  One object in featuregroug
     * @param  {string} variable Variable being mapped
     * @param  {array}  limits   Array of quintile breaks in cont. var
     * @return {integer}         Integer 0-4 bucket that the value falls into
     */
    function getBucket(feature, variable, limits) {
        var v = feature.properties[variable];
        for (var i = limits.length; i > 0; i--) {
            if (v <= limits[i] && v > limits[i - 1]) {
                return i - 1;
            }
        }
    }

    /**
     * Style graduated symbols based on selected variables
     * TODO: currently this is not implemented, was not working
     * @param  {objext} feature  An individual msa
     * @param  {string} variable The variable being mapped
     * @param  {array}  limits   An array of quintile breaks for this variable
     * @return {object}          An object with style parameters
     */
    // function styleCircles(feature, variable, limits) {
    //     return {
    //         radius: TCVIZ.Config.symbol_sizes[getBucket(feature, variable, limits)],
    //         fillOpacity: 0.5,
    //         color: '#0000FF'
    //     };
    // }

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
            layerToggle.addOption(TCVIZ.Config.nationwide_layers);
        }

        function populateMSADropdown() {
            msaToggle.addOption(TCVIZ.Config.MSA_list);
        }

        function setDefaultMSADropdownValue() {
            // TODO: default to national average
            msaToggle.setValue(TCVIZ.Config.defaultMSA);
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
            // Init these vars here after the selectize object is created
            layerToggle = $('#toggle')[0].selectize;
            msaToggle = $('#MSA_toggle')[0].selectize;
        }

        function setUpSidebarToggle() {
            $('#sidebar-toggle').on('click', function(el) {
                el.preventDefault();
                $('.sidebar').toggleClass('active');
            });
        }
    }

    /**
     * Get MSA text
     * @param  {[type]}
     * @return {[type]}
     */
    function msaValToName(msaVal) {
        return msaToggle.options[msaVal].text;
    }

    /**
     * React to start of change in zoom level, set state boolean
     * variable indicating whether the zoom started above or below 
     * the zoom threshold
     */
    function onZoomStart() {
        TCVIZ.State.startNationWide = isNationWide();
    }

    /**
     * React to end zoom level, changing the map content if threshold was
     * passed
     */
    function onZoomEnd() {
        nationWide = isNationWide();
        if (TCVIZ.State.startNationWide !== nationWide) {
            if (nationWide) {
                changeToggle(layerToggle, TCVIZ.Config.nationwide_layers);
                setMapDropdownValue();
                TCVIZ.State.ntdField = layerToggle.items[0];
            } else {
                changeToggle(layerToggle, TCVIZ.Config.MSA_layers);
                setMapDropdownValue();
                TCVIZ.State.censusField = layerToggle.items[0];
            }
        }
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

    /*
    Note: I think that these polygons and the graduated symbols are
    both not filled with color because of some css that I included
    to style the time series chart 
     */

    /**
     * Set polygon layer of MSAs
     */
    function setMSAGeoJSONLayer() {
        var valueField = layerToggle.items[0];
        var msa = msaToggle.items[0];
        msa = msaValToName(msa);
        if (valueField !== undefined) {
            if (map.hasLayer(featureGroup)) {
                map.removeLayer(featureGroup);
            }
            TCVIZ.State.censusField = valueField;
            TCVIZ.Connections.tractMap.getJson(valueField, msa)
                .done(function(data) {
                    data = removeNAs(data, valueField);
                    featureGroup = L.geoJson(data, {
                        // TODO style geojson layer
                        color: '#000FFF',
                        stroke: false,
                        weight: 1,
                        fillOpacity: 0.75
                    });
                    map.addLayer(featureGroup);
                });
        }
    }

    /**
     * Set a nationwide point layer
     */
    function setNationalGeoJSONLayer() {
        var valueField = layerToggle.items[0];
        if (valueField !== undefined) {
            if (map.hasLayer(featureGroup)) {
                map.removeLayer(featureGroup);
            }
            TCVIZ.State.ntdField = valueField;
            TCVIZ.Connections.msaMap.getJson(valueField)
                .done(function(data) {
                    data = removeNAs(data, valueField);
                    var limits = getQuintiles(data, valueField);
                    featureGroup = L.geoJson(data, {
                        pointToLayer: function(feature, latlng) {
                            return new L.CircleMarker(latlng, {
                                radius: TCVIZ.Config.symbol_sizes[getBucket(feature, valueField, limits)],
                                fillOpacity: 0.5,
                                color: '#0000FF'
                            });
                        }
                    });
                    map.addLayer(featureGroup);
                });
        }
    }

    /**
     * Set time series plot based on selectize input
     */
    function setTimeSeries() {
        // TODO: more succinct way to do this?
        var msaField = msaValToName(msaToggle.items[0]);
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
        nationWide = isNationWide();
        if (nationWide) {
            if (TCVIZ.State.ntdField !== undefined) {
                layerToggle.setValue(TCVIZ.State.ntdField);
            } else {
                layerToggle.setValue(TCVIZ.Config.defaultNtdField);
            }
        } else {
            if (TCVIZ.State.censusField !== undefined) {
                layerToggle.setValue(TCVIZ.State.censusField);
            } else {
                layerToggle.setValue(TCVIZ.Config.defaultCensusField);
            }
        }
    }
});