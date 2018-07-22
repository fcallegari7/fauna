// Pie.js

import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
var Spinner = require('../../images/spinner.svg');

export default class PieChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      chartData: {}
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value === this.props.value) {
      return;
    }

    const labels = this.props.value.map((item) => item.common_name);
    const values = this.props.value.map((item) => item.count);

    this.setState({
      chartData: {
        labels: labels,
        datasets: [
          {
            label: "Number of sightings",
            fontFamily: "'Open Sans', 'sans serif'",
            data: values,
            backgroundColor: [
              "rgb(77,175,165)",
              "aquamarine",
              "limegreen",
              "darkturquoise",
              "rgb(3,145,200)"
            ]
          }
        ]
      }
    });
  }


  render() {
    if (Object.keys(this.state.chartData).length > 0) {
      return (
        <div>
          <Pie
            data={this.state.chartData}
            options={{
              title: {
                display: true,
                text: "Top 5 Animals",
                fontSize: 25
              },
              legend: {
                display: true,
                position: "top"
              }
            }}
          />
        </div>
      );
    } else {
      return (
        <div><img className='spinner' src={Spinner} alt="Loading"/></div>
      );
    }
  }
}
