/* global L */

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

    /**
     * Set a nationwide point layer
     */
    function setNationalGeoJSONLayer() {
        var valueField = $('#toggle')[0].selectize.items[0];
        if (valueField !== undefined) {
            if (map.hasLayer(TCVIZ.Config.featureGroup)) {
                map.removeLayer(TCVIZ.Config.featureGroup);
            }
            TCVIZ.Config.ntdField = valueField;
            TCVIZ.Config.sqlConnections.msaMap.getJson(valueField)
                .done(function(data) {
                    data = removeNAs(data, valueField);
                    TCVIZ.Config.featureGroup = L.geoJson(data, {
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
                    map.addLayer(TCVIZ.Config.featureGroup);
                });
        }
    }

    /**
     * Set polygon layer of MSAs
     */
    function setMSAGeoJSONLayer() {
        var valueField = layerToggleValue();
        if (valueField !== undefined) {
            if (map.hasLayer(TCVIZ.Config.featureGroup)) {
                map.removeLayer(TCVIZ.Config.featureGroup);
            }
            TCVIZ.Config.censusField = valueField;
            // TCVIZ.Config.sqlConnections.tractMap.getJson()
            //     .done(function(data) {
            // // TODO: add the rest of this function once census data are up
            //     });
        }
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


    function setTimeSeries() {
        // TODO: more succinct way to do this?
        var msaField = msaValToName($('#MSA_toggle')[0].selectize.items[0]);
        // For the time being I will use the TCVIS.Config.ntdField var
        // since the census data are not in the time series dataset yet
        // TODO: connect this to the map var toggle 
        if (msaField !== undefined && TCVIZ.Config.ntdField) {
            TCVIZ.Config.sqlConnections.timeSeriesSql
                .getJson(TCVIZ.Config.ntdField, msaField)
                .done(function(data) {
                    // TODO: Remove chart elements before adding more
                    TCVIZ.Config.timeSeries.clear();
                    TCVIZ.Config.timeSeries.plot(data, TCVIZ.Config.ntdField);
                });
        }
    }


    /**
     * React to change in zoom level, changing map if user crosses threshold
     * @return {[type]}
     */
    function onZoomChange() {
        var startNationWide = isNationWide();
        map.on('zoomend', function() {
            if (startNationWide !== isNationWide()) {
                if (isNationWide()) {
                    changeToggle(layerToggle(), TCVIZ.Config.nationwide_layers);
                    setDefaultMapDropdownValue();
                    TCVIZ.Config.ntdField = layerToggleValue();
                } else {
                    changeToggle(layerToggle(), TCVIZ.Config.MSA_layers);
                    setDefaultMapDropdownValue();
                    TCVIZ.Config.censusField = layerToggleValue();
                }
            }
        });
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
     * Determine whether the app is zoomed out beyond nationwide
     * mapping threshhold
     * @return {Boolean}
     */
    function isNationWide() {
        return (map.getZoom() <= TCVIZ.Config.zoomThreshold);
    }

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
     * Set the default/stored map variable value for the current 
     * zoom level
     */
    function setDefaultMapDropdownValue() {
        if (isNationWide()) {
            $('#toggle')[0].selectize.setValue(TCVIZ.Config.ntdField);
        } else {
            $('#toggle')[0].selectize.setValue(TCVIZ.Config.censusField);
        }
    }

    /**
     * Initialize app
     */
    function initialize() {

        /*
        Event listeners
         */

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

        function setUpEventListeners() {
            setUpSidebarToggle();
            setUpSelectize();
        }

        /*
        Dropdowns
         */
        function populateMapDropdown() {
            $('#toggle')[0].selectize
                .addOption(TCVIZ.Config.nationwide_layers);
        }

        function populateMSADropdown() {
            $('#MSA_toggle')[0].selectize.addOption(TCVIZ.Config.MSA_list);
        }

        function setDefaultMSADropdownValue() {
            // TODO: what will the default value for MSA dropdown be?
            $('#MSA_toggle')[0].selectize.setValue(TCVIZ.Config.currentMSA);
        }

        function initializeDropdowns() {
            populateMapDropdown();
            populateMSADropdown();
            setDefaultMapDropdownValue();
            setDefaultMSADropdownValue();
        }

        /**
         * All initialize functions
         */
        setUpEventListeners();
        initializeDropdowns();
        setMap();
        setTimeSeries();
    }

    /*
     Initialize objects
     TODO: Should these live somehere else?
     */
    // Carto connections
    TCVIZ.Config.sqlConnections.msaMap = new TCVIZ.Carto.SQL('msaMap');
    TCVIZ.Config.sqlConnections.timeSeriesSql = new TCVIZ.Carto.SQL('timeSeries');
    TCVIZ.Config.sqlConnections.tractMap = new TCVIZ.Carto.SQL('censusTracts');

    // Time Series plot
    TCVIZ.Config.timeSeries = new TCVIZ.Charts.TimeSeries();

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
});