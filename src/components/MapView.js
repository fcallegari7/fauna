// MapView.js
import React, { Component } from "react";

const { SearchAutocomplete } = require("./search/SearchAutocomplete");
const { MapWithAMarkerClusterer } = require("./map/MapWithAMarkerClusterer");

var HelpIcon = require('../images/help.svg');
var SearchIcon = require('../images/search.svg');
var CloseIcon = require('../images/close.svg');
var GoIcon = require('../images/go.svg');
var FilterIcon = require('../images/filter.svg');
var FilterIconItem1 = require('../images/filter.svg');
var FilterIconItem2 = require('../images/filter.svg');
var FilterIconItem3 = require('../images/filter.svg');

var ApiService = require("../services/Api").default;
var Api = new ApiService();

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.getMarkers = this.getMarkers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  componentWillMount() {
    this.setState({
      markers: [],
      loading: false,
      searchIsOpen: false,
      searchBy: "",
      keywords: [],
      position: { latitude: 49.2245678, longitude: -123.1106257 },
      bounds: {
        swlng: 0,
        swlat: 0,
        nelng: 0,
        nelat: 0
      }
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
    let placeIndex = -1;
    let searchBy = [];

    // Update keywords list, map position and prepare ids to be used on searh
    for (let index in keywords) {
      // If already on the list does not update the map
      if (item.name && keywords[index].name.toLowerCase()===item.name.toLowerCase()){
        return;
      }
      // Save place index
      if (item.type && item.type==='place') {
        if (keywords[index].type==='place'){
          placeIndex = index;
          keywords.splice(index, 1, item);
        }
      }
      // Save animal ids
      else {
        searchBy.push(keywords[index].id);
      }
    }

    // Allows only one place per time
    if (item.type && item.type==='place' && placeIndex > -1) {
      keywords.push(item);
    }
    // Add animal when the list of kwywords is empty
    if (item.type && item.type==='animal') {
      keywords.push(item);
      searchBy.push(item.id);
    }

    // Define the new position for the map
    let position = this.state.position;
    if (item.position && item.position.latitude !== null) {
      position = item.position;
    }

    let bounds = this.state.bounds;
    // Only update when boundary outside previous search
    if (item.bounds) {
      bounds = item.bounds
    }

    // If waiting a response from the API do not call again
    if (this.state.loading===true){
      return;
    }

    // Only search on API if has any keyowrd defined
    if (keywords.length === 0) {
      return;
    }

    // Save the state
    this.setState({
      searchBy: item.name,
      keywords: keywords,
      position: position,
      bounds: bounds,
      loading: true,
    });

    // Get and update map view data
    const action = "observations";
    const id = encodeURI(searchBy.join(','));
    const search_on = "name";
    const order = "desc";
    const order_by = "created_at";
    const page = "1";
    const per_page = "100";
    const swlng = bounds.swlng;
    const swlat = bounds.swlat;
    const nelng = bounds.nelng;
    const nelat = bounds.nelat;
    const url = `${action}?geo=true&mappable=true&identified=true&photos=true&id=${id}&search_on=${search_on}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}&swlng=${swlng}&swlat=${swlat}&nelng=${nelng}&nelat=${nelat}`;
    Api.get(url).then(data => {
      data.results = data.results.map((result, key) => {
        let photos = [];
        if (result.taxon.default_photo!=null){
          photos.push(result.taxon.default_photo.medium_url);
        }
        photos = photos.concat(result.photos.map(item => item.url))

        return {
          key: key,
          longitude: parseFloat(result.geojson.coordinates[0]),
          latitude: parseFloat(result.geojson.coordinates[1]),
          place: result.place_guess,
          photos: photos,
          observed_at: result.time_observed_at,
          observations_count: result.taxon.observations_count,
          name: result.taxon.preferred_common_name,
          wikipedia_url: result.taxon.wikipedia_url
        };
      });
      if (this.state.loading===true){
        this.setState({ markers: data.results, loading: false });
      }
    });
  }

  toggleModal(group) {
    let searchIsOpen = false;
    let filterIsOpen = false;
    let helpIsOpen = false;

    if (group==='search') {
      searchIsOpen = true;
    }
    if (group==='filter') {
      filterIsOpen = true;
    }
    if (group==='help') {
      helpIsOpen = true;
    }

    this.setState({
      searchBy: '',
      searchIsOpen: searchIsOpen,
      filterIsOpen: filterIsOpen,
      helpIsOpen: helpIsOpen
    });
  }

  render() {
    return (
      <div className='wrapper' id='map'>
        <div className={"search"+(this.state.searchIsOpen ? " open" : '')}>
          <div className="button searchIcon" onClick={() => this.toggleModal('search')}>
            <img className="button-icon" src={SearchIcon} alt="Search" />
          </div>
          <div className='searchFormGroup'>
            <button className="close" type="close" onClick={() => this.toggleModal()}>
              <img className="button-icon" src={CloseIcon} alt="Close" />
            </button>
            <SearchAutocomplete
              value={this.state.searchBy}
              onChangeValue={this.getMarkers}
              keywords={this.state.keywords}
            />
            {false && <button className="submit" type="submit" onClick={() => this.toggleModal()}>
              <img className="button-icon" src={GoIcon} alt="Go" />
            </button>}
          </div>
          {this.state.keywords.length>0 && (
            <ul className="keywords">
              {this.state.keywords.map((item, index) => (
                <li key={'tag-'+item.type+'-'+item.id} className={'tag-'+item.type}>
                  {item.name}
                  <button onClick={() => {
                    this.state.keywords.splice(index, 1);
                    this.setState({keywords: this.state.keywords});
                  }}>(x)</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="filter">
          <label className="filter-open-button" htmlFor="filter-open">
            <div className="button filterIcon" onClick={() => this.toggleModal('filter')}>
              <img className="button-icon" src={FilterIcon} alt="Filter" />
            </div>
          </label>

          {this.state.filterIsOpen && (
            <div className='filterGroup'>
              <input type="checkbox" className="filter-open" name="filter-open" id="filter-open" />
              <div className="button filter-item" onClick={() => this.toggleModal()}>
                <img className="button-icon" src={CloseIcon} alt="" />
              </div>
              <div className="button filter-item" onClick={() => this.toggleModal()}>
                <img className="button-icon" src={FilterIconItem1} alt="Filter - Item 1" />
              </div>
              <div className="button filter-item" onClick={() => this.toggleModal()}>
                <img className="button-icon" src={FilterIconItem2} alt="Filter - Item 2" />
              </div>
              <div className="button filter-item" onClick={() => this.toggleModal()}>
                <img className="button-icon" src={FilterIconItem3} alt="Filter - Item 3" />
              </div>
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
          onPinOpen={() => this.toggleModal()}
          onChangeValue={this.getMarkers}
        />
      </div>
    );
  }
}
