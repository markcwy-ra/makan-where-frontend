import "./UserCard.css";
import "../Cards.css";
import { useNavigate } from "react-router-dom";
import User from "../../../Icons/User.svg";

const UserCard = ({ config = "full", content }) => {
  const navigate = useNavigate();

  let cardTitle;

  if (config === "full") {
    cardTitle = <h2>@{content.username}</h2>;
  } else {
    cardTitle = <h3>@{content.username}</h3>;
  }

  const handleClick = () => {
    navigate(`/user/${content.id}`);
  };

  return (
    <div className={`card-user-${config} clickable`} onClick={handleClick}>
      <div className={`card-user-${config}-title`}>{cardTitle}</div>
      <img
        id={content.id}
        className="user-pic"
        src={content.photoUrl ? content.photoUrl : User}
        alt={`${content.username}'s Profile Pic`}
      />
    </div>
  );
};

export default UserCard;
