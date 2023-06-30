import { useContext, useEffect, useState } from "react";

//---------- Components ----------//

import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import Close from "../../Icons/Close.svg";
import StarFull from "../../Icons/StarFull.svg";
import StarEmpty from "../../Icons/StarEmpty.svg";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Others ----------//

import "./Forms.css";
import { bearerToken } from "../../Utilities/token";
import { UserContext } from "../../App";
import axios from "axios";
import ErrorPill from "../../Details/Errors/ErrorPill";

//------------------------------//

const ReviewComposer = ({ handleToggle, place = null }) => {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  //---------- Form States ----------//

  const [rating, setRating] = useState(0);
  const [ratingDisplay, setRatingDisplay] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [recommendedDishes, setRecommendedDishes] = useState("");
  const [file, setFile] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);

  //---------- UseEffect Functions ----------//

  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Can't find your location! Enable location services for your browser in settings."
            );
            setLocation({
              lat: 1.3521,
              lng: 103.8198,
            });
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        }
      );
    };
    if (!placeData) {
      getLocation();
    }
  }, [placeData]);

  useEffect(() => {
    if (place) {
      setPlaceData(place);
    }
  }, [place]);

  // Generate Stars
  useEffect(() => {
    const generateStars = (number) => {
      const generatedStars = [];
      if (number > 1) {
        for (let i = 1; i <= number; i++) {
          generatedStars.push(
            <img
              onClick={handleRating}
              id={i}
              key={i}
              src={StarFull}
              alt="Full Star"
            />
          );
        }
      }
      for (let j = number + 1; j <= 5; j++) {
        generatedStars.push(
          <img
            onClick={handleRating}
            id={j}
            key={j}
            src={StarEmpty}
            alt="Empty Star"
          />
        );
      }

      return generatedStars;
    };
    setRatingDisplay(generateStars(rating));
  }, [rating]);

  useEffect(() => {
    if (results) {
      const display = results.map((data, index) => (
        <RestaurantCard
          key={index}
          content={data}
          type="form-result"
          setPlaceData={setPlaceData}
        />
      ));
      setResultsDisplay(display);
    }
  }, [results]);

  useEffect(() => {
    if (placeData) {
      setResultsDisplay(null);
    }
  }, [placeData]);

  //---------- Action Functions ----------//

  const handleRating = (e) => {
    const ratingId = Number(e.currentTarget.id);
    setRating(ratingId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !review || !rating) {
      setErrorMessage("Please fill in title, review and rating!");
      setIsError(true);
    } else {
      try {
        let photoUrl = null;
        if (file) {
          const fileRef = ref(storage, `reviews/${placeData.id}/${user.id}`);
          await uploadBytesResumable(fileRef, file);
          photoUrl = await getDownloadURL(fileRef);
        }
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/${placeData.id}/add`,
          {
            userId: user.id,
            restaurantId: placeData.id,
            rating,
            title,
            body: review,
            recommendedDishes,
            photoUrl,
          },
          bearerToken(user.token)
        );
        console.log(response);
        handleToggle("review-composer");
      } catch (err) {
        setErrorMessage("Error uploading review");
        setIsError(true);
      }
    }
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "title":
        setTitle(e.currentTarget.value);
        break;
      case "review":
        setReview(e.currentTarget.value);
        break;
      case "file":
        setFile(e.currentTarget.files[0]);
        break;
      case "recommended":
        setRecommendedDishes(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  //------------------------------//

  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Add Review</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("review-composer")}
          />
        </div>
        {placeData ? (
          <RestaurantCard content={placeData} type="form-selected" />
        ) : (
          <SearchBar
            location={location}
            setResults={setResults}
            setIsError={setIsError}
            setErrorMessage={setErrorMessage}
          />
        )}
        {resultsDisplay && resultsDisplay}
        <form>
          <input
            id="title"
            type="text"
            placeholder="Review Title"
            onChange={handleChange}
            value={title}
          />
          <input
            id="recommended"
            type="text"
            placeholder="Recommended Dishes"
            onChange={handleChange}
            value={recommendedDishes}
          />
          <textarea
            id="review"
            rows="15"
            placeholder="Enter Review"
            onChange={handleChange}
            value={review}
          />
          <input id="file" type="file" onChange={handleChange} />
          <div className="form-rating">{ratingDisplay}</div>
          {isError && <ErrorPill message={errorMessage} />}
          <Button
            id="form-submit"
            label="Submit Review"
            handleClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default ReviewComposer;
