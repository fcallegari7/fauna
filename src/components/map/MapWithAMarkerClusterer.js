import React from 'react';
import { compose, lifecycle, withProps, withState, withStateHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { debounce } from 'lodash'

const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");
const mapStyles = require("./mapStyles");
const pinIcon = require('../../images/pin.svg');
const clusterIcon = require('../../images/pin.svg');
const defaultZoom = 12;

export const MapWithAMarkerClusterer = compose(
  lifecycle({
    componentDidMount() {
      this.changeBounds = debounce(this.props.onChangeValue, 500);
      this.refs = {};
    },
    componentDidUpdate(prevProps) {
      if(prevProps.center.longitude === this.props.center.longitude && prevProps.center.latitude === this.props.center.latitude) {
        return;
      }

      this.setState({
        mapZoom: defaultZoom,
        onMapMounted: ref => {
          if (ref){
            this.refs.map = ref;
          }
          const mapBounds = this.refs.map.getBounds();
          const sw = mapBounds.getSouthWest();
          const ne = mapBounds.getNorthEast();
          const boundsObj = {
            bounds: {
              swlng: sw.lng(),
              swlat: sw.lat(),
              nelng: ne.lng(),
              nelat: ne.lat(),
            }
          };
          this.setState({bounds: boundsObj.bounds}, (w) => {
            this.changeBounds(boundsObj)
          });
        },
        onBoundsChanged: debounce(() => {
          const mapCenter = this.refs.map.getCenter();
          const mapCenterLat = mapCenter.lat();
          const mapCenterLng = mapCenter.lng();
          const mapZoom = this.refs.map.getZoom();
          const mapBounds = this.refs.map.getBounds();
          const sw = mapBounds.getSouthWest();
          const ne = mapBounds.getNorthEast();
          const boundsObj = {
            bounds: {
              swlng: sw.lng(),
              swlat: sw.lat(),
              nelng: ne.lng(),
              nelat: ne.lat(),
            }
          };

          let center = this.props.center;
          if (center.latitude === mapCenterLat && center.longitude === mapCenterLng) {
            // If zooming out redo the search
            if (mapZoom < this.state.mapZoom) {
              this.setState({bounds: boundsObj.bounds, mapZoom: mapZoom}, () => {
                this.changeBounds(boundsObj)
              });
            }
            else {
              this.setState({mapZoom: mapZoom});
            }
          }
          else {
            if (mapCenterLat !== prevProps.center.latitude){
              center.latitude = mapCenterLat;
              center.longitude = mapCenterLng;
            }
            this.setState({center: center}, () => {
              this.changeBounds(boundsObj)
            });
          }
        }, 1000)
      });
    }
    ,
    componentWillUnmount(){
      this.changeBounds.cancel();
      // this.onBoundsChanged.cancel();
    }
  }),
  withState('mapZoom', 'setMapZoom', defaultZoom),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh8kD3nK9pVOAeIHPMqXzAbaDAkunTHFM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(({onPinOpen, onPinClose}) => ({
    isOpen: false,
    onPinOpen: onPinOpen,
    onPinClose: onPinClose,
  }),
  {
    onToggleOpen: ({ isOpen, onPinOpen, onPinClose }) => (key) => {
      if (key) {
        onPinOpen();
        return { isOpen: key};
      }
      else {
        onPinClose()
        return { isOpen: false};
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={props.mapZoom}
    center={{ lat: props.center.latitude, lng: props.center.longitude }}
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
      minimumClusterSize={5}
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
          {props.isOpen===marker.key && (
            <InfoWindow onCloseClick={props.onToggleOpen}>
              <div className="mapCard">
                <ul className="mapCard__photos">
                  {marker.photos.slice(0,1).map((url, i) => {
                    return (<li key={marker.key+'-'.i}> <img src={url} alt="" /></li>);
                  })}
                </ul>
                <h2 className="animal-name">{marker.name}</h2>
                <p className="location">{marker.place}</p>
                <p className="latest-sighting">Sighting at: <span className=''> {marker.observed_at}</span></p>
                <p className="sighting-count">Spotted <span className=''>{marker.observations_count}</span> times</p>
                <a href={marker.wikipedia_url} target='_blank' className="wiki-link">Learn more about the animal </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);