import { useNavigate } from "react-router-dom";
import "./StatsBar.css";

const StatsBar = ({
  userId,
  reviewCount = 0,
  makanlistCount = 0,
  followerCount = 0,
  followingCount = 0,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (userId) {
      navigate(`/user/${userId}/follows`);
    } else {
      navigate("/profile/follows");
    }
  };

  return (
    <div className="stats-bar">
      <div className="stats-bar-stats">
        <h2>{reviewCount}</h2>
        <h4>Reviews</h4>
      </div>
      <div className="stats-bar-stats">
        <h2>{makanlistCount}</h2>
        <h4>Makanlists</h4>
      </div>
      <div className="stats-bar-stats clickable" onClick={handleClick}>
        <h2>{followerCount}</h2>
        <h4>Followers</h4>
      </div>
      <div className="stats-bar-stats clickable" onClick={handleClick}>
        <h2>{followingCount}</h2>
        <h4>Following</h4>
      </div>
    </div>
  );
};

export default StatsBar;
