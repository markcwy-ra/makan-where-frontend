import "./FavouritesScreen.css";
import { useState } from "react";
import Header from "../../../Components/Header/Header";
import { tempListData, tempRestaurantList } from "../../../tempData";
import VertFeed from "../../../Components/Feeds/VertFeed";
import { useNavigate } from "react-router-dom";

const FavouritesScreen = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("places");

  const handleTabs = (e) => {
    setTab(e.currentTarget.id);
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <>
      <h4 className="back-button" onClick={handleClick}>
        ← Back
      </h4>
      <Header>
        <h1
          className={tab === "places" ? "" : "inactive-text"}
          onClick={handleTabs}
          id="places"
        >
          Places
        </h1>
        <h1
          className={tab === "makanlists" ? "" : "inactive-text"}
          onClick={handleTabs}
          id="makanlists"
        >
          Makanlists
        </h1>
      </Header>
      {tab === "places" ? (
        <VertFeed data={tempRestaurantList} type="restaurants" />
      ) : (
        <VertFeed data={tempListData} type="makanlists" />
      )}
    </>
  );
};

export default FavouritesScreen;
