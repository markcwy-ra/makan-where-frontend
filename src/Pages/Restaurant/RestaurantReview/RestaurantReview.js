import { useNavigate } from "react-router-dom";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import Button from "../../../Details/Buttons/Button";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import HeartButton from "../../../Details/Buttons/HeartButton";

//---------- Others ----------//

import "./RestaurantReview.css";
import { tempReviewPageData } from "../../../tempData";

//------------------------------//

const RestaurantReview = () => {
  const data = { ...tempReviewPageData };
  const navigate = useNavigate();

  const handleHeart = () => {
    console.log("hearted");
  };

  return (
    <div className="content restaurant-review">
      <img className="review-cover" src={data.photoUrl} alt={data.name} />
      <div className="review-content">
        <div className="review-content-details">
          <h4>{data.restaurant}</h4>
          <div className="review-title">
            <h1>{data.title}</h1>
            <div className="review-title-buttons">
              <HeartButton handleClick={handleHeart} />
            </div>
          </div>
          <div className="review-content-details-row">
            <Rating score={data.rating} />
          </div>
          <h4>Review by @{data.author}</h4>
          <p className="review-paragraph">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReview;
