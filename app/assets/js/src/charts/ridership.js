// The first chart on the page
TCVIZ.Charts.Ridership = function(elementId) {

    this.update = function(datasets) {
        datasets[0] = _.extend({}, this.yLeftDefaults, datasets[0]);
        var scales = [this.yScaleLeft];
        if (datasets.length > 1) {
            datasets[1] = _.extend({}, this.yRightDefaults, datasets[1]);
            scales.push(this.yScaleRight);
        }
        if (!this.chart || this.chart.options.scales.yAxes.length !== datasets.length) {
            this.chart = this._createChart({
                options: {
                    layout: {
                        padding: {
                            left: 5,
                            right: 5
                        }
                    },
                    scales: {
                        yAxes: scales
                    }
                }
            });
        }
        this.chart.data.datasets = datasets;
        this.chart.update();
    };

    this._createChart = function (chartConfig) {
        return new Chart(this.ctx, _.extend({}, this.chartConfig, chartConfig));
    };

    this.yScaleLeft = {
        position: 'left',
        'id': 'y-axis-left'
    };
    this.yScaleRight = {
        position: 'right',
        'id': 'y-axis-right'
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

    this.chartConfig = {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: []
        }
    };

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = null;
};
