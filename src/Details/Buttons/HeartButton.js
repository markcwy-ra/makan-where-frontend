import HeartFull from "../../Icons/HeartFull.svg";
import HeartEmpty from "../../Icons/HeartEmpty.svg";

const HeartButton = ({ handleClick }) => {
  return (
    <img
      className="heart-button"
      onClick={handleClick}
      src={HeartEmpty}
      alt="Heart Button"
    />
  );
};

export default HeartButton;
