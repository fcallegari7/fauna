// ListView.js

import React, { Component } from 'react';
var ApiService = require('../services/Api').default;
var Api = new ApiService();

export default class ListView extends Component {
    constructor() {
      super();
      this.state = {
        observations: {
          page: 1,
          per_page: 30,
          total_results: 0,
          results: []
        }
      }
    }

    componentDidMount() {
      this.getListData();
    }

    getListData() {
      const action = 'observations';
      const query = '';
      const order = 'desc';
      const order_by = 'observed_on';
      const page = '1';
      const per_page = '30';
      const iconic_taxa =
      "Animalia%2CAmphibia%2CAves%2CMammalia%2CMollusca%2CReptilia";
      const url = `${action}?geo=true&mappable=true&identified=true&photo=true&q=${query}&iconic_taxa=${iconic_taxa}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}`;
      Api.get(url).then(data => {
        data.results = data.results.map((result, key) => {
          let photos = result.observation_photos.map((item, i) => {
            return (<li key={i}> <img src={item.photo.url} alt="" /></li>);
          });
          return (<li key={key}>
              <p className="photo"><img src={result.taxon.default_photo.square_url} alt="" /></p>
              <p className="animal-name">{result.taxon.preferred_common_name}</p>
              <p className="location">{result.place_guess}</p>
              {/* <div>observation_photos: <ul>{photos}</ul></div> */}
              <p className="latest-sighting">Latest sighting: <span className=''> {result.observed_on}</span></p>
              <p className="sighting-count">Spotted <span className=''>{result.taxon.observations_count}</span> times this month</p>
              <a href={result.taxon.wikipedia_url} className="wiki-link">Learn more about the animal </a>
            </li>);
        });

        let result_data = {
          page: data.page,
          per_page: data.per_page,
          total_results: data.total_results,
          results: data.results
        }
        this.setState({observations: result_data});
      });
    }

    render() {
        return (
            <div className='wrapper list-wrapper'>
                {/* <div>
                  <span>Page: {this.state.observations.page}</span>
                  <span>Per page: {this.state.observations.per_page}</span>
                  <span>Total Results: {this.state.observations.total_results}</span>
                </div> */}
                <ul className='card-list'>
                  {this.state.observations.results}
                </ul>
            </div>
        )
    }
}
