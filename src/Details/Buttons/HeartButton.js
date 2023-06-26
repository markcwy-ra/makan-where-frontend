import HeartFull from "../../Icons/HeartFull.svg";
import HeartEmpty from "../../Icons/HeartEmpty.svg";

const HeartButton = ({ heart, handleClick }) => {
  return (
    <img
      className="heart-button"
      onClick={handleClick}
      src={heart ? HeartFull : HeartEmpty}
      alt="Heart Button"
    />
  );
};

export default HeartButton;
