import { useState } from "react";

//---------- Components ----------//

import Rating from "../../../Details/Ratings/Rating";
import Button from "../../../Details/Buttons/Button";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import HeartButton from "../../../Details/Buttons/HeartButton";
import AddSmall from "../../../Icons/AddSmall.svg";

//---------- Others ----------//

import "./RestaurantScreen.css";
import { tempRestPageData } from "../../../tempData";

//------------------------------//

const RestaurantScreen = () => {
  const data = { ...tempRestPageData };
  const [heart, setHeart] = useState(false);

  const handleClick = () => {
    window.open(
      `https://www.google.com/maps/place/${data.coordinate.lat},${data.coordinate.lng}`
    );
  };
  const handleHeart = () => {
    setHeart((prev) => !prev);
  };
  const handleMenu = () => {
    console.log("Add menu");
  };

  return (
    <div className="content restaurant-page">
      <img className="restaurant-cover" src={data.photoUrl} alt={data.name} />
      <div className="restaurant-content">
        <div className="restaurant-content-details">
          <div className="restaurant-title">
            <h1>{data.name}</h1>
            <div className="restaurant-title-buttons">
              <HeartButton heart={heart} handleClick={handleHeart} />
              <img onClick={handleMenu} src={AddSmall} alt="Add Button" />
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
