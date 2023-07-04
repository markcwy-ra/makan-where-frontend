import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import VertFeed from "../../../Components/Feeds/VertFeed";
import Button from "../../../Details/Buttons/Button";

import { getFollowers, getFollowing } from "../../../Utilities/fetch";
import { UserContext } from "../../../App";
import "./FollowsScreen.css";
import Fade from "../../../Details/Animation/Fade";

const FollowsScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userId, followlist } = useParams();
  const [activeToggle, setActiveToggle] = useState("followers");
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    if (followlist === "followers" || followlist === "following") {
      setActiveToggle(followlist);
    } else {
      navigate("/home");
    }
    //eslint-disable-next-line
  }, [followlist]);

  useEffect(() => {
    const getFollows = async (userId) => {
      try {
        const followers = await getFollowers(userId);
        setFollowers(followers);
        const following = await getFollowing(userId);
        setFollowing(following);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) {
      getFollows(userId);
    } else {
      getFollows(user.id);
    }
  }, [user, userId]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };

  return (
    <Fade className="follows-screen">
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
    </Fade>
  );
};

export default FollowsScreen;
