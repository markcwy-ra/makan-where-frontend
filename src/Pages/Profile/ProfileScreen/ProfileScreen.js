//----------- React -----------//

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

//---------- Components ----------//

import Header from "../../../Components/Header/Header";
import StatsBar from "../../../Details/StatsBar/StatsBar";
import HorzFeed from "../../../Components/Feeds/HorzFeed";
import Button from "../../../Details/Buttons/Button";
import ProfileEditor from "../../../Components/Forms/ProfileEditor";
import MenuProfile from "../../../Details/Menus/MenuProfile";

//---------- Others ----------//

import "./ProfileScreen.css";
import axios from "axios";
import { bearerToken, logoutToken } from "../../../Utilities/token";
import { UserContext } from "../../../App";

//------------------------------//

const ProfileScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [lists, setLists] = useState(null);
  const [listCount, setListCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  // Get profile data
  useEffect(() => {
    const getUserProfile = async (userId) => {
      try {
        // Get restaraunt reviews
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
          bearerToken(user.token)
        );
        setUserData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserReviews = async (userId) => {
      try {
        // Get restaraunt reviews
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/reviews/user/${userId}`,
          bearerToken(user.token)
        );
        setReviews(
          response.data.reviews.length > 0 ? response.data.reviews : null
        );
        setReviewCount(response.data.reviews.length);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserMakanlists = async (userId) => {
      try {
        // Get restaraunt reviews
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${userId}`,
          bearerToken(user.token)
        );
        setLists(response.data.length > 0 ? response.data : null);
        setListCount(response.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    const getFollowerCounts = async (userId) => {
      try {
        // Get restaraunt reviews
        const followers = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/follows/${userId}/followers/count`,
          bearerToken(user.token)
        );
        const following = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/follows/${userId}/following/count`,
          bearerToken(user.token)
        );
        setFollowerCount(followers.data.count);
        setFollowingCount(following.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      if (userId && Number(userId) === user.id) {
        navigate("/profile");
      }
      if (userId) {
        getUserProfile(userId);
        getUserReviews(userId);
        getUserMakanlists(userId);
        getFollowerCounts(userId);
      } else {
        setUserData(user);
        getUserReviews(user.id);
        getUserMakanlists(user.id);
        getFollowerCounts(user.id);
      }
    }
    //eslint-disable-next-line
  }, [user, userId]);

  //---------- Action Functions ----------//

  const handleToggle = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleClick = async (e) => {
    const id = e.currentTarget.id;
    if (id === "favourites") {
      navigate("favourites");
    } else if (id === "follow") {
      if (!followed) {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/follows/${userId}`,
            { followerId: user.id },
            bearerToken(user.token)
          );
          setFollowed(true);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/follows/unfollow/${userId}`,
            { followerId: user.id },
            bearerToken(user.token)
          );
          setFollowed(false);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleMenu = async (e) => {
    const id = e.currentTarget.id;
    if (id === "logout") {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/sign-out`,
          {},
          logoutToken(refreshToken)
        );
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/");
      } catch (err) {
        const code = err.response.status;
        if (code === 500) {
          console.log("There was an error. Please refresh.");
        } else if (code === 401) {
          console.log(err);
        }
      }
    } else if (id === "edit-profile") {
      handleToggle();
      setShowMenu(false);
    } else if (id === "profile") {
      if (!userId) {
        setShowMenu((prev) => !prev);
      }
    }
  };

  //------------------------------//

  return (
    <>
      {showMenu && <MenuProfile handleClick={handleMenu} />}
      {toggleEdit && (
        <ProfileEditor handleToggle={handleToggle} profileData={user} />
      )}
      <Header icon="profile" userData={userData} handleClick={handleMenu} />
      <div className="profile-page-header">
        <div className="divider-line" />
        <StatsBar
          userId={userId}
          reviewCount={reviewCount}
          makanlistCount={listCount}
          followerCount={followerCount}
          followingCount={followingCount}
        />
        <div className="divider-line" />
        <div className="profile-buttons">
          {userId ? (
            <Button
              id="follow"
              label={followed ? "Unfollow" : "Follow"}
              size="medium"
              isActive={true}
              handleClick={handleClick}
            />
          ) : (
            <Button
              id="favourites"
              label="View Favourites"
              size="medium"
              isActive={true}
              handleClick={handleClick}
            />
          )}
        </div>
      </div>
      <div className="content profile-page-feeds">
        <HorzFeed type="reviews" data={reviews} />
        <HorzFeed type="makanlists" data={lists} />
      </div>
    </>
  );
};

export default ProfileScreen;
