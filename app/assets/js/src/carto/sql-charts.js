TCVIZ.Carto.ChartSQL = function(table, sqlConfig) {

    this.client = new cartodb.SQL(sqlConfig);
    this.table = table;
    this.years = _.range(2006, 2016);

    // Get data for any pair of transit variables
    this.getTransitData = function(msaId, metrics) {
        var sql = 'SELECT year, {{metrics}} FROM {{table}} WHERE name_msa = \'{{msaId}}\'';
        var params = {
            metrics: metrics.join(', '),
            msaId: msaId,
            table: this.table
        };
        return this.client.execute(sql, params, {format: 'json'});
    };

    // Map data from Carto SQL response to Chart.js "datasets"
    // data is raw data response from sql.execute()
    // metrics is array of metrics to use in chart, each one corresponding to a chart.js "dataset"
    // validYears is optional and is an array of years to filter the input sql data by
    this.transformTransitData = function (data, metrics, validYears) {
        var self = this;
        var dataByYear = {};
        if (!validYears) {
            validYears = this.years;
        }
        var rows = _.filter(data.rows, function (row) {
            return validYears.indexOf(row.year) >= 0;
        });
        _.each(rows, function (row) {
            dataByYear[row.year] = {};
            _.each(metrics, function(metric) {
                dataByYear[row.year][metric] = row[metric];
            });
        });
        return _.map(metrics, function (metric) {
            return {
                label: self.getLabelForMetric(metric),
                data: mapDataByYear(dataByYear, validYears, metric)
            };
        });

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
            'upt_total': 'Total Ridership',
            'upt_rail': 'Rail Ridership',
            'upt_bus': 'Bus Ridership'
        };
        var label = labels[metric] || metric;
        if (label === metric) {
            console.warn('No label for metric: ', metric, 'Add new label in sql-charts.js');
        }
        return label;
    }
};
