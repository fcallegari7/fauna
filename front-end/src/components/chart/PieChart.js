// Pie.js

import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { compose, withState, withHandlers } from "recompose";

const nameList = [];
const countList = [];

export const PieChart = compose()(props => (
  <div>
    {props.value.map((item, key) => {
      nameList.push(item.common_name)
      countList.push(item.count)
      return
    })}

    <Pie
      data={{
        labels: nameList,
        datasets: [
          {
            label: "Number of sightings",
            data: countList,
            backgroundColor: [
              "rgb(77,175,165)",
              "darkturquoise",
              "aquamarine",
              "limegreen",
              "cornflowerblue"
            ]
          }
        ]
      }}
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
      }
    }
    />
  </div>
));
