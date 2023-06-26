import "./RestaurantCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ config = "full", content }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/places/${content.restaurantId}`);
  };
  return (
    <div className={`card-restaurant-${config}`} onClick={handleClick}>
      <img src={content.photoUrl} alt={content.restaurantName} />
      <div className={`card-restaurant-${config}-title`}>
        <h3>{content.name}</h3>
        <h4 className="rating-byline">
          <Rating score={content.avgRating} size="small" />
        </h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
