import React from 'react';
import { compose, withProps, withHandlers } from "recompose";

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const mapStyles = require("./mapStyles");

export const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh8kD3nK9pVOAeIHPMqXzAbaDAkunTHFM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.position.latitude, lng: props.position.longitude }}
    defaultOptions={{ styles: mapStyles }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.key}
          position={{ lat: marker.latitude, lng: marker.longitude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);