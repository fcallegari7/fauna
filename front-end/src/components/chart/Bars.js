// Bars.js

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { compose, withState, withHandlers } from "recompose";
var ApiService = require("../../services/Api").default;
var Api = new ApiService();

export default class Bars extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
    };
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    //Ajax calls here
    const action = "observations/histogram";
    const query = "";
    const taxon_id = "6930";
    const per_page = "12";
    const date_field = "observed";
    const interval = "month_of_year";
    const year = "2017";

    const url = `${action}?&q=${query}&taxon_id=${taxon_id}&date_field=${date_field}&interval=${interval}&year=${year}&per_page=${per_page}`;
    Api.get(url).then(data => {
      const observation = data.results.month_of_year;

      var values = Object.keys(observation).map(e => observation[e])

      console.log(values);



      this.setState({
        chartData: {
          labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
          datasets: [
            {
              label: "Number of sightings",
              data: values,
              backgroundColor: "rgb(77,175,165)"
            }
          ]
        }
      });

    });


  }

  render() {
    return (

      <div>
      <button>
        BACK
      </button>

      <button>
        FWD
      </button>
        <Bar
          data={this.state.chartData}
          options={{
            title: {
              display: true,
              text: "May 2017",
              fontSize: 25
            },
            legend: {
              display: true,
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
  }
}
