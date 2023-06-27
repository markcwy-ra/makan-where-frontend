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

//------------------------------//

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [editToggle, setEditToggle] = useState(false);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "favourites") {
      navigate("favourites");
    } else if (id === "edit-profile") {
      handleToggle();
    }
  };

  const handleToggle = () => {
    setEditToggle((prev) => !prev);
  };

  return (
    <>
      {editToggle && (
        <ProfileEditor handleToggle={handleToggle} profileData={tempUserData} />
      )}
      <Header icon="profile">
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
          <Button
            id="edit-profile"
            label="Edit Profile"
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
