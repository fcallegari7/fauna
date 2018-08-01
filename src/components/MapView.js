// MapView.js
import React, { Component } from "react";
import Distance from "./filters/Distance"
import Date from "./filters/Date"
import Help from "./map/Help"

const { SearchAutocomplete } = require("./search/SearchAutocomplete");
const { MapWithAMarkerClusterer } = require("./map/MapWithAMarkerClusterer");

const SearchIcon = require('../images/search.svg');
const CloseIcon = require('../images/close.svg');
const GoIcon = require('../images/go.svg');
const FilterIcon = require('../images/filter.svg');
const FilterIconCaptive = require('../images/captivity.svg');
const FilterIconDate = require('../images/date.svg');
const FilterIconDistance = require('../images/distance.svg');
const PlaceIcon = require('../images/pin.svg');
const AnimalIcon = require('../images/raccoon.svg');
const ReptiliaIcon = require('../images/reptile.svg');
const AvesIcon = require('../images/bird.svg');
const MammaliaIcon = require('../images/coyote.svg');

const ApiService = require("../services/Api").default;
const Api = new ApiService();

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.getMarkers = this.getMarkers.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.updateMarkers = true;
  }
  componentWillMount() {
    this.setState({
      markers: [],
      loading: false,
      searchIsOpen: false,
      filterIsOpen: false,
      helpIsOpen: false,
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (this.setPosition) {
          this.setPosition(position);
        }
      });
    }
  }

  componentWillUnmount() {
    this.setPosition = null;
  }

  setPosition(position) {
    this.setState({
      position: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
    });
  }

  getMarkers(item={}) {
    if (this.updateMarkers===false){
      return;
    }

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
      if (keywords[index].type==='animal'){
        searchBy.push(keywords[index].id);
      }
    }

    // Allows only one place per time
    if (item.type && item.type==='place' && placeIndex === -1) {
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
      this.setState({position: position});
    }

    let bounds = this.state.bounds;
    // Only update when boundary outside previous search
    if (item.bounds) {
      bounds = item.bounds
      this.setState({bounds: bounds});
    }

    // If waiting a response from the API do not call again
    if (this.state.loading===true){
      return;
    }

    // Only search on API if has any animal defined
    if (searchBy.length === 0) {
      this.setState({ markers: [], loading: false });
      return;
    }

    // Save the state
    this.setState({
      searchBy: item.name,
      keywords: keywords,
      loading: true,
    });

    // Get and update map view data
    const action = "observations";
    const taxon_id = encodeURI(searchBy.join(','));
    const search_on = "name";
    const order = "desc";
    const order_by = "created_at";
    const page = "1";
    const per_page = "100";
    const swlng = bounds.swlng;
    const swlat = bounds.swlat;
    const nelng = bounds.nelng;
    const nelat = bounds.nelat;
    const allows_taxa = [
      "Amphibia",
      "Reptilia",
      "Aves",
      "Mammalia",
      // Insecta ??
    ];
    const iconic_taxa = encodeURI(allows_taxa.join(','));
    const url = `${action}?geo=true&mappable=true&identified=true&photos=true&iconic_taxa=${iconic_taxa}&taxon_id=${taxon_id}&search_on=${search_on}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}&swlng=${swlng}&swlat=${swlat}&nelng=${nelng}&nelat=${nelat}`;
    Api.get(url).then(data => {
      data.results = data.results.map((result, key) => {
        let photos = [];
        if (result.taxon.default_photo!=null){
          photos.push(result.taxon.default_photo.medium_url);
        }
        photos = photos.concat(result.photos.map(item => item.url))

        let icon = '';
        if (result.taxon.iconic_taxon_name === 'Amphibia' || result.taxon.iconic_taxon_name === 'Mammalia') {
          icon = MammaliaIcon;
        }
        else if (result.taxon.iconic_taxon_name === 'Reptilia') {
          icon = ReptiliaIcon;
        }
        else if (result.taxon.iconic_taxon_name === 'Aves') {
          icon = AvesIcon;
        }
        else {
          icon = AnimalIcon;
        }

        return {
          key: result.id,
          longitude: parseFloat(result.geojson.coordinates[0]),
          latitude: parseFloat(result.geojson.coordinates[1]),
          place: result.place_guess,
          photos: photos,
          observed_at: result.time_observed_at,
          observations_count: result.taxon.observations_count,
          name: result.taxon.preferred_common_name,
          icon: icon,
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
      <div id='map'>
        <div className='map-wrapper'>
          <div className='wrapper'>
            <div className={"search"+(this.state.searchIsOpen ? " open" : '')}>
              <div className="button button-large searchIcon" onClick={() => this.toggleModal('search')}>
                <img className="button-icon" src={SearchIcon} alt="Search" />
              </div>
              <div className='searchFormGroup'>
                <button className="close button-large" type="close" onClick={() => this.toggleModal()}>
                  <img className="button-icon" src={CloseIcon} alt="Close" />
                </button>
                <SearchAutocomplete
                  value={this.state.searchBy}
                  onChangeValue={this.getMarkers}
                  keywords={this.state.keywords}
                />
                {false && <button className="submit button-large" type="submit" onClick={() => this.toggleModal()}>
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
                        this.getMarkers();
                      }}>
                        <img className="button-icon" src={CloseIcon} alt="Close" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="filter">
              <label className="filter-open-button" htmlFor="filter-open">
                <div className="button button-large filterIcon" onClick={() => this.toggleModal('filter')}>
                  <img className="button-icon" src={FilterIcon} alt="Filter" />
                </div>
              </label>

              {this.state.filterIsOpen && (
                <div className='filterGroup'>
                  <input type="checkbox" className="filter-open" name="filter-open" id="filter-open" />
                  <div className="button button-large filter-item" onClick={() => this.toggleModal()}>
                    <img className="button-icon close-filter" src={CloseIcon} alt="Close" />
                  </div>
                  <div className="button filter-item" onClick={() => this.toggleModal()}>
                    <img className="button-icon" src={FilterIconCaptive} alt="Captive" />
                  </div>
                  <div className="button filter-item" onClick={() => this.toggleModal()}>
                    <img className="button-icon" src={FilterIconDate} alt="Date" />
                  </div>
                  <div className="button filter-item" onClick={() => this.toggleModal()}>
                    <img className="button-icon" src={FilterIconDistance} alt="Distance" />
                  </div>
                </div>
              )}
              <div className='filter-dialog captive-filter'>
                <p className='filter-title'>Captivity</p>
                  <div className='filter-content'>
                    <div className='captivity-option captivity-option-selected'>
                      <p>Yes</p>
                    </div>

                    <div className='captivity-option'>
                      <p>No</p>
                    </div>
                  </div>
              </div>

              <div className='filter-dialog distance-filter'>
                <p className='filter-title'>Distance</p>
                  <div className='filter-content'>
                      <Distance />
                  </div>
              </div>

              <div className='filter-dialog date-filter'>
                <p className='filter-title'>Date</p>
                  <div className='filter-content'>
                    <Date />
                  </div>
              </div>

            </div>


            <Help isOpen={this.state.helpIsOpen} toggleModal={this.toggleModal} />
          </div>
        </div>
        <MapWithAMarkerClusterer
          markers={this.state.markers}
          center={this.state.position}
          onPinOpen={() => {
            this.updateMarkers = false;
            this.toggleModal();
          }}
          onPinClose={() => {
            this.updateMarkers = true;
            this.toggleModal();
          }}
          onChangeValue={this.getMarkers}
          bounds={this.state.bounds}
        />
      </div>
    );
  }
}
