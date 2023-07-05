import Fade from "../../Details/Animation/Fade";
import "./LoadingScreen.css";
import { ReactComponent as LogoIcon } from "../../Icons/Logo/LogoIcon.svg";

const LoadingScreen = () => {
  return (
    <Fade className="content loading-screen">
      <div className="rotate">
        <LogoIcon className="loading-icon" />
      </div>
      <h3>Loading</h3>
    </Fade>
  );
};

export default LoadingScreen;
