TCVIZ.Carto.ChartSQL = function(table, sqlConfig) {

    this.client = new cartodb.SQL(sqlConfig);
    this.table = table;
    this.years = _.range(2006, 2016);

    this.getJson = function(valueField, msa) {
        var sql = this.getSql(valueField, msa);
        return this.geojsonClient.execute(sql);
    };

    // Get data for any pair of transit variables
    this.getTransitData = function(msaId, metricOne, metricTwo) {
        var sql = 'SELECT year, {{metricOne}}, {{metricTwo}} FROM {{table}} WHERE name_msa = \'{{msaId}}\'';
        var params = {
            metricOne: metricOne,
            metricTwo: metricTwo,
            msaId: msaId,
            table: this.table
        };
        return this.client.execute(sql, params, {format: 'json'});
    };

    // Map data from Carto SQL response to Chart.js "datasets"
    this.transformTransitData = function (data, metricOne, metricTwo) {
        var dataByYear = {};
        _.each(data.rows, function (row) {
            dataByYear[row.year] = {};
            dataByYear[row.year][metricOne] = row[metricOne];
            dataByYear[row.year][metricTwo] = row[metricTwo];
        });
        var chartDatasets = [{
            label: this.getLabelForMetric(metricOne),
            data: mapDataByYear(dataByYear, this.years, metricOne)
        }, {
            label: this.getLabelForMetric(metricTwo),
            data: mapDataByYear(dataByYear, this.years, metricTwo)
        }];
        return chartDatasets;

        function mapDataByYear(dataByYear, years, metric) {
            return _.map(years, function (year) {
                if (dataByYear[year] && dataByYear[year][metric]) {
                    var val = parseFloat(dataByYear[year][metric]);
                    return isNaN(val) ? null : val;
                } else {
                    return null;
                }
            });
        }
    };

    this.getLabelForMetric = function(metric) {
        // TODO: Move to config?
        var labels = {
            'pop_dens': 'Population Density',
            'total_expenses': 'Total Expenses',
            'upt_total': 'Total Ridership'
        };
        var label = labels[metric] || metric;
        if (label === metric) {
            console.warn('No label for metric: ', metric, 'Add new label in sql-charts.js');
        }
        return label;
    }
};
