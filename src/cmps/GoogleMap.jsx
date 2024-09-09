import GoogleMapReact from 'google-map-react';
import { GiPositionMarker } from "react-icons/gi";
import PropTypes from 'prop-types'

const Marker = () => <div style={{ color: 'red', fontSize: '50px' }}><GiPositionMarker /></div>;

export const GoogleMap = ({ lat = 33, lng = 33 }) => {
    const zoom = 11

    console.log("cord", lat, lng)
    return (
        <div style={{ height: '70vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBJ2YmMNH_NuHcoX7N49NXljbkOCoFuAwg" }}
                center={{ lat, lng }}
                defaultZoom={zoom}
            >
                <Marker text={'Marker'} lat={lat} lng={lng} />
            </GoogleMapReact>
        </div>
    );
};

GoogleMap.propTypes = {
    lat: PropTypes.num.isRequired, 
    lng: PropTypes.num.isRequired,
}