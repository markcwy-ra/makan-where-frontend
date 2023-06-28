//----------- React -----------//

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

//---------- Components ----------//

import Header from "../../../Components/Header/Header";
import StatsBar from "../../../Details/StatsBar/StatsBar";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import Button from "../../../Details/Buttons/Button";
import ProfileEditor from "../../../Components/Forms/ProfileEditor";
import MenuProfile from "../../../Details/Menus/MenuProfile";

//---------- Others ----------//

import { tempListData, tempReviewData } from "../../../tempData";
import "./ProfileScreen.css";
import axios from "axios";
import { logoutToken } from "../../../utils";
import { UserContext } from "../../../App";

//------------------------------//

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleClick = async (e) => {
    const id = e.currentTarget.id;
    if (id === "favourites") {
      navigate("favourites");
    } else if (id === "edit-profile") {
      handleToggle();
      setShowMenu(false);
    } else if (id === "logout") {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/sign-out`,
          {},
          logoutToken(refreshToken)
        );
        navigate("/");
      } catch (err) {
        const code = err.response.status;
        if (code === 500) {
          console.log("There was an error. Please refresh.");
        } else if (code === 401) {
          console.log(err);
        }
      }
    } else if (id === "profile") {
      setShowMenu((prev) => !prev);
    }
  };

  return (
    <>
      {showMenu && <MenuProfile handleClick={handleClick} />}
      {toggleEdit && (
        <ProfileEditor handleToggle={handleToggle} profileData={user} />
      )}
      <Header icon="profile" handleClick={handleClick}>
        <h1>@{user.username}</h1>
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
