import React, { Component } from "react";
import Bars from "./chart/Bars";
import PieChart from "./chart/PieChart";
import Top from "./chart/Top";
import * as moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

// const SearchAutocompleteLocation = require("./search/SearchAutocompleteLocation");

const ApiService = require("../services/Api").default;
const Api = new ApiService();

export default class ChartView extends Component {
  constructor() {
    super();
    this.state = {
      observations: [],
      top_observation: '',
      date: moment(),
    };
    this.decreaseDate = this.decreaseDate.bind(this);
    this.increaseDate = this.increaseDate.bind(this);
  }

  componentDidMount() {
    this.getChartData();
  }

  getChartData() {
    const action = "observations/species_counts";
    const per_page = "5";
    const allows_taxa = [
      "Amphibia",
      "Reptilia",
      "Aves",
      "Mammalia",
    ];
    const iconic_taxa = encodeURI(allows_taxa.join(','));
    const month = this.state.date.format('M');
    const year = this.state.date.format('YYYY');
    const without_taxon_id = 43584; // Remove humans
    const url = `${action}?geo=true&mappable=true&identified=true&photos=true&identified=true&iconic_taxa=${iconic_taxa}&page=1&per_page=${per_page}&month=${month}&year=${year}&without_taxon_id=${without_taxon_id}`;
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

  decreaseDate() {
    this.setState({
      date: this.state.date.subtract(1, 'month'),
    }, () => this.getChartData());
  }

  increaseDate() {
    if (!this.state.date.isSame(moment(), 'month')) {
      this.setState({
        date: this.state.date.add(1, 'month'),
      }, () => this.getChartData());
    }
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
            <button className='button' onClick={this.decreaseDate}>
              &lt;
            </button>
            <h2 className='month-title'>
              <Moment format="MMMM YYYY">{this.state.date}</Moment>
            </h2>
            <button className={'button' + (this.state.date.isSame(moment(), 'month') ? ' inactive' : '')} onClick={this.increaseDate}>
              &gt;
            </button>
          </div>
        </div>

        <div className='chart-components'>
          <div className='top'>
            <Top value={this.state.top_observation} />
          </div>
          <div className='charts'>
            <Bars value={this.state.top_observation} month={this.state.date.format('M')} year={this.state.date.format('YYYY')} />
            <PieChart value={this.state.observations} />
          </div>
        </div>
      </div>
    );
  }
}
