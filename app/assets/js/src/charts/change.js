// The second chart on the page
TCVIZ.Charts.Change = function(elementId, config) {

    this.setOptions = function(options) {
        if (!options) {
            options = {};
        }
        this.options = _.extend({}, this.defaults, options);
    };

    this.update = function(datasets) {
        var self = this;
        _.each(datasets, function(data, index) {
            // chart data received as values between 0-1, map to 0-100
            data.data = _.map(data.data, function(d) { return d * 100; });
            _.extend(self.chart.data.datasets[index], data);
        });
        this.chart.update();
    };

    this.defaults = {};
    this.labels = _.range(2010, 2016);
    this.yLeftDefaults = {
        fill: false
    };
    this.datasets = [_.extend({}, this.yLeftDefaults, {
        borderColor: 'red'
    }), _.extend({}, this.yLeftDefaults, {
        borderColor: 'blue'
    }), _.extend({}, this.yLeftDefaults, {
        borderColor: 'green'
    })];
    this.setOptions(config);

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
            labels: this.labels,
            datasets: this.datasets
        },
        options: this.options
    });
};
