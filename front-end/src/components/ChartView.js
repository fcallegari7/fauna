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
  }

  componentDidMount() {
    const action = "observations/species_counts";
    const query = "";
    const per_page = "5";
    let m = new Date();
    let month = m.getMonth();
    let year = m.getFullYear();
    const iconic_taxa =
      "Animalia%2CAmphibia%2CAves%2CMammalia%2CMollusca%2CReptilia";

    const url = `${action}?&q=${query}&iconic_taxa=${iconic_taxa}&month=${month}&year=${year}&per_page=${per_page}`;
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
        month: month + 1,
        year: year
       });


    });
  }


  refineLocation(location){

  }



  decreaseDate(){
      console.log("decreasing");
    }

  increaseDate(){
      console.log("increasing");
    }

  render() {
    return (
      <div>
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

        <Top value={this.state.observations.slice(0, 1)} />
        <Bars value={this.state.observations.slice(0,1)} monthValue={this.state.month} yearValue={this.state.year} />
        <PieChart value={this.state.observations} />
      </div>
    );
  }
}
