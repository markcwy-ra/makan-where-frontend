import { useNavigate, useParams } from "react-router-dom";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import HeartButton from "../../../Details/Buttons/HeartButton";

//---------- Others ----------//

import "./RestaurantReview.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../App";
import { bearerToken } from "../../../Utilities/token";
import axios from "axios";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";

//------------------------------//

const RestaurantReview = () => {
  const { placeId, userId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(null);

  useEffect(() => {
    const getUpvoteStatus = async (reviewId) => {
      const upvoteStatus = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}/upvote/${user.id}`,
        bearerToken(user.token)
      );
      setHeart(upvoteStatus.data.hasUpvoted);
    };

    const getReviewData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/restaurant/${placeId}/user/${userId}`,
        bearerToken(user.token)
      );
      setData(response.data);
      getUpvoteStatus(response.data.id);
    };

    getReviewData();
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    // Get upvote count
    const getUpvoteCount = async (reviewId) => {
      const upvoteCount = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/${reviewId}/upvotes/count`,
        bearerToken(user.token)
      );
      setUpvoteCount(upvoteCount.data.count);
    };
    if (data) {
      getUpvoteCount(data.id);
    }
  }, [heart, data, user]);

  const handleHeart = async () => {
    if (heart) {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/${data.id}/upvote/remove/${user.id}`,
        bearerToken(user.token)
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/${data.id}/upvote`,
        { userId: user.id },
        bearerToken(user.token)
      );
    }
    setHeart((prev) => !prev);
  };

  const handleClick = () => {
    navigate(`/places/${data.restaurant.placeId}`);
  };

  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="content restaurant-review">
        <img
          className="review-cover"
          src={data.photoUrl}
          alt={data.restaurant.name}
        />
        <div className="review-content">
          <div className="review-content-details">
            <h4 onClick={handleClick}>{data.restaurant.name}</h4>
            <div className="review-title">
              <h1>{data.title}</h1>
              <div className="review-title-buttons">
                {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
                <HeartButton heart={heart} handleClick={handleHeart} />
              </div>
            </div>
            <div className="review-content-details-row">
              <Rating score={data.rating} />
            </div>
            <h4>Review by @{data.user.username}</h4>
          </div>
          <div className="divider-dotted" />
          <div className="review-content-details">
            <h4>Recommended Items</h4>
            <p>{data.recommendedDishes}</p>
          </div>
          <div className="divider-dotted" />
          <p className="review-paragraph">{data.body}</p>
        </div>
      </div>
    );
  }
};

export default RestaurantReview;
