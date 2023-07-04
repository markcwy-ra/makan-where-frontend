import Fade from "../../Details/Animation/Fade";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <Fade className="content loading-screen">
      <h1>Loading</h1>
    </Fade>
  );
};

export default LoadingScreen;
