// Bars.js

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
var ApiService = require("../../services/Api").default;
var Api = new ApiService();

export default class Bars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {},
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value === this.props.value) {
      return;
    }
    //Ajax calls here
    const action = "observations/histogram";
    const query = "";
    const taxon_id = this.props.value[0].taxon_id;
    const per_page = "31";
    const date_field = "observed";
    const interval = "day";
    let month = this.props.monthValue;
    let year = this.props.yearValue;

    const url = `${action}?&q=${query}&taxon_id=${taxon_id}&date_field=${date_field}&page=2&interval=${interval}&month=${month}&year=${year}&per_page=${per_page}`;
    Api.get(url).then(data => {
      const observation = data.results.day;

      var labels = Object.keys(observation).map((e) => parseInt(e.slice(-2)));
      var values = Object.keys(observation).map((e) => observation[e]);

      let m = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      let name = m[this.props.monthValue - 1];

      this.setState({
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Number of sightings",
              data: values,
              backgroundColor: "rgb(77,175,165)"
            }
          ]
        },
        monthName: name,
        yearNumber: this.props.yearValue
      });
    });
  }

  render() {
    if (Object.keys(this.state.chartData).length > 0) {
    return (
      <div>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: 'Number of sightings',
              // text: `${this.state.monthName} ${this.state.yearNumber}`,
              fontSize: 25,
              fontFamily: "'Open Sans', 'sans serif'"
            },
            legend: {
              display: false,
              position: "top"
            },
            maintainAspectRatio: true,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    );
  }
  }
}
