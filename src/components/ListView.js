import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Moment from 'react-moment';
import 'moment-timezone';
const ApiService = require('../services/Api').default;
const Api = new ApiService();
const Spinner = require ('../images/spinner.svg')

export default class ListView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        observations: {
          page: 1,
          per_page: 10,
          total_results: 0,
          results: [],
          hasMore: true
        }
      }

      this.getListData = this.getListData.bind(this);
    }

    componentDidMount() {
      this.getListData();
    }

    getListData(page = 1) {
      const action = 'observations';
      const query = '';
      const search_on = "name";
      const order = 'desc';
      const order_by = 'observed_on';
      const per_page = '10';
      const allows_taxa = [
        "Amphibia",
        "Reptilia",
        "Aves",
        "Mammalia",
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

          // const observed_on = new Date(result.created_at).toLocaleString();
          const observed_on = new Date(result.time_observed_at);

          return (<li key={result.id}>
              <p className="photo">
                {photos.slice(0,1).map((url, i) => {
                  return (<img key={'photo-'+result.id+'-'+i} src={url} alt="" />);
                })}
              </p>
              <p className="animal-name">{result.taxon.preferred_common_name} - {result.id}</p>
              <p className="location">{result.place_guess}</p>
              {/* <div>observation_photos: <ul>{photos}</ul></div> */}
              <p className="latest-sighting">
                Latest sighting: <Moment fromNow tz={result.observed_time_zone}>{observed_on}</Moment>
                </p>
              <p className="sighting-count">Spotted <span className=''>{result.taxon.observations_count}</span> times until now</p>
              <a href={result.taxon.wikipedia_url} target='_blank' className="wiki-link">Learn more about the animal </a>
            </li>);
        });

        let result_data = {
          page: data.page,
          per_page: data.per_page,
          total_results: data.total_results,
          results: this.state.observations.results.concat(data.results),
          hasmore: Boolean(data.results.length)
        }

        this.setState({observations: result_data});
      });
    }

    render() {
      if (this.state.observations.results.length > 0) {
        return (
          <div className='wrapper list-wrapper'>
            <div className='list-header'>
              <h2>Recently sighted animals</h2>
            </div>
            <ul className='card-list'>
              <InfiniteScroll
                pageStart={1}
                loadMore={this.getListData}
                hasMore={this.state.observations.hasmore}
                loader={<div className="loader" key={0}><img className='spinner-list' src={Spinner} alt="Loading"/></div>}
                >
                  {this.state.observations.results}
                </InfiniteScroll>
            </ul>
          </div>
        )
      } else {
        return (
          <div className='wrapper list-wrapper'>
            <div className='list-header'>
              <h2>Recently sighted animals</h2>
            </div>
            <div className="loader" key={0}><img className='spinner-list spinner-top' src={Spinner} alt="Loading"/></div>
          </div>
        )
      }
    }
}
