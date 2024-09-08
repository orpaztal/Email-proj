import GoogleMapReact from 'google-map-react';
import { GiPositionMarker } from "react-icons/gi";

const Marker = () => <div style={{ color: 'red', fontSize: '30px' }}><GiPositionMarker /></div>;

export const GoogleMap = ({ lat = 33, lng = 33 }) => {
    const zoom = 12;
    const API_KEY = "AIzaSyBJ2YmMNH_NuHcoX7N49NXljbkOCoFuAwg"//'AIzaSyAwHV6JWQnrpncsZgM6wWQ8g_f_umWnxG0'

    return (
        <div style={{ height: '50%', width: '50%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={{ lat, lng }}
                defaultZoom={zoom}
            >
                <Marker text={'Marker'} lat={lat} lng={lng} />
            </GoogleMapReact>
        </div>
    );
};