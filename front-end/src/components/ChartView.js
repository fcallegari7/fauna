// ChartView.js

import React, { Component } from 'react';
import Bars from './chart/Bars';

const { Top } = require('./chart/Top');
const { PieChart } = require('./chart/PieChart');

const { SearchAutocompleteLocation } = require("./search/SearchAutocompleteLocation");

var ApiService = require('../services/Api').default;
var Api = new ApiService();

export default class ChartView extends Component {

    constructor() {
      super();
      this.state = {
        observations: []
      }
    }

    componentDidMount() {

    }


    componentWillMount() {
      this.getChartData();
    }



    getChartData() {

      const action = 'observations/species_counts';
      const query = '';
      const per_page = '7';
      const iconic_taxa = 'Animalia%2CAmphibia%2CArachnida%2CAves%2CChromista%2CFungi%2CInsecta%2CMammalia%2CMollusca%2CReptilia';

      const url = `${action}?&q=${query}&iconic_taxa=${iconic_taxa}&per_page=${per_page}`;
      Api.get(url).then(data => {
        data.results = data.results.map((result, key) => {
            const observation = {
              count: result.count,
              taxon_id: result.taxon.id,
              common_name: result.taxon.preferred_common_name,
              photo: result.taxon.default_photo.square_url,
              wiki: result.taxon.wikipedia_url
            }
            return (observation);
        });

        this.setState({observations: data.results});
        console.log(this.state.observations[0].count)
      });


    }



    render() {
        return (
            <div>
            <h1>Most sighted animal</h1>

            <label>
              Search Location
              <SearchAutocompleteLocation value={this.state.searchBy} onChangeValue={this.getMarkers} items={this.state.searchAutocomplete} requestTimer={this.requestTimer} />
            </label>

            <Top value={this.state.observations.slice(0,1)[0]}/>
            <Bars />
            <PieChart value={this.state.observations} data={this.state.observations.count} name={this.state.observations.common_name} id={this.state.observations.taxon_id}/>
            </div>
        )
    }
}
