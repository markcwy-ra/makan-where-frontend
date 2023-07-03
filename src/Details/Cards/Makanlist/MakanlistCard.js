import "./MakanlistCard.css";
import "../Cards.css";
import { useNavigate } from "react-router-dom";
import User from "../../../Icons/User.svg";

const MakanlistCard = ({ config = "full", content }) => {
  const navigate = useNavigate();

  let styling;
  if (content.photoUrl) {
    styling = {
      ...styling,
      backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${content.photoUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    styling = {
      ...styling,
      backgroundColor: "#0078ef",
    };
  }

  let cardTitle;

  if (config === "full") {
    cardTitle = <h2>{content.title}</h2>;
  } else {
    cardTitle = <h3>{content.title}</h3>;
  }

  const handleClick = () => {
    navigate(`/makanlists/${content.userId}/${content.id}`);
  };

  return (
    <div
      className={`card-makanlist-${config}`}
      style={styling}
      onClick={handleClick}
    >
      <div className={`card-makanlist-${config}-title`}>
        {cardTitle}
        {config === "full" && <h4>Makanlist by @{content.user.username}</h4>}
      </div>

      {config === "full" && (
        <img
          id={content.id}
          className="profile-pic"
          src={content.user.photoUrl ? content.user.photoUrl : User}
          alt={`${content.user.username}'s Profile Pic`}
        />
      )}
    </div>
  );
};

export default MakanlistCard;
