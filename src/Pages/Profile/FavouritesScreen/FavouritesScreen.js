import "./FavouritesScreen.css";
import { useContext, useEffect, useState } from "react";
import VertFeed from "../../../Components/Feeds/VertFeed";
import { useNavigate } from "react-router-dom";
import Button from "../../../Details/Buttons/Button";
import axios from "axios";
import { bearerToken } from "../../../Utilities/token";
import { UserContext } from "../../../App";

const FavouritesScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [activeToggle, setActiveToggle] = useState("places");
  const [places, setPlaces] = useState(null);
  const [lists, setLists] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getUpvotedRestaurants = async (userId) => {
      try {
        // Get restaraunt details
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/restaurants/user/${userId}/upvotes`,
          bearerToken(user.token)
        );
        setPlaces(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUpvotedMakanlists = async (userId) => {
      try {
        // Get restaraunt details
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${userId}/upvotes`,
          bearerToken(user.token)
        );
        setLists(response.data.upvotedMakanlists);
      } catch (err) {
        console.log(err);
      }
    };

    const getUpvotedReviews = async (userId) => {
      try {
        // Get restaraunt details
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}/upvotes`,
          bearerToken(user.token)
        );
        setReviews(response.data.upvotedReviews);
      } catch (err) {
        console.log(err);
      }
    };

    getUpvotedRestaurants(user.id);
    getUpvotedMakanlists(user.id);
    getUpvotedReviews(user.id);
  }, [user]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };

  return (
    <div className="favourites-screen">
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
        {activeToggle === "makanlists" && (
          <VertFeed data={lists} type="makanlists" />
        )}
        {activeToggle === "reviews" && (
          <VertFeed data={reviews} type="reviews" />
        )}
      </div>
    </div>
  );
};

export default FavouritesScreen;
