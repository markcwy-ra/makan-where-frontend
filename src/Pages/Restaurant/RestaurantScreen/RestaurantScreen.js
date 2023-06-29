import { useState, useEffect, useContext } from "react";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import Button from "../../../Details/Buttons/Button";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import HeartButton from "../../../Details/Buttons/HeartButton";
import AddSmall from "../../../Icons/AddSmall.svg";
import MenuRestaurant from "../../../Details/Menus/MenuRestaurant";
import ReviewComposer from "../../../Components/Forms/ReviewComposer";
import ListComposer from "../../../Components/Forms/ListComposer";

//---------- Others ----------//

import "./RestaurantScreen.css";
import { tempRestPageData } from "../../../tempData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { bearerToken } from "../../../Utilities/token";
import { formatToAmPm, capitalise } from "../../../Utilities/formatting";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { UserContext } from "../../../App";

//------------------------------//

const RestaurantScreen = () => {
  const { placeId } = useParams();
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const tempData = { ...tempRestPageData };

  const [token, setToken] = useState(null);
  const [heart, setHeart] = useState(false);
  const [upvotes, setUpvotes] = useState(null);
  const [openingHours, setOpeningHours] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  useEffect(() => {
    // Get restaurant data
    const accessToken = localStorage.getItem("token");
    setToken(accessToken);
    const getRestaurantData = async (placeId) => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/restaurants/${placeId}`,
        bearerToken(accessToken)
      );
      setData(response.data.data);
      console.log("Place data: ", data);
      const upvoteCount = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/restaurants/${data.id}/upvotes/count`,
        bearerToken(accessToken)
      );
      setUpvotes(upvoteCount.data.count);
    };
    getRestaurantData(placeId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Get opening hours
    if (data && data.openinghours) {
      const hourDisplay = data.openinghours.map((day) => (
        <div key={day.day} className="restaurant-content-details-row">
          <p>{day.day}</p> <p>•</p>
          <p>
            {formatToAmPm(day.openingTime)} - {formatToAmPm(day.closingTime)}
          </p>
        </div>
      ));

      setOpeningHours(hourDisplay);
    }
  }, [data]);

  const handleClick = () => {
    window.open(data.googleMapsUrl);
  };
  const handleHeart = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/restaurants/${data.id}/upvote`,
      { userId: user.id },
      bearerToken(token)
    );
    console.log(response);
    setHeart((prev) => !prev);
  };
  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const handleToggle = (target) => {
    if (target === "review-composer") {
      setReviewToggle((prev) => !prev);
    } else if (target === "makanlist-composer") {
      setListToggle((prev) => !prev);
    }
  };
  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="content restaurant-page">
        {reviewToggle && (
          <ReviewComposer handleToggle={handleToggle} place={tempData} />
        )}
        {listToggle && <ListComposer handleToggle={handleToggle} />}
        <div className="restaurant-cover">
          {data.photoUrl && <img src={data.photoUrl} alt={data.name} />}
        </div>
        <div className="restaurant-content">
          <div className="restaurant-content-details">
            <div className="restaurant-content-details-group">
              <div className="restaurant-title">
                <h1>{data.name}</h1>
                <div className="restaurant-title-buttons">
                  {upvotes && <h4>{upvotes}</h4>}
                  <HeartButton heart={heart} handleClick={handleHeart} />
                  <img onClick={handleMenu} src={AddSmall} alt="Add Button" />
                  {showMenu && (
                    <MenuRestaurant
                      handleToggle={handleToggle}
                      setShowMenu={setShowMenu}
                    />
                  )}
                </div>
              </div>
              <div className="restaurant-content-details-row">
                {data.averageRating && (
                  <>
                    <Rating score={data.averageRating} />
                    <h4>({tempData.reviews.length})</h4>
                  </>
                )}
              </div>
              <div className="restaurant-content-details-row">
                <p>{capitalise(data.restaurantstatus.status)}</p>
                <p>•</p>
                <p>{data.pricerange.priceRange}</p>
              </div>
              <p className="address">{data.address}</p>
            </div>
            {data.description && (
              <div className="restaurant-content-details-group">
                <h4>Description</h4>
                <p>{data.description}</p>
              </div>
            )}
            {openingHours && (
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
          <HorzFeed type="reviews" data={tempData.reviews} />
        </div>
      </div>
    );
  }
};

export default RestaurantScreen;
