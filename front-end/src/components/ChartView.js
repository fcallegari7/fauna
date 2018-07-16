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
      month: '',
      year: ''
    };
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
  }

  componentWillMount() {
    let m = new Date();
    let month = m.getMonth() + 1;
    let year = m.getFullYear();

    this.setState({
      month: month,
      year: year
    });
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
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
          photo: result.taxon.default_photo.square_url,
          wiki: result.taxon.wikipedia_url
        };
        return observation;
      });

      this.setState({
        observations: data.results,
      });

      console.log(`count: ${this.state.observations[0].count} + month: ${this.state.month}`)

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
    this.getChartData();
  }

  render() {
    return (
      <div className='wrapper chart-wrapper'>
        <label>
          Search Location
          <SearchAutocompleteLocation
            value={this.state.searchBy}
            onChangeValue={this.refineLocation}
            items={this.state.searchAutocomplete}
            requestTimer={this.requestTimer}
          />
        </label>

        <button onClick={this.decreaseDate}>
          BACK
        </button>

        <button onClick={this.increaseDate}>
          FWD
        </button>

        <div className='top'>
          <Top value={this.state.observations.slice(0, 1)} />
        </div>
        <Bars value={this.state.observations.slice(0,1)} monthValue={this.state.month} yearValue={this.state.year} />
        <PieChart value={this.state.observations} />
      </div>
    );
  }
}
