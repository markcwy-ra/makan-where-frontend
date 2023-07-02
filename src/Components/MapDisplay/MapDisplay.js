// global google
import "./MapDisplay.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import { getMapMarkers } from "../../Utilities/fetch";
import Button from "../../Details/Buttons/Button";

const MapDisplay = () => {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [initialLoad, setInitialLoad] = useState(false);
  const [searchButton, setSearchButton] = useState(false);

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
  }, []);

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (id, lat, lng) => {
    map?.panTo({ lat, lng });
    setSelectedMarker(id);
    setIsInfoOpen(true);
  };

  const handleIdle = async () => {
    if (!initialLoad) {
      const coords = map.getBounds();
      const places = await getMapMarkers(coords);
      setMarkers(places.data.restaurants);
      setInitialLoad(true);
    }
  };

  const handleDrag = () => {
    setSearchButton(true);
  };

  const handleMapMove = () => {
    setIsInfoOpen(false);
  };

  const handleSearch = async () => {
    const coords = map.getBounds();
    const places = await getMapMarkers(coords);
    setMarkers(places.data.restaurants);
    setSearchButton(false);
  };

  return (
    <div className="content">
      <div className="map-display">
        {searchButton && (
          <div className="map-search-button">
            <Button
              id="search-button"
              label="Search this area"
              size="medium"
              handleClick={handleSearch}
            />
          </div>
        )}
        {!isLoaded || !location ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-display"
            center={location}
            zoom={15}
            onLoad={onLoad}
            onIdle={handleIdle}
            onZoomChanged={handleMapMove}
            onDragStart={handleMapMove}
            onDragEnd={handleDrag}
          >
            <MarkerF
              key={location.lat}
              position={{
                lat: location.lat,
                lng: location.lng,
              }}
              icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
            />
            {markers?.map((restaurant) => (
              <MarkerF
                key={restaurant.id}
                position={{
                  lat: restaurant.location.latitude,
                  lng: restaurant.location.longitude,
                }}
                onClick={() =>
                  handleMarkerClick(
                    restaurant.id,
                    restaurant.location.latitude,
                    restaurant.location.longitude
                  )
                }
              >
                {isInfoOpen && selectedMarker === restaurant.id && (
                  <RestaurantCard config="small" content={restaurant} />
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
