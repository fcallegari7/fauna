// Bars.js

import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
var ApiService = require('../../services/Api').default;
var Api = new ApiService();

export default class Bars extends Component {

  constructor() {
    super();
    this.state = {
      chartData: {}
    }
  }

  componentWillMount() {
    this.getChartData();
  }

  getChartData() {
    //Ajax calls here
    this.setState({
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'Number of sightings',
            data: [2,7,8,4],
            backgroundColor: 'rgb(77,175,165)'
          }
        ]
      }
    });
  }

    render() {
        return (
            <div>

            <Bar
              data={this.state.chartData}
              options={{
                title: {
                  display: true,
                  text: 'March 2018',
                  fontSize: 25
                },
                legend: {
                  display: true,
                  position: 'top'
                },
                  maintainAspectRatio: true,
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true
                      }
                    }]
                  }
              }}
            />



            </div>
        )
    }
}
