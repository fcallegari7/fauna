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
      const action = 'observations';
      const query = 'Black%20bear';
      const order = 'desc';
      const order_by = 'created_at';
      const page = '1';
      const per_page = '1';
      const url = `${action}?geo=true&mappable=true&identified=true&q=${query}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}`;
      Api.get(url).then(data => {
        data.results = data.results.map((result, key) => {
          let photos = result.observation_photos.map((item, i) => {
            return (<li key={i}> <img src={item.photo.url} alt="" /></li>);
          });
          return (<li key={key}>
              <p>Id : {result.id}</p>
              <p>geojson coordinates: {JSON.stringify(result.geojson.coordinates)}</p>
              <p>geojson type: {result.geojson.type}</p>
              <p>identifications_count: {result.identifications_count}</p>
              <p>default_photo: <img src={result.taxon.default_photo.square_url} alt="" /></p>
              <div>observation_photos: <ul>{photos}</ul></div>
              <p>observed_on: {result.observed_on}</p>
              <p>place_guess: {result.place_guess}</p>
              <p>positional_accuracy: {result.positional_accuracy}</p>
              <p>species_guess: {result.species_guess}</p>
              <p>time_observed_at: {result.time_observed_at}</p>
              <p>uri: {result.uri}</p>
              <p>wikipedia_url: {result.taxon.wikipedia_url}</p>
              <p>observations_count: {result.taxon.observations_count}</p>
              <p>preferred_common_name: {result.taxon.preferred_common_name}</p>
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
            <div>
                <h2>List View</h2>
                <p>Display the cards</p>
                <div>
                  <span>Page: {this.state.observations.page}</span>
                  <span>Per page: {this.state.observations.per_page}</span>
                  <span>Total Results: {this.state.observations.total_results}</span>
                </div>
                <ul>
                  {this.state.observations.results}
                </ul>
            </div>
        )
    }
}