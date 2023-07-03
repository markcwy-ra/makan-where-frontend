// global google
import "./MapDisplay.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import { getMapMarkers } from "../../Utilities/fetch";
import Button from "../../Details/Buttons/Button";
import LocationMarker from "../../Icons/Location.svg";
import LocationUser from "../../Icons/LocationCurrent.svg";
import getLocation from "../../Utilities/location";
import LoadingScreen from "../../Pages/LoadingScreen/LoadingScreen";

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
    getLocation(setLocation);
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
          <LoadingScreen />
        ) : (
          <GoogleMap
            mapContainerClassName="map-display"
            center={location}
            options={{
              streetViewControl: false,
              fullscreenControl: false,
              mapTypeControl: false,
              clickableIcons: false,
            }}
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
              icon={LocationUser}
            />
            {markers?.map((restaurant) => (
              <MarkerF
                key={restaurant.id}
                position={{
                  lat: restaurant.location.latitude,
                  lng: restaurant.location.longitude,
                }}
                icon={LocationMarker}
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
