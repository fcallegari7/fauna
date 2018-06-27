// Pie.js

import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

export default class PieChart extends Component {

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
        labels: ['Black Bear', 'Cougar', 'Sea Lion', 'Raccoon', 'Coyote'],
        datasets: [
          {
            label: 'Number of sightings',
            data: [30,20,18,17,38],
            backgroundColor: ['rgb(77,175,165)', 'lightgreen', 'steelblue', 'lightblue', 'turquoise'],
          }
        ]
      }
    });
  }

    render() {
        return (
            <div>

            <Pie
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
                }

              }}
            />



            </div>
        )
    }
}
