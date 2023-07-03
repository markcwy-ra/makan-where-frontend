import "./RestaurantCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../App";
import { addToMakanlist, getRestaurantData } from "../../../Utilities/fetch";

const RestaurantCard = ({
  config = "full",
  content,
  type = "default",
  setData,
  listId,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleClick = async () => {
    if (type === "default") {
      if (content.placeId) {
        navigate(`/places/${content.placeId}`);
      } else {
        navigate(`/places/${content.place_id}`);
      }
    } else if (type !== "form-selected") {
      const response = await getRestaurantData(content.place_id);
      if (type === "form-result") {
        setData(response);
      } else if (type === "list-add") {
        await addToMakanlist({
          userId: user.id,
          listId,
          restaurantId: response.id,
        });
        setData((prev) => [...prev, response]);
      }
    }
  };

  if (content.photoUrl) {
    return (
      <div
        className={`card-restaurant-${config} ${
          type !== "form-selected" && "clickable"
        }`}
        onClick={handleClick}
      >
        <img src={content.photoUrl} alt={content.name} />
        <div className={`card-restaurant-${config}-title`}>
          <h3>{content.name}</h3>
          {content.averageRating !== 0 && (
            <h4 className="rating-byline">
              <Rating score={content.averageRating} size="small" />
            </h4>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={`card-restaurant-search`} onClick={handleClick}>
        <h3>{content.name}</h3>
        <p>{content.address ? content.address : content.vicinity}</p>
      </div>
    );
  }
};

export default RestaurantCard;
