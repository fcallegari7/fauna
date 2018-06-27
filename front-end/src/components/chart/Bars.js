// Bars.js

import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

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
        labels: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Number of sightings',
            data: [5,3,8,10,15,18,17,20,12,11,6,4],
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
                  text: 'Black Bear',
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
