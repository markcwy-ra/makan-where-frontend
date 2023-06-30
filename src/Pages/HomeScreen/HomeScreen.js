import Header from "../../Components/Header/Header";
import "./HomeScreen.css";
import { tempData } from "../../tempData";
import VertFeed from "../../Components/Feeds/VertFeed";
import { useState } from "react";

const HomeScreen = () => {
  const [tab, setTab] = useState("featured");

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
          <VertFeed data={tempData} />
        ) : (
          <VertFeed data={tempData} />
        )}
      </div>
    </>
  );
};

export default HomeScreen;
