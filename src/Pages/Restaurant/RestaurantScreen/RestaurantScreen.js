//---------- React ----------//

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import Button from "../../../Details/Buttons/Button";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import HeartButton from "../../../Details/Buttons/HeartButton";
import AddSmall from "../../../Icons/AddSmall.svg";
import MenuRestaurant from "../../../Details/Menus/MenuRestaurant";
import ReviewComposer from "../../../Components/Forms/ReviewComposer";
import AddToList from "../../../Components/Forms/AddToList";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import ReviewEditor from "../../../Components/Forms/ReviewEditor";

//---------- Others ----------//

import "./RestaurantScreen.css";
import { formatToAmPm } from "../../../Utilities/formatting";
import { UserContext } from "../../../App";
import {
  getRestaurantData,
  getRestaurantMakanlists,
  getRestaurantReviews,
  getUpvoteCount,
  getUpvoteStatus,
  handleHeart,
} from "../../../Utilities/fetch";
import Fade from "../../../Details/Animation/Fade";

//------------------------------//

const RestaurantScreen = () => {
  const { placeId } = useParams();
  const { user } = useContext(UserContext);
  const route = "restaurants";

  //-------------- States --------------//

  const [data, setData] = useState(null);
  const [heart, setHeart] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(null);
  const [openingHours, setOpeningHours] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [hasReview, setHasReview] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [makanlists, setMakanlists] = useState(null);

  //---------- Display Toggles ----------//

  const [showMenu, setShowMenu] = useState(false);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [reviewEditToggle, setReviewEditToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  //--------- useEffect Functions ---------//

  // Get restaurant data and upvote status
  useEffect(() => {
    // Get restaurant page data
    const getData = async (placeId) => {
      try {
        const restaurantData = await getRestaurantData(placeId);
        setData(restaurantData);
        const status = await getUpvoteStatus({
          route,
          id: restaurantData.id,
          userId: user.id,
        });
        setHeart(status);
      } catch (err) {
        console.log(err);
      }
    };

    getData(placeId);
    // eslint-disable-next-line
  }, [user]);

  // Get upvote count
  useEffect(() => {
    if (data) {
      getUpvoteCount({
        route,
        id: data.id,
        setUpvoteCount,
      });
    }
  }, [heart, data]);

  // Get restaurant reviews and format opening hours
  useEffect(() => {
    const getData = async (placeId) => {
      try {
        // Get restaraunt reviews
        const reviews = await getRestaurantReviews(placeId);
        setReviews(reviews.length > 0 ? reviews : null);

        // Get restaurant makanlists
        const makanlists = await getRestaurantMakanlists(placeId);
        setMakanlists(makanlists.length > 0 ? makanlists : null);
      } catch (err) {
        console.log(err);
      }
    };

    if (data && data.openinghours) {
      // Get opening hours
      const hourDisplay = data.openinghours.map((day) => (
        <div key={day.day} className="restaurant-content-details-row">
          <p>{day.day}</p> <p>•</p>
          <p>
            {formatToAmPm(day.openingTime)} - {formatToAmPm(day.closingTime)}
          </p>
        </div>
      ));

      setOpeningHours(hourDisplay);
      getData(data.id);
    }
  }, [data, user]);

  useEffect(() => {
    if (reviews) {
      reviews.forEach((review) => {
        if (review.userId === user.id) {
          setHasReview(true);
          setUserReview(review);
        }
      });
    }
  }, [reviews, user]);

  //--------- Action Functions ---------//

  const handleClick = () => {
    window.open(data.googleMapsUrl);
  };

  const handleUpvote = () => {
    handleHeart({ route, id: data.id, userId: user.id, heart, setHeart });
  };

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleToggle = (target) => {
    if (target === "review-composer") {
      setReviewToggle((prev) => !prev);
    } else if (target === "add-to-makanlist") {
      setListToggle((prev) => !prev);
    } else if (target === "review-editor") {
      setReviewEditToggle((prev) => !prev);
    }
  };

  //------------------------------//

  if (!data || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <Fade className="content restaurant-page">
        {reviewToggle && (
          <ReviewComposer handleToggle={handleToggle} place={data} />
        )}
        {reviewEditToggle && (
          <ReviewEditor handleToggle={handleToggle} reviewData={userReview} />
        )}
        {listToggle && (
          <AddToList handleToggle={handleToggle} restaurantId={data.id} />
        )}
        <div className="restaurant-cover">
          {data.photoUrl && <img src={data.photoUrl} alt={data.name} />}
        </div>
        <div className="restaurant-content">
          <div className="restaurant-content-details">
            <div className="restaurant-content-details-group">
              <div className="restaurant-title">
                <h1>{data.name}</h1>
                <div className="restaurant-title-buttons">
                  {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
                  <HeartButton heart={heart} handleClick={handleUpvote} />
                  <img onClick={handleMenu} src={AddSmall} alt="Add Button" />
                  {showMenu && (
                    <MenuRestaurant
                      handleToggle={handleToggle}
                      setShowMenu={setShowMenu}
                      hasReview={hasReview}
                    />
                  )}
                </div>
              </div>
              <div className="restaurant-content-details-row">
                {data.averageRating > 0 && (
                  <Rating score={data.averageRating} />
                )}
                {reviews && reviews.length > 0 && <h4>({reviews.length})</h4>}
                {data.pricerange && <h4 className="lightblue-text">•</h4>}
                {data.pricerange && <h4>{data.pricerange.priceRange}</h4>}
              </div>
              <p className="address">{data.address}</p>
            </div>
            {data.description && (
              <div className="restaurant-content-details-group">
                <h4>Description</h4>
                <p>{data.description}</p>
              </div>
            )}
            {openingHours && openingHours.length !== 0 && (
              <div className="restaurant-content-details-group">
                <h4>Opening Hours</h4>
                {openingHours}
              </div>
            )}

            <Button
              id="directions"
              label="Open Location in Google Maps"
              isActive={true}
              size="medium"
              handleClick={handleClick}
            />
          </div>
          <HorzFeed type="reviews" data={reviews} />
          <HorzFeed type="makanlists" data={makanlists} />
        </div>
      </Fade>
    );
  }
};

export default RestaurantScreen;
