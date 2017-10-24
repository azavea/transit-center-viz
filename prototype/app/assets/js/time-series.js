function timeSeriesChart() {

    /*
     * TODO: add all chart elements
     *  - axis labels
     *  - title
     *  - etc.
     */

    this.margin = {
        top: 30,
        right: 100,
        bottom: 30,
        left: 100
    };

    this.width = 600 - this.margin.left - this.margin.right;
    this.height = 270 - this.margin.top - this.margin.bottom;

    this.x = d3.time.scale().range([0, this.width]);
    this.yL = d3.scale.linear().range([this.height, 0]);
    this.yR = d3.scale.linear().range([this.height, 0]);

    this.xAxis = d3.svg.axis().scale(this.x)
        .orient("bottom").ticks(5);

    this.yAxisLeft = d3.svg.axis().scale(this.yL)
        .orient("left").ticks(5);

    this.yAxisRight = d3.svg.axis().scale(this.yR)
        .orient("right").ticks(5);

    this.svg = d3.select("#timeSeries")
        .append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.setData = function(data, field) {
        data = d3.selectAll(data.features);

        data = _.map(data[0], function(a) {
            return a.properties
        })

        data.forEach(function(d) {
            d.year = d3.time.format("%Y").parse(String(d.year));
            d.upt_total = +d.upt_total;
            d[field] = +d[field];
        });

        data = _.sortBy(data, function(d) {
            return d.year
        })

        this.field = field;
        this.data = data;
    }

    this.setLines = function() {
        this.valueline = d3.svg.line()
            .x(function(d) {
                return this.x(d.year);
            })
            .y(function(d) {
                return this.yL(d.upt_total);
            });

        this.valueline2 = d3.svg.line()
            .x(function(d) {
                return this.x(d.year);
            })
            .y(function(d) {
                return this.yR(d[this.field]);
            });
    }

    this.setExtents = function(field) {
        // Scale the range of the data
        this.x.domain(d3.extent(this.data, function(d) {
            return d.year;
        }));
        this.yL.domain([0, d3.max(this.data, function(d) {
            return Math.max(d.upt_total);
        })]);
        this.yR.domain([0, d3.max(this.data, function(d) {
            //return Math.max(d[this.field]);
            /*
             * For some reason it's throwing me an error when 
             * I try to use the 'field' property. Parameterizing
             * second value field was a workaround.
             */
            return Math.max(d[field]);
        })]);
    }

    this.plot = function(data, field) {

        this.setData(data, field);
        this.setLines();
        this.setExtents(field);

        this.svg.append("path") // Add the valueline path.
            .attr("d", this.valueline(this.data));

        this.svg.append("path") // Add the valueline2 path.
            .style("stroke", "red")
            .attr("d", this.valueline2(this.data));

        this.svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .style("fill", "steelblue")
            .call(this.yAxisLeft);

        this.svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + this.width + " ,0)")
            .style("fill", "red")
            .call(this.yAxisRight);
    }
}