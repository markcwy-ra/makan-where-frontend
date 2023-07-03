import "./ReviewCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";
import { useNavigate } from "react-router-dom";
import User from "../../../Icons/User.svg";

const ReviewCard = ({ config = "full", content }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/places/${content.restaurant.placeId}/${content.userId}`);
  };

  return (
    <div className={`card-review-${config}`} onClick={handleClick}>
      <div className={`card-review-${config}-image`}>
        {content.photoUrl && (
          <img src={content.photoUrl} alt={content.restaurant.name} />
        )}
      </div>
      <div className={`card-review-${config}-title`}>
        <h4>{content.restaurant.name}</h4>
        <p>{content.title}</p>
        <h4 className="rating-byline">
          <Rating score={content.rating} size="small" />
          {config === "full" && `Review by @${content.user.username}`}
        </h4>
      </div>
      {config === "full" && (
        <img
          id={content.id}
          className="profile-pic"
          src={content.user.photoUrl ? content.user.photoUrl : User}
          alt={`${content.user.username}'s Profile Pic`}
        />
      )}
    </div>
  );
};

export default ReviewCard;
