// ChartView.js

import React, { Component } from 'react'
import * as d3 from 'd3'

function chartview() {

  var dataArray = [20, 40, 50];
  var data = [10, 30, 60];
  var r = 300;

  var colour = d3.scaleOrdinal()
      .range(["lightgreen", "lightseagreen", "lightskyblue"]);

  var canvas = d3.select("body")
              .append("svg")
              .attr("width", 500)
              .attr("height", 500);

  var bars = canvas.selectAll("rect")
              .data(dataArray)
              .enter()
                .append("rect")
                .attr("width", function(d) { return d * 10; })
                .attr("height", 50)
                .attr("fill", function(d) { return colour(d.data); })
                .attr("y", function(d, i) { return i * 100; });

  var canvasdonut = d3.select("body")
                    .append("svg")
                    .attr("width", 1000)
                    .attr("height", 1000);

  var group = canvasdonut.append("g")
              .attr("transform", "translate(300,300)");

  var arc = d3.arc()
            .innerRadius(150)
            .outerRadius(r);

  var pie = d3.pie()
            .value(function (d) { return d; });

  var arcs = group.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

  arcs.append("path")
      .attr("d", arc)
      .attr("fill", function(d) { return colour(d.data); });

  arcs.append("text")
      .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("text-anchor", "middle")
      .attr("font-size", "1.5em")
      .text(function (d) {return d.data; });

  document.getElementById("button").disabled = true;

}

export default class ChartView extends Component {

    render() {
        return (
            <div>
                <h2>Chart View</h2>
                <p>Some nice charts will be here</p>
                <button id="button" onClick={chartview}>Click here</button>
            </div>
        )
    }
}
