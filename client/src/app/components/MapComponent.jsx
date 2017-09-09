import React from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import { observer } from 'mobx-react';

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
const MapGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.latitude, lon: props.longitude }}
  />
));

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */

@observer
export default class Map extends React.Component {

  render() {
      let { store } = this.props;
      const status = store.status;
      console.log('map: status:', status);

    return (
        <div>
        { status !== undefined ? (
            <MapGoogleMap
                containerElement={
                    <div style={{height: `500px`}}/>
                }
                mapElement={
                    <div style={{height: `100%`}}/>
                }
                latitude={ status.latitude }
                longitude={ status.longitude }
            />
        ) : (
            <div>Loading...</div>
        )}
        </div>
    );
  }
}