// Pie.js

import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';
import { compose, withState, withHandlers } from "recompose";

export const PieChart = compose ()(

  props => <div>

  {JSON.stringify(props.value)}
  <Pie
    data={{
      labels: ['Animal 1', 'Animal 2', 'Animal 3', 'Animal 4', 'Animal 5', 'Animal 6', 'Animal 7'],
      datasets: [
        {
          label: 'Number of sightings',
          data: [2,7,8,4,10,5,6],
          backgroundColor: ['rgb(77,175,165)','lightblue', 'aquamarine', 'limegreen', 'cornflowerblue', 'darkseagreen', 'lightgreen']
        }
      ]
    }}
    options={{
      title: {
        display: true,
        text: '% of Animals',
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


// export default class PieChart extends Component {
//
//   constructor() {
//     super();
//     this.state = {
//       chartData: {}
//     }
//   }
//
//   componentWillMount() {
//     this.getChartData();
//   }
//
//   getChartData() {
//     //Ajax calls here
//     this.setState({
//       chartData: {
//         labels: ['Black Bear', 'Cougar', 'Sea Lion', 'Raccoon', 'Coyote'],
//         datasets: [
//           {
//             label: 'Number of sightings',
//             data: [30,20,18,17,38],
//             backgroundColor: ['rgb(77,175,165)', 'lightgreen', 'steelblue', 'lightblue', 'turquoise'],
//           }
//         ]
//       }
//     });
//   }
//
//     render() {
//         return (
//             <div>
//
//
//
//
//
//             </div>
//         )
//     }
// }
