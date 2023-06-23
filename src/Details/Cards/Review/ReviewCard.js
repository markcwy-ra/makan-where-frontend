import "./ReviewCard.css";
import "../Cards.css";
import Rating from "../../Ratings/Rating";

const ReviewCard = ({ config = "full", content }) => {
  let styling;
  // if (content.photoUrl) {
  //   styling = {
  //     ...styling,
  //     backgroundImage: `url(${content.photoUrl})`,
  //     backgroundSize: "cover",
  //     backgroundPosition: `${
  //       config === "full" ? "top 65% left 0%" : "top 55% left 0%"
  //     }`,
  //   };
  // } else {
  //   styling = {
  //     ...styling,
  //     backgroundColor: "#0078ef",
  //   };
  // }

  return (
    <div className={`card-review-${config}`}>
      <img src={content.photoUrl} alt={content.restaurantName} />
      <div className={`card-review-${config}-title`}>
        <h4>{content.restaurantName}</h4>
        <p>{content.title}</p>
        <h4 className="rating-byline">
          <Rating score={content.rating} size="small" />
          {config === "full" && `Review by @${content.author}`}
        </h4>
      </div>

      {config === "full" && <div className="profile-pic"></div>}
    </div>
  );
};

export default ReviewCard;
