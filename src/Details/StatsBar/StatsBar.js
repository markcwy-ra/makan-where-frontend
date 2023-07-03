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

  const handleClick = (e) => {
    if (userId) {
      navigate(`/user/${userId}/${e.currentTarget.id}`);
    } else {
      navigate(`/profile/${e.currentTarget.id}`);
    }
  };

  return (
    <div className="stats-bar">
      <div
        className="stats-bar-stats clickable"
        id="content/reviews"
        onClick={handleClick}
      >
        <h2>{reviewCount}</h2>
        <h4>Reviews</h4>
      </div>
      <div
        className="stats-bar-stats clickable"
        id="content/makanlists"
        onClick={handleClick}
      >
        <h2>{makanlistCount}</h2>
        <h4>Makanlists</h4>
      </div>
      <div
        className="stats-bar-stats clickable"
        id="follows/followers"
        onClick={handleClick}
      >
        <h2>{followerCount}</h2>
        <h4>Followers</h4>
      </div>
      <div
        className="stats-bar-stats clickable"
        id="follows/following"
        onClick={handleClick}
      >
        <h2>{followingCount}</h2>
        <h4>Following</h4>
      </div>
    </div>
  );
};

export default StatsBar;
