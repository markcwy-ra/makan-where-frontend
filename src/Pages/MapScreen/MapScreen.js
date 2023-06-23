import Header from "../../Components/Header/Header";
import MapDisplay from "../../Components/MapDisplay/MapDisplay";

const MapScreen = () => {
  return (
    <>
      <Header icon="map">
        <h1>Makan Map</h1>
      </Header>
      <MapDisplay />
    </>
  );
};

export default MapScreen;
