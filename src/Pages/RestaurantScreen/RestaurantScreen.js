import "./RestaurantScreen.css";
import { tempReviewData, testRestPageData } from "../../tempData";
import Rating from "../../Details/Ratings/Rating";
import Button from "../../Details/Buttons/Button";
import HorzFeed from "../../Components/Feeds/HorzFeed";

const RestaurantScreen = () => {
  const data = { ...testRestPageData };
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div className="content restaurant-page">
      <img className="restaurant-cover" src={data.photoUrl} alt={data.name} />
      <div className="restaurant-content">
        <div className="restaurant-content-details">
          <h1>{data.name}</h1>
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
            label="Open in Google Maps"
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
