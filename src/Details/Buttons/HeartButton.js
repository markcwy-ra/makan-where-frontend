import { ReactComponent as HeartFullIcon } from "../../Icons/HeartFull.svg";
import { ReactComponent as HeartEmptyIcon } from "../../Icons/HeartEmpty.svg";

const HeartButton = ({ heart, handleClick, white = false }) => {
  return heart ? (
    <HeartFullIcon
      className={`heart-button ${white && "white-icon"}`}
      onClick={handleClick}
    />
  ) : (
    <HeartEmptyIcon
      className={`heart-button ${white && "white-icon"}`}
      onClick={handleClick}
    />
  );
};

export default HeartButton;
