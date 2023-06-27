import { useNavigate } from "react-router-dom";
import Button from "../../Details/Buttons/Button";
import "./SplashScreen.css";

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
      <div className="splashscreen-popup">
        <h4>MAKAN WHERE</h4>
        <h1>For the love of food.</h1>
        <div className="splashscreen-popup-buttons">
          <Button id="login" label="Login" handleClick={handleClick} />
          <Button id="signup" label="Sign Up" handleClick={handleClick} />
        </div>
      </div>
      <img src="https://i.imgur.com/7JX5nqm.jpg" alt="Makan Where: Food!" />
    </div>
  );
};

export default SplashScreen;
