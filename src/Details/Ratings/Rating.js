import StarFull from "../../Icons/StarFull.svg";
import StarEmpty from "../../Icons/StarEmpty.svg";
import "./Rating.css";

const Rating = ({ score, size = "small" }) => {
  let stars = ["empty", "empty", "empty", "empty", "empty"];
  let roundedScore = Math.round(score);
  for (let i = 0; i < roundedScore; i++) {
    stars[i] = "full";
  }

  const starDisplay = stars.map((star, index) => {
    if (star === "full") {
      return <img key={index} src={StarFull} alt="Full Star" />;
    } else {
      return <img key={index} src={StarEmpty} alt="Full Star" />;
    }
  });

  return <div className={`star-rating star-${size}`}>{starDisplay}</div>;
};

export default Rating;
