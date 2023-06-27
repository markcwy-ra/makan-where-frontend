// global google
import "./MapDisplay.css";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const MapDisplay = () => {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  // });

  useEffect(() => {
    const getLocation = async () => {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Can't find your location! Enable location services for your browser in settings."
            );
            setLocation({
              lat: 1.3521,
              lng: 103.8198,
            });
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        }
      );
    };
    getLocation();
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  return (
    <div className="content">
      {/* {!isLoaded && !location ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-display"
          center={location}
          zoom={15}
          onLoad={onLoad}
          onDragEnd={() => console.log(map.getBounds())}
        />
      )} */}
      <div className="map-display" />
    </div>
  );
};

export default MapDisplay;
