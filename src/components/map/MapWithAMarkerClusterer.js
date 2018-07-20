import React from 'react';
import { compose, withProps, withHandlers, withStateHandlers } from "recompose";

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const mapStyles = require("./mapStyles");
const pinIcon = require('../../images/pin.svg');
const clusterIcon = require('../../images/pin.svg');

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
  withStateHandlers(() => ({
    isOpen: false,
  }),
  {
    onToggleOpen: ({ isOpen }) => (key) => ({
      isOpen: (key) ? key : false
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.center.latitude, lng: props.center.longitude }}
    defaultOptions={{
      styles: mapStyles,
      disableDefaultUI: false,
      mapTypeControl: false,
      scaleControl: false,
      zoomControl: true,
      streetViewControl: false,
      fullscreenControl: false,
    }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultClusterClass="cluster"
      styles={[{
        url: clusterIcon,
        textColor: '#03B2A5',
        width: 36,
        height: 48
      }]}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.key}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={ ()=>{props.onToggleOpen(marker.key)} }
          icon={{
            url: pinIcon
          }}
        >
          { (props.isOpen===marker.key) && <InfoWindow onCloseClick={props.onToggleOpen}>
            <div>
              <h2>{marker.name}</h2>
              <p>Observations Count: {marker.observations_count}</p>
              <p>{marker.place}</p>
              <p>{marker.wikipedia_url}</p>
              <ul>
                {marker.photos.slice(0,1).map((url, i) => {
                  return (<li key={marker.key+'-'.i}> <img src={url} alt="" /></li>);
                })}
              </ul>
            </div>
          </InfoWindow>}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);