import Header from "../../Components/Header/Header";
import "./HomeScreen.css";
import VertFeed from "../../Components/Feeds/VertFeed";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { getFeed } from "../../Utilities/fetch";

const HomeScreen = () => {
  const [tab, setTab] = useState("featured");
  const { user } = useContext(UserContext);
  const [featured, setFeatured] = useState(null);
  const [following, setFollowing] = useState(null);

  useEffect(() => {
    const getFeeds = async () => {
      try {
        const featuredFeed = await getFeed("featured");
        setFeatured(featuredFeed);
      } catch (err) {
        console.log(err);
      }
      try {
        const followingFeed = await getFeed(`user/${user.id}`);
        setFollowing(followingFeed);
      } catch (err) {
        if (err.response.status === 404) {
          setFollowing([]);
        } else {
          console.log(err);
        }
      }
    };
    getFeeds();
  }, [user]);

  const handleClick = (e) => {
    setTab(e.currentTarget.id);
  };

  return (
    <>
      <Header>
        <h1
          className={tab === "following" ? "inactive-text" : ""}
          onClick={handleClick}
          id="featured"
        >
          Featured
        </h1>
        <h1
          className={tab === "featured" ? "inactive-text" : ""}
          onClick={handleClick}
          id="following"
        >
          Following
        </h1>
      </Header>
      <div className="home-page">
        {tab === "featured" ? (
          <VertFeed data={featured} type="featured-feed" />
        ) : (
          <VertFeed data={following} type="following-feed" />
        )}
      </div>
    </>
  );
};

export default HomeScreen;
