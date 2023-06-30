import "./ReviewCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({ config = "full", content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/places/${content.restaurantId}/${content.reviewId}`);
  };

  return (
    <div className={`card-review-${config}`} onClick={handleClick}>
      <img src={content.photoUrl} alt={content.restaurant.name} />
      <div className={`card-review-${config}-title`}>
        <h4>{content.restaurant.name}</h4>
        <p>{content.title}</p>
        <h4 className="rating-byline">
          <Rating score={content.rating} size="small" />
          {config === "full" && `Review by @${content.author}`}
        </h4>
      </div>

      {config === "full" && <div className="profile-pic"></div>}
    </div>
  );
};

export default ReviewCard;
