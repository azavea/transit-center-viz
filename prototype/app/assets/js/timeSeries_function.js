function plotTimeSeries(data, field) {


    // reformat json
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



    // chart prep
    var margin = {
        top: 30,
        right: 70,
        bottom: 30,
        left: 60
      },
      width = 600 - margin.left - margin.right,
      height = 270 - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);
    var y0 = d3.scale.linear().range([height, 0]);
    var y1 = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
      .orient("bottom").ticks(5);

    var yAxisLeft = d3.svg.axis().scale(y0)
      .orient("left").ticks(5);

    var yAxisRight = d3.svg.axis().scale(y1)
      .orient("right").ticks(5);

    var valueline = d3.svg.line()
      .x(function(d) {
        return x(d.year);
      })
      .y(function(d) {
        return y0(d.upt_total);
      });

    var valueline2 = d3.svg.line()
      .x(function(d) {
        return x(d.year);
      })
      .y(function(d) {
        return y1(d[field]);
      });

    var svg = d3.select("#timeSeries")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");



    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
      return d.year;
    }));
    y0.domain([0, d3.max(data, function(d) {
      return Math.max(d.upt_total);
    })]);
    y1.domain([0, d3.max(data, function(d) {
      return Math.max(d[field]);
    })]);

    svg.append("path") // Add the valueline path.
      .attr("d", valueline(data));

    svg.append("path") // Add the valueline2 path.
      .style("stroke", "red")
      .attr("d", valueline2(data));

    svg.append("g") // Add the X Axis
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .style("fill", "steelblue")
      .call(yAxisLeft);

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + " ,0)")
      .style("fill", "red")
      .call(yAxisRight);
}