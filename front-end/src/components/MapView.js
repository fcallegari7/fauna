// MapView.js
import React, { Component } from "react";

const { SearchAutocomplete } = require("./search/SearchAutocomplete");
const { MapWithAMarkerClusterer } = require("./map/MapWithAMarkerClusterer");

var FilterIcon = require('../images/filter.svg');
var HelpIcon = require('../images/help.svg');
var SearchIcon = require('../images/search.svg');

var ApiService = require("../services/Api").default;
var Api = new ApiService();

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.getMarkers = this.getMarkers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: [] });
    this.setState({ loading: false });
    this.setState({ searchIsOpen: false });
    this.setState({ searchBy: "" });
    this.setState({ keywords: [] });
    this.setState({
      position: { latitude: 49.2245678, longitude: -123.1106257 }
    });
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      });
    }
  }

  getMarkers(item) {
    let keywords = this.state.keywords;
    for (let keyword in keywords){
      if (keyword.name===item.name){
        return;
      }
    }
    keywords.push(item);
    if (item.position && item.position.latitude !== null) {
      this.state.position = item.position;
    }
    this.setState({
      searchBy: item.name,
      keywords: keywords,
      position: this.state.position
    });
    console.log(3, this.state.position)
    // &swlng=-123.19107055664062&swlat=49.29386874004779&nelng=-123.05356979370117&nelat=49.3554050055574
    const action = "observations";
    const query = encodeURI(item.name);
    const search_on = "name";
    const order = "desc";
    const order_by = "created_at";
    const page = "1";
    const per_page = "100";
    const url = `${action}?geo=true&mappable=true&identified=true&q=${query}&search_on=${search_on}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}`;
    Api.get(url).then(data => {
      data.results = data.results.map((result, key) => {
        let photos = [];
        if (result.taxon.default_photo!=null){
          photos.push(result.taxon.default_photo.url);
        }
        photos = photos.concat(result.photos.map(item => item.url))

        return {
          key: key,
          longitude: parseFloat(result.geojson.coordinates[0]),
          latitude: parseFloat(result.geojson.coordinates[1]),
          place: result.place_guess,
          photos: photos,
          time_observed_at: result.time_observed_at,
          observations_count: result.taxon.observations_count,
          name: result.taxon.preferred_common_name,
          wikipedia_url: result.taxon.wikipedia_url
        };
      });
      if (this.state.loading===false){
        this.setState({ markers: data.results, loading: true });
      }
    });
  }

  toggleModal(group) {
    this.state.searchIsOpen = false;
    this.state.filterIsOpen = false;
    this.state.helpIsOpen = false;

    if (group==='search') {
      this.state.searchIsOpen = true;
    }
    if (group==='filter') {
      this.state.filterIsOpen = true;
    }
    if (group==='help') {
      this.state.helpIsOpen = true;
    }

    this.setState({
      searchIsOpen: this.state.searchIsOpen,
      filterIsOpen: this.state.filterIsOpen,
      helpIsOpen: this.state.helpIsOpen
    });
  }

  requestTimer = null;

  render() {
    return (
      <div className='wrapper' id='map'>
        <div className="search">
          {!this.state.searchIsOpen && (
            <div className="button searchIcon" onClick={() => this.toggleModal('search')}>
              <img className="button-icon" src={SearchIcon} alt="Search" />
            </div>
          )}
          {this.state.searchIsOpen && (
            <div className='searchFormGroup'>
              <form action="#">
                <button className="close" type="close" onClick={() => this.toggleModal()}> x </button>
                <SearchAutocomplete
                  value={this.state.searchBy}
                  onChangeValue={this.getMarkers}
                  keywords={this.state.keywords}
                />
                <button className="submit" type="submit"> > </button>
              </form>
            </div>
          )}
          {this.state.keywords.length>0 && (
            <ul className="keywords">
              {this.state.keywords.map((item, index) => (
                <li key={'tag-'+item.type+'-'+item.id} className={'tag-'+item.type}>
                  {item.name}
                  <a href="#" onClick={() => {
                    this.state.keywords.splice(index, 1);
                    this.setState({keywords: this.state.keywords});
                  }}>(x)</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="filter">
          <label className="menu-open-button" htmlFor="menu-open">
            <div className="button filterIcon" onClick={() => this.toggleModal('filter')}>
              <img className="button-icon" src={FilterIcon} alt="Filter" />
            </div>
          </label>

          {this.state.filterIsOpen && (
            <div className='filterGroup'>
              <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open" />
              <a href="#" className="menu-item blue"> <i className="fa fa-anchor"></i> </a>
              <a href="#" className="menu-item green"> <i className="fa fa-coffee"></i> </a>
              <a href="#" className="menu-item red"> <i className="fa fa-heart"></i> </a>
            </div>
          )}
        </div>

        <div className="help">
          <div className="button helpIcon" onClick={() => this.toggleModal('help')}>
            <img className="button-icon" src={HelpIcon} alt="Help" />
          </div>
          {this.state.helpIsOpen && (
            <div className='helpGroup'>
              <p>Help</p>
            </div>
          )}
        </div>
        <MapWithAMarkerClusterer
          markers={this.state.markers}
          center={this.state.position}
        />
      </div>
    );
  }
}
