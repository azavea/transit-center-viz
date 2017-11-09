// The second chart on the page
TCVIZ.Charts.Change = function(elementId) {

    this.update = function(chartTitle, datasets) {
        var self = this;
        _.each(datasets, function(data, index) {
            delete data.label;
            _.extend(data, self.datasets[index]);
            // chart data received as values between 0-1, map to 0-100
            data.data = _.map(data.data, function(d) { return d * 100; });
        });
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{

                        ticks: {
                            callback: TCVIZ.Charts.Formatters.number
                        }
                    }]
                },
                title: {
                    display: true,
                    text: chartTitle
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += TCVIZ.Charts.Formatters.percent(tooltipItem.yLabel);
                            return label;
                        }
                    }
                }
            }
        });
    };

    this.labels = _.range(2010, 2016);
    this.yLeftDefaults = {
        fill: false
    };
    this.datasets = [_.extend({}, this.yLeftDefaults, {
        label: 'Population Change (%)',
        borderColor: '#bd33f0'
    }), _.extend({}, this.yLeftDefaults, {
        label: 'Rail Ridership Change (%)',
        borderColor: '#f0bd33'
    }), _.extend({}, this.yLeftDefaults, {
        label: 'Bus Ridership Change (%)',
        borderColor: '#65f033'
    })];

    this.ctx = document.getElementById(elementId).getContext('2d');
    this.chart = null;
};
