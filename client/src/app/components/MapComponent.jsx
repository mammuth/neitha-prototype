import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { observer } from 'mobx-react';
import Image from '../components/ImageComponent.jsx'

const DEFAULT_ZOOM_LEVEL = 18;
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const MapGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={ DEFAULT_ZOOM_LEVEL }
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
    center={{ lat: props.latitude, lng: props.longitude }}>
      <Marker
          // onClick={_.noop}
          // onRightClick={_.noop}
          // onDragStart={_.noop}
          position={{ lat: props.latitude, lng: props.longitude }}
      />
  </GoogleMap>
));

@observer
export default class Map extends React.Component {

  render() {
      let { store } = this.props;
      const location = store.lastLocation;

    return (
        <div>
        { location !== undefined ? (
            <MapGoogleMap
                containerElement={
                    <div className="map-container"/>
                }
                mapElement={
                    <div className="map"/>
                }
                latitude={ location.lat }
                longitude={ location.lon }
            />
        ) : (
            <div className="loading">
                <Image src="loading.gif" alt="loading..." />
            </div>
        )}
        </div>
    );
  }
}