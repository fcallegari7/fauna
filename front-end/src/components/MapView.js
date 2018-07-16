// MapView.js
import React, { Component } from "react";

const { SearchAutocomplete } = require("./search/SearchAutocomplete");
const { MapWithAMarkerClusterer } = require("./map/MapWithAMarkerClusterer");

var ApiService = require("../services/Api").default;
var Api = new ApiService();

export default class MapView extends Component {
  constructor(props) {
    super(props);

    this.getMarkers = this.getMarkers.bind(this);
  }
  componentWillMount() {
    this.setState({ markers: [] });
    this.setState({ loading: false });
    this.setState({ searchBy: "" });
    this.setState({ searchAutocomplete: [] });
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

  getMarkers(searchBy) {
    this.setState({ searchBy: searchBy });
    // &swlng=-123.19107055664062&swlat=49.29386874004779&nelng=-123.05356979370117&nelat=49.3554050055574
    const action = "observations";
    const query = encodeURI(searchBy);
    const search_on = "name";
    const order = "desc";
    const order_by = "created_at";
    const page = "1";
    const per_page = "100";
    const url = `${action}?geo=true&mappable=true&identified=true&q=${query}&search_on=${search_on}&order=${order}&order_by=${order_by}&page=${page}&per_page=${per_page}`;
    Api.get(url).then(data => {
      data.results = data.results.map((result, key) => {
        return {
          key: key,
          longitude: parseFloat(result.geojson.coordinates[0]),
          latitude: parseFloat(result.geojson.coordinates[1]),
          place: result.place_guess,
          photos: [result.taxon.default_photo.url].concat(result.photos.map(item => item.url)),
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

  requestTimer = null;

  render() {
    return (
      <div className='wrapper'>
        <form action="#">
          <label>
            Search by
            <SearchAutocomplete
              value={this.state.searchBy}
              onChangeValue={this.getMarkers}
              items={this.state.searchAutocomplete}
              requestTimer={this.requestTimer}
            />
          </label>
        </form>
        <MapWithAMarkerClusterer
          markers={this.state.markers}
          center={this.state.position}
        />
      </div>
    );
  }
}
