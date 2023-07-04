import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//---------- Components ----------//

import Button from "../../Details/Buttons/Button";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import Close from "../../Icons/Close.svg";
import StarFull from "../../Icons/StarFull.svg";
import StarEmpty from "../../Icons/StarEmpty.svg";
import ErrorPill from "../../Details/Errors/ErrorPill";
import UploadImageButton from "../../Details/Buttons/UploadImageButton";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Motion ----------//

import SlideUp from "../../Details/Animation/SlideUp";
import Fade from "../../Details/Animation/Fade";

//---------- Others ----------//

import "./Forms.css";
import { UserContext } from "../../App";
import { deleteReview, updateReview } from "../../Utilities/fetch";

//------------------------------//

const ReviewEditor = ({ handleToggle, reviewData, setReviewData = null }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState("Delete Review");

  //---------- Form States ----------//

  const [rating, setRating] = useState(0);
  const [ratingDisplay, setRatingDisplay] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [recommendedDishes, setRecommendedDishes] = useState("");
  const [file, setFile] = useState(null);
  const [placeData, setPlaceData] = useState(null);

  //---------- UseEffect Functions ----------//

  useEffect(() => {
    if (reviewData) {
      setPlaceData(reviewData.restaurant);
      setRating(reviewData.rating);
      setTitle(reviewData.title);
      setRecommendedDishes(
        reviewData.recommendedDishes ? reviewData.recommendedDishes : ""
      );
      setReview(reviewData.body);
    }
  }, [reviewData]);

  // Generate Stars
  useEffect(() => {
    const generateStars = (number) => {
      const generatedStars = [];
      if (number > 0) {
        for (let i = 0; i < number; i++) {
          generatedStars.push(
            <img
              onClick={handleRating}
              id={i + 1}
              key={i + 1}
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
          const fileRef = ref(
            storage,
            `uploads/${user.username}/reviews/${placeData.id}/`
          );
          await uploadBytesResumable(fileRef, file);
          photoUrl = await getDownloadURL(fileRef);
        }
        const updatedReview = await updateReview({
          userId: user.id,
          reviewId: reviewData.id,
          rating,
          title,
          review,
          recommendedDishes,
          photoUrl,
        });
        setReviewData && setReviewData(updatedReview);
        handleToggle("review-editor");
      } catch (err) {
        console.log(err);
        setErrorMessage("Error updating review");
        setIsError(true);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleteWarning === "Delete Review") {
      setDeleteWarning("Tap Again to Confirm");
    } else {
      await deleteReview({
        userId: user.id,
        reviewId: reviewData.id,
      });
      navigate("/profile");
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
    <Fade className="bg-overlay">
      <SlideUp className="form-popup">
        <div className="form-popup-header">
          <h2>Edit Review</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("review-editor")}
          />
        </div>
        <div className="content form-popup-content">
          {placeData && (
            <RestaurantCard content={placeData} type="form-selected" />
          )}
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
            <UploadImageButton
              file={file}
              handleChange={handleChange}
              label="Upload an Image"
            />
            <div className="form-rating">{ratingDisplay}</div>
            {isError && <ErrorPill message={errorMessage} />}
            <Button
              id="form-submit"
              label="Update Review"
              handleClick={handleSubmit}
            />
            <Button
              id="delete-review"
              label={deleteWarning}
              handleClick={handleDelete}
              type="warning"
            />
          </form>
        </div>
      </SlideUp>
    </Fade>
  );
};

export default ReviewEditor;
