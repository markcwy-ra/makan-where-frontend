import "./ReviewCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";

const ReviewCard = ({ config, content }) => {
  let styling;
  if (content.photoUrl) {
    styling = {
      ...styling,
      backgroundImage: `url(${content.photoUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "top 65% left 0%",
    };
  } else {
    styling = {
      ...styling,
      backgroundColor: "#0078ef",
    };
  }

  return (
    <div className={`card-review-${config}`} style={styling}>
      <div className={`card-review-${config}-title`}>
        <h4>{content.restaurantName}</h4>
        <p>{content.title}</p>
        <h4 className="rating-byline">
          <Rating score={content.rating} size="small" />
          Review by @{content.author}
        </h4>
      </div>

      <div className="profile-pic"></div>
    </div>
  );
};

export default ReviewCard;
