import {withGoogleMap, GoogleMap, Marker} from "react-google-maps";


// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// and name it GettingStartedGoogleMap
const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={3}
        defaultCenter={{lat: -25.363882, lng: 131.044922}}
        onClick={props.onMapClick}
    >
        {props.markers.map((marker, index) => (
            <Marker
                {...marker}
                onRightClick={() => props.onMarkerRightClick(index)}
            />
        ))}
    </GoogleMap>
));

export default class Map extends React.Component {

// Then, render it:
    render(

<GettingStartedGoogleMap
containerElement={
    <div style={{height: `100%`}}/>
}
mapElement={
    <div style={{height: `100%`}}/>
}
onMapLoad={_.noop}
onMapClick={_.noop}
markers={markers}
onMarkerRightClick={_.noop}
/>,
    document
.
    getElementById(

    'root'
)
)
    ;
}