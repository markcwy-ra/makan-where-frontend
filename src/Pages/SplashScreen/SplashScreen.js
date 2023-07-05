import { useNavigate } from "react-router-dom";
import Button from "../../Details/Buttons/Button";
import Fade from "../../Details/Animation/Fade";
import "./SplashScreen.css";
import { randomIndex } from "../../Utilities/utils";
import { ReactComponent as LogoFull } from "../../Icons/Logo/LogoFullHorz.svg";

const images = [
  "https://i.imgur.com/7JX5nqm.jpg",
  "https://i.imgur.com/ciSqZkv.jpg",
  "https://i.imgur.com/hwu8nZ3.jpg",
  "https://i.imgur.com/YzyslzF.jpg",
  "https://i.imgur.com/CzmORKO.jpg",
  "https://i.imgur.com/nerEAWX.jpg",
];

const index = randomIndex(images.length);

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "login") {
      navigate("/login");
    } else if (id === "signup") {
      navigate("/signup");
    }
  };

  return (
    <div className="content splashscreen">
      <Fade className="splashscreen-popup">
        <LogoFull className="splashscreen-logo" />
        <h1>For the love of food.</h1>
        <div className="splashscreen-popup-buttons">
          <Button id="login" label="Login" handleClick={handleClick} />
          <Button id="signup" label="Sign Up" handleClick={handleClick} />
        </div>
      </Fade>
      <img
        className="splashscreen-bg"
        src={images[index]}
        alt="Makan Where: Food!"
      />
    </div>
  );
};

export default SplashScreen;
