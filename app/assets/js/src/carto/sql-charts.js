TCVIZ.Carto.ChartSQL = function(table, sqlConfig) {

    this.client = new cartodb.SQL(sqlConfig);
    this.table = table;
    this.years = _.range(2006, 2016);

    this.getJson = function(valueField, msa) {
        var sql = this.getSql(valueField, msa);
        return this.geojsonClient.execute(sql);
    };

    // Get data for any transit variable
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

    this.transformTransitData = function (data, metricOne, metricTwo) {
        var dataByYear = {};
        _.each(data.rows, function (row) {
            dataByYear[row.year] = {};
            dataByYear[row.year][metricOne] = row[metricOne];
            dataByYear[row.year][metricTwo] = row[metricTwo];
        });
        var chartDatasets = [{
            label: metricOne,
            data: mapDataByYear(dataByYear, this.years, metricOne)
        }, {
            label: metricTwo,
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
    }
};
