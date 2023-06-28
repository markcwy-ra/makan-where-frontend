// global google
import "./MapDisplay.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { tempRestaurantList } from "../../tempData";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";

const MapDisplay = () => {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

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
    const generateMarkers = tempRestaurantList.map((restaurant) => ({
      lat: restaurant.coordinate.lat,
      lng: restaurant.coordinate.lng,
      id: restaurant.restaurantId,
    }));
    setMarkers(generateMarkers);
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (id, lat, lng) => {
    map?.panTo({ lat, lng });
    setSelectedMarker(id);
    setIsInfoOpen(true);
    console.log("Marker id:" + id + " clicked at " + lat + "," + lng);
  };

  const handleDrag = () => {
    console.log(map?.getBounds());
  };

  const handleMapMove = () => {
    setIsInfoOpen(false);
  };

  return (
    <div className="content">
      <div className="map-display">
        {!isLoaded || !location || !markers ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-display"
            center={location}
            zoom={15}
            onLoad={onLoad}
            onZoomChanged={handleMapMove}
            onDragStart={handleMapMove}
            onDragEnd={handleDrag}
          >
            {markers.map(({ lat, lng, id }) => (
              <MarkerF
                key={id}
                position={{ lat, lng }}
                onClick={() => handleMarkerClick(id, lat, lng)}
              >
                {isInfoOpen && selectedMarker === id && (
                  <RestaurantCard
                    config="small"
                    content={tempRestaurantList[0]}
                  />
                )}
              </MarkerF>
            ))}
          </GoogleMap>
        )}
      </div>
    </div>
  );
};

export default MapDisplay;
