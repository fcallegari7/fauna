// ChartView.js

import React, { Component } from "react";
import Bars from "./chart/Bars";
import PieChart from "./chart/PieChart";
import Top from "./chart/Top";

const {
  SearchAutocompleteLocation
} = require("./search/SearchAutocompleteLocation");

var ApiService = require("../services/Api").default;
var Api = new ApiService();

export default class ChartView extends Component {
  constructor() {
    super();
    this.state = {
      observations: [],
      top_observation: '',
      month: '',
      year: '',
      name: ''
    };
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
    this.getMonthName = this.getMonthName.bind(this);
  }

  componentWillMount() {
    this.getMonthName();
  }

  componentDidMount() {
    this.getChartData();
  }

  getMonthName() {
    let m = new Date();
    let month = m.getMonth() + 1;
    let year = m.getFullYear();
    let n = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var name = n[month - 1];

    this.setState({
      month: month,
      year: year,
      name: name
    });
  }

  getChartData() {
    console.log(this.state.month)
    const action = "observations/species_counts";
    const query = "";
    const per_page = "5";
    const iconic_taxa =
      "Animalia%2CAmphibia%2CAves%2CMammalia%2CMollusca%2CReptilia";

    const url = `${action}?&q=${query}&iconic_taxa=${iconic_taxa}&month=${this.state.month}&year=${this.state.year}&per_page=${per_page}`;
    Api.get(url).then(data => {
      data.results = data.results.map((result, key) => {
        const observation = {
          count: result.count,
          taxon_id: result.taxon.id,
          common_name: result.taxon.preferred_common_name,
          photo: result.taxon.default_photo.medium_url,
          wiki: result.taxon.wikipedia_url
        };
        return observation;
      });

      this.setState({
        observations: data.results,
        top_observation: data.results.slice(0, 1).shift()
      });
    });
  }

  refineLocation(location) {

  }

  decreaseDate() {
    let currentMonth = this.state.month;
    let currentYear = this.state.year;
    let newMonth;
    let newYear;
    if (currentMonth > 1) {
      newMonth = currentMonth - 1;
      newYear = this.state.year;
    } else if (currentMonth === 1) {
      newMonth = 12;
      newYear = currentYear - 1;
    }
    this.setState({
      month: newMonth,
      year: newYear
    });
    this.updateMonthName();
    this.getChartData();
  }

  increaseDate() {
    let currentMonth = this.state.month;
    let currentYear = this.state.year;
    let newMonth;
    let newYear;
    let m = new Date();
    let month = m.getMonth() + 1;
    let year = m.getFullYear();
    if (currentMonth === month && currentYear === year) {
      return;
    } else if (currentMonth < 12) {
      newMonth = currentMonth + 1;
      newYear = this.state.year;
    } else if (currentMonth === 12) {
      newMonth = 1;
      newYear = currentYear + 1;
    }
    this.setState({
      month: newMonth,
      year: newYear
    })
    this.updateMonthName();
    this.getChartData();
  }

updateMonthName() {
  let month = this.state.month;
  let n = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var name = n[month - 1];

  this.setState({
    name: name
  });
}


  render() {
    return (
      <div className='wrapper chart-wrapper'>
        <div className='chart-search'>
          {/* <label>
            Location
            <SearchAutocompleteLocation
              value={this.state.searchBy}
              onChangeValue={this.refineLocation}
              items={this.state.searchAutocomplete}
              requestTimer={this.requestTimer}
            />
          </label> */}
          <div className='chart-navigation'>
            <button onClick={this.decreaseDate}>
              &lt;
            </button>
            <h2 className='month-title'>{this.state.name} {this.state.year}</h2>
            <button onClick={this.increaseDate}>
              &gt;
            </button>
          </div>

        </div>

        <div className='chart-components'>
          <div className='top'>
            <Top value={this.state.top_observation} />
          </div>
          <div className='charts'>
            <Bars value={this.state.top_observation} month={this.state.month} year={this.state.year} />
            <PieChart value={this.state.observations} />
          </div>
        </div>
      </div>
    );
  }
}
