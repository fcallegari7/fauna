// ListView.js

import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ListHeader from './ListHeader'
var ApiService = require('../services/Api').default;
var Api = new ApiService();
var Spinner = require('../images/spinner.svg');

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

    getListData(page) {
      const action = 'observations';
      const query = '';
      const search_on = "name";
      const order = 'desc';
      const order_by = 'observed_on';
      const per_page = '30';
      const allows_taxa = [
        "Animalia",
        "Amphibia",
        "Aves",
        "Mammalia",
        "Mollusca",
        "Reptilia"
      ];
      const iconic_taxa = encodeURI(allows_taxa.join(','));
      const url = `${action}?geo=true&mappable=true&identified=true&photo=true&q=${query}&iconic_taxa=${iconic_taxa}&search_on=${search_on}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}`;

      Api.get(url).then(data => {
        data.results = data.results.map((result, key) => {
          let photos = [];
          if (result.taxon.default_photo!=null) {
            photos.push(result.taxon.default_photo.medium_url);
          }
          // photos = photos.concat(result.observation_photos.map(item => item.photo.url))

          return (<li key={result.id}>
              <p className="photo">
                {photos.slice(0,1).map((url, i) => {
                  return (<img key={'photo-'+i} src={url} alt="" />);
                })}
              </p>
              <p className="animal-name">{result.taxon.preferred_common_name}</p>
              <p className="location">{result.place_guess}</p>
              {/* <div>observation_photos: <ul>{photos}</ul></div> */}
              <p className="latest-sighting">Latest sighting: <span className=''> {result.observed_on}</span></p>
              <p className="sighting-count">Spotted <span className=''>{result.taxon.observations_count}</span> times until now</p>
              <a href={result.taxon.wikipedia_url} target='_blank' className="wiki-link">Learn more about the animal </a>
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
            <ListHeader />
            <ul className='card-list'>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.getListData.bind(this)}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
                >
                  {this.state.observations.results}
                </InfiniteScroll>
            </ul>
          </div>
      )
    }
}
