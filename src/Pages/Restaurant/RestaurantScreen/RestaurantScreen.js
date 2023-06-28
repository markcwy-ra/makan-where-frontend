import { useState, useEffect } from "react";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import Button from "../../../Details/Buttons/Button";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import HeartButton from "../../../Details/Buttons/HeartButton";
import AddSmall from "../../../Icons/AddSmall.svg";

//---------- Others ----------//

import "./RestaurantScreen.css";
import { tempRestPageData } from "../../../tempData";
import MenuRestaurant from "../../../Details/Menus/MenuRestaurant";
import ReviewComposer from "../../../Components/Forms/ReviewComposer";
import ListComposer from "../../../Components/Forms/ListComposer";

//------------------------------//

const RestaurantScreen = () => {
  const data = { ...tempRestPageData };
  const [heart, setHeart] = useState(false);
  const [openingHours, setOpeningHours] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  useEffect(() => {
    const hours = {
      Monday: "Closed",
      Tuesday: "Closed",
      Wednesday: "Closed",
      Thursday: "Closed",
      Friday: "Closed",
      Saturday: "Closed",
      Sunday: "Closed",
    };
    data.openingHours.forEach((dayHours) => {
      hours[
        dayHours.day
      ] = `${dayHours.opening_time} - ${dayHours.closing_time}`;
    });
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const hourDisplay = daysOfWeek.map((day, index) => {
      return (
        <div key={day} className="restaurant-content-details-row">
          <p>{day}</p> <p>•</p>
          <p>{hours[day]}</p>
        </div>
      );
    });
    setOpeningHours(hourDisplay);
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    window.open(
      `https://www.google.com/maps/place/${data.coordinate.lat},${data.coordinate.lng}`
    );
  };
  const handleHeart = () => {
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

  return (
    <div className="content restaurant-page">
      {reviewToggle && (
        <ReviewComposer handleToggle={handleToggle} place={data} />
      )}
      {listToggle && <ListComposer handleToggle={handleToggle} />}
      <img className="restaurant-cover" src={data.photoUrl} alt={data.name} />
      <div className="restaurant-content">
        <div className="restaurant-content-details">
          <div className="restaurant-content-details-group">
            <div className="restaurant-title">
              <h1>{data.name}</h1>
              <div className="restaurant-title-buttons">
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
              <Rating score={data.avgRating} />
              <h4>({data.reviews.length})</h4>
            </div>
            <div className="restaurant-content-details-row">
              <p>{data.cuisine}</p>
              <p>•</p>
              <p>{data.price}</p>
            </div>
            <p className="address">{data.address}</p>
          </div>
          <div className="restaurant-content-details-group">
            <h4>Opening Hours</h4>
            {openingHours}
          </div>

          <Button
            id="directions"
            label="Open Location in Google Maps"
            isActive={true}
            size="medium"
            handleClick={handleClick}
          />
        </div>
        <HorzFeed type="reviews" data={data.reviews} />
      </div>
    </div>
  );
};

export default RestaurantScreen;
