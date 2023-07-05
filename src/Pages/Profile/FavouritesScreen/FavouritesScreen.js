import "./FavouritesScreen.css";
import { useContext, useEffect, useState } from "react";
import VertFeed from "../../../Components/Feeds/VertFeed";
import { useNavigate } from "react-router-dom";
import Button from "../../../Details/Buttons/Button";
import { UserContext } from "../../../App";
import { getUpvotedData } from "../../../Utilities/fetch";
import Fade from "../../../Details/Animation/Fade";

const FavouritesScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeToggle, setActiveToggle] = useState("places");
  const [places, setPlaces] = useState(null);
  const [lists, setLists] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getData = async (userId) => {
      try {
        const places = await getUpvotedData({ route: "restaurants", userId });
        setPlaces(places);
        const lists = await getUpvotedData({ route: "makanlists", userId });
        setLists(lists.upvotedMakanlists);
        const reviews = await getUpvotedData({ route: "reviews", userId });
        setReviews(reviews.upvotedReviews);
      } catch (err) {
        console.log(err);
      }
    };
    getData(user.id);
  }, [user]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };

  return (
    <Fade className="favourites-screen">
      <h4 className="back-button" onClick={handleClick}>
        ← Back
      </h4>
      <h1>Favourites</h1>
      <div className="search-toggles">
        <Button
          label="Places"
          id="places"
          size="small"
          isActive={activeToggle === "places" ? true : false}
          handleClick={handleToggle}
        />
        <Button
          label="Makanlists"
          id="makanlists"
          size="small"
          isActive={activeToggle === "makanlists" ? true : false}
          handleClick={handleToggle}
        />
        <Button
          label="Reviews"
          id="reviews"
          size="small"
          isActive={activeToggle === "reviews" ? true : false}
          handleClick={handleToggle}
        />
      </div>
      <div className="favourites-screen-feed">
        {activeToggle === "places" && (
          <VertFeed data={places} type="restaurants" />
        )}
        {activeToggle === "places" && places && places.length === 0 && (
          <h2 className="content-none">No favourite places</h2>
        )}
        {activeToggle === "makanlists" && (
          <VertFeed data={lists} type="makanlists" />
        )}
        {activeToggle === "makanlists" && lists && lists.length === 0 && (
          <h2 className="content-none">No favourite Makanlists</h2>
        )}
        {activeToggle === "reviews" && (
          <VertFeed data={reviews} type="reviews" />
        )}
        {activeToggle === "reviews" && reviews && reviews.length === 0 && (
          <h2 className="content-none">No favourite reviews</h2>
        )}
      </div>
    </Fade>
  );
};

export default FavouritesScreen;
