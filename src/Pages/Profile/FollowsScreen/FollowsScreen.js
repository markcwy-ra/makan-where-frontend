import "./FollowsScreen.css";
import { useContext, useEffect, useState } from "react";
import VertFeed from "../../../Components/Feeds/VertFeed";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Details/Buttons/Button";
import axios from "axios";
import { bearerToken } from "../../../Utilities/token";
import { UserContext } from "../../../App";

const FollowsScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userId, followlist } = useParams();
  const [activeToggle, setActiveToggle] = useState("followers");
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  console.log(following);
  useEffect(() => {
    if (followlist === "followers" || followlist === "following") {
      setActiveToggle(followlist);
    } else {
      navigate("/home");
    }
    //eslint-disable-next-line
  }, [followlist]);

  useEffect(() => {
    const getFollowers = async (userId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/follows/${userId}/followers`,
          bearerToken(user.token)
        );
        setFollowers(response.data.followers);
      } catch (err) {
        console.log(err);
      }
    };

    const getFollowing = async (userId) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/follows/${userId}/following`,
          bearerToken(user.token)
        );
        setFollowing(response.data.following);
      } catch (err) {
        console.log(err);
      }
    };
    if (userId) {
      getFollowers(userId);
      getFollowing(userId);
    } else {
      getFollowers(user.id);
      getFollowing(user.id);
    }
  }, [user, userId]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };

  return (
    <div className="follows-screen">
      <h4 className="back-button" onClick={handleClick}>
        ← Back
      </h4>
      <div className="search-toggles">
        <Button
          label="Followers"
          id="followers"
          size="small"
          isActive={activeToggle === "followers" ? true : false}
          handleClick={handleToggle}
        />
        <Button
          label="Following"
          id="following"
          size="small"
          isActive={activeToggle === "following" ? true : false}
          handleClick={handleToggle}
        />
      </div>
      <div className="follows-screen-feed">
        {activeToggle === "followers" && (
          <VertFeed data={followers} type="users" />
        )}
        {activeToggle === "followers" &&
          followers &&
          followers.length === 0 && (
            <h2 className="follows-none">No followers</h2>
          )}
        {activeToggle === "following" && following && (
          <VertFeed data={following} type="users" />
        )}
        {activeToggle === "following" &&
          following &&
          following.length === 0 && (
            <h2 className="follows-none">Not following anyone</h2>
          )}
      </div>
    </div>
  );
};

export default FollowsScreen;
