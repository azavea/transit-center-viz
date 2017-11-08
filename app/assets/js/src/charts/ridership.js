// The first chart on the page
TCVIZ.Charts.Ridership = function(elementId, config) {

    this.setOptions = function(options) {
        if (!options) {
            options = {};
        }
        this.options = _.extend({}, this.defaults, options);
    };

    this.update = function(yAxisLeft, yAxisRight) {
        var datasets = [_.extend({}, this.yLeftDefaults, yAxisLeft)];
        if (yAxisRight) {
            datasets.push(_.extend({}, this.yRightDefaults, yAxisRight));
        }
        if (!this.chart) {
            this.chart = new Chart(this.ctx, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: datasets
                },
                options: this.options
            });
        } else {
            this.chart.data.datasets = datasets;
            this.chart.update();
        }
    };

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
    this.labels = _.range(2006, 2016);
    this.yLeftDefaults = {
        borderColor: '#3165f0',
        fill: false,
        yAxisID: 'y-axis-left'
    };
    this.yRightDefaults = {
        borderColor: '#f03365',
        fill: false,
        yAxisID: 'y-axis-right'
    };

    this.setOptions(config);

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = null;
};
