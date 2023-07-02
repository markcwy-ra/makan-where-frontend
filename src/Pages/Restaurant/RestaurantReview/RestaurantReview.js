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
import EditButton from "../../../Details/Buttons/EditButton";
import ReviewEditor from "../../../Components/Forms/ReviewEditor";
import {
  getUpvoteCount,
  getUpvoteStatus,
  handleHeart,
} from "../../../Utilities/fetch";

//------------------------------//

const RestaurantReview = () => {
  const { placeId, userId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [reviewEditToggle, setReviewEditToggle] = useState(false);
  const route = "reviews";

  useEffect(() => {
    const getReviewData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/restaurant/${placeId}/user/${userId}`,
        bearerToken(user.token)
      );
      setData(response.data);
      getUpvoteStatus({
        route,
        id: response.data.id,
        userId: user.id,
        setHeart,
      });
    };
    getReviewData();
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (data) {
      getUpvoteCount({
        route,
        id: data.id,
        setUpvoteCount,
      });
    }
  }, [data, heart]);

  useEffect(() => {
    if (Number(userId) === user.id) {
      setIsUser(true);
    }
  }, [user, userId]);

  const handleUpvote = () => {
    handleHeart({ route, id: data.id, userId: user.id, heart, setHeart });
  };

  const handleEdit = () => {
    setReviewEditToggle((prev) => !prev);
  };

  const handleClick = () => {
    navigate(`/places/${data.restaurant.placeId}`);
  };

  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="content restaurant-review">
        {reviewEditToggle && (
          <ReviewEditor
            handleToggle={handleEdit}
            reviewData={data}
            setReviewData={setData}
          />
        )}
        <div className="review-cover">
          {data.photoUrl && (
            <img src={data.photoUrl} alt={data.restaurant.name} />
          )}
        </div>
        <div className="review-content">
          <div className="review-content-details">
            <h4 onClick={handleClick}>{data.restaurant.name}</h4>
            <div className="review-title">
              <h1>{data.title}</h1>
              <div className="review-title-buttons">
                {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
                <HeartButton heart={heart} handleClick={handleUpvote} />
                {isUser && <EditButton handleClick={handleEdit} />}
              </div>
            </div>
            <div className="review-content-details-row">
              <Rating score={data.rating} />
            </div>

            <h4>Review by {isUser ? "you" : `@${data.user.username}`}</h4>
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
