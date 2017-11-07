TCVIZ.Charts.TimeSeries = function(elementId, config) {

    this.defaults = {
        scales: {
            yAxes: [{
                position: 'left',
                'id': 'y-axis-left'
            }, {
                position: 'right',
                'id': 'y-axis-right'
            }]
        }
    };
    this.yLeftDefaults = {
        borderColor: 'red',
        fill: false,
        yAxisID: 'y-axis-left'
    };
    this.yRightDefaults = {
        borderColor: 'blue',
        fill: false,
        yAxisID: 'y-axis-right'
    }

    this.setOptions = function(options) {
        if (!options) {
            options = {};
        }
        this.options = _.extend({}, this.defaults, options);
    };

    this.update = function(labels, yAxisLeft, yAxisRight) {
        var datasets = [_.extend({}, this.yLeftDefaults, yAxisLeft)];
        if (yAxisRight) {
            datasets.push(_.extend({}, this.yRightDefaults, yAxisRight));
        }
        if (!this.chart) {
            this.chart = new Chart(this.ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: this.options
            });
        } else {
            this.chart.data.labels = labels;
            this.chart.data.datasets = datasets;
            this.chart.update();
        }
    };

    this.setOptions(config);

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = null;
};
