import "./RestaurantCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bearerToken } from "../../../Utilities/token";
import { useContext } from "react";
import { UserContext } from "../../../App";

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
      navigate(`/places/${content.id}`);
    } else {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/restaurants/${content.place_id}`,
        bearerToken(user.token)
      );
      if (type === "form-result") {
        setData(response.data.data);
      } else if (type === "list-add") {
        setData((prev) => [...prev, response.data.data]);
        const addToList = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${user.id}/${listId}`,
          { restaurantId: response.data.data.id },
          bearerToken(user.token)
        );
        console.log(addToList);
      }
    }
  };

  if (content.photoUrl) {
    return (
      <div className={`card-restaurant-${config}`} onClick={handleClick}>
        <img src={content.photoUrl} alt={content.name} />
        <div className={`card-restaurant-${config}-title`}>
          <h3>{content.name}</h3>
          {content.averageRating && (
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
        <p>{content.address}</p>
      </div>
    );
  }
};

export default RestaurantCard;
