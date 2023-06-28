import Close from "../../Icons/Close.svg";
import "./Forms.css";
import { useEffect, useState } from "react";
import StarFull from "../../Icons/StarFull.svg";
import StarEmpty from "../../Icons/StarEmpty.svg";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";

const ReviewComposer = ({ handleToggle, place = null }) => {
  const [rating, setRating] = useState(0);
  const [ratingDisplay, setRatingDisplay] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResults] = useState(null);
  const [placeId, setPlaceId] = useState(null);

  useEffect(() => {
    if (place) {
      setPlaceId(place);
    }
  }, [place]);

  useEffect(() => {
    const generateStars = (number) => {
      const generatedStars = [];
      if (rating === 0) {
        for (let i = 1; i <= 5; i++) {
          generatedStars.push(
            <img
              onClick={handleRating}
              id={i}
              key={i}
              src={StarEmpty}
              alt="Empty Star"
            />
          );
        }
      } else {
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
      }
      return generatedStars;
    };
    setRatingDisplay(generateStars(rating));
  }, [rating]);

  const handleRating = (e) => {
    const ratingId = Number(e.currentTarget.id);
    setRating(ratingId);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
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
      case "image":
        setFile(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

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

        <form>
          <SearchBar setResults={setResults} />
          <input
            id="title"
            type="text"
            placeholder="Review Title"
            onChange={handleChange}
            value={title}
          />
          <textarea
            id="review"
            rows="15"
            placeholder="Enter Review"
            onChange={handleChange}
            value={review}
          />
          <input id="image" type="file" onChange={handleChange} />
          <div className="form-rating">{ratingDisplay}</div>
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
