import { useNavigate } from "react-router-dom";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import HeartButton from "../../../Details/Buttons/HeartButton";

//---------- Others ----------//

import "./RestaurantReview.css";
import { tempReviewPageData } from "../../../tempData";
import { useState } from "react";

//------------------------------//

const RestaurantReview = () => {
  const data = { ...tempReviewPageData };
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);

  const handleHeart = () => {
    setHeart((prev) => !prev);
  };
  const handleClick = () => {
    navigate(`/places/${data.restaurantId}`);
  };

  return (
    <div className="content restaurant-review">
      <img className="review-cover" src={data.photoUrl} alt={data.name} />
      <div className="review-content">
        <div className="review-content-details">
          <h4 onClick={handleClick}>{data.restaurant}</h4>
          <div className="review-title">
            <h1>{data.title}</h1>
            <div className="review-title-buttons">
              <HeartButton heart={heart} handleClick={handleHeart} />
            </div>
          </div>
          <div className="review-content-details-row">
            <Rating score={data.rating} />
          </div>
          <h4>Review by @{data.author}</h4>
        </div>
        <div className="divider-dotted" />
        <div className="review-content-details">
          <h4>Recommended Items</h4>
          <p>{data.recommended}</p>
        </div>
        <div className="divider-dotted" />
        <p className="review-paragraph">{data.content}</p>
      </div>
    </div>
  );
};

export default RestaurantReview;
