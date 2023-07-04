import Header from "../../Components/Header/Header";
import MapDisplay from "../../Components/MapDisplay/MapDisplay";
import Fade from "../../Details/Animation/Fade";

const MapScreen = () => {
  return (
    <>
      <Fade>
        <Header icon="map">
          <h1>Makan Map</h1>
        </Header>
      </Fade>
      <MapDisplay />
    </>
  );
};

export default MapScreen;
