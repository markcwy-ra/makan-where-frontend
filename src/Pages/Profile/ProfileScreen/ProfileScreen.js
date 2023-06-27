//----------- React -----------//

import { useNavigate } from "react-router-dom";
import { useState } from "react";

//---------- Components ----------//

import Header from "../../../Components/Header/Header";
import StatsBar from "../../../Details/StatsBar/StatsBar";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import Button from "../../../Details/Buttons/Button";

//---------- Others ----------//

import { tempListData, tempReviewData, tempUserData } from "../../../tempData";
import "./ProfileScreen.css";
import ProfileEditor from "../../../Components/Forms/ProfileEditor";
import MenuProfile from "../../../Details/Menus/MenuProfile";

//------------------------------//

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "favourites") {
      navigate("favourites");
    } else if (id === "edit-profile") {
      handleToggle();
      setShowMenu(false);
    } else if (id === "logout") {
      navigate("/");
    } else if (id === "profile") {
      setShowMenu((prev) => !prev);
    }
  };

  return (
    <>
      {showMenu && <MenuProfile handleClick={handleClick} />}
      {toggleEdit && (
        <ProfileEditor handleToggle={handleToggle} profileData={tempUserData} />
      )}
      <Header icon="profile" handleClick={handleClick}>
        <h1>@{tempUserData.username}</h1>
      </Header>
      <div className="profile-page-header">
        <div className="divider-line" />
        <StatsBar />
        <div className="divider-line" />
        <div className="profile-buttons">
          <Button
            id="favourites"
            label="View Favourites"
            size="medium"
            isActive={true}
            handleClick={handleClick}
          />
        </div>
      </div>
      <div className="content profile-page-feeds">
        <HorzFeed type="reviews" data={tempReviewData} />
        <HorzFeed type="makanlists" data={tempListData} />
      </div>
    </>
  );
};

export default ProfileScreen;
