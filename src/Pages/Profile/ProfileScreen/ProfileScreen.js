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
import { bearerToken } from "../../../Utilities/token";
import { UserContext } from "../../../App";
import {
  getFollowStatus,
  getFollowerCount,
  getFollowingCount,
} from "../../../Utilities/fetch";
import { logout } from "../../../Utilities/auth";

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

    const userProfile = async (id) => {
      try {
        getUserProfile(id);
        getUserReviews(id);
        getUserMakanlists(id);
        const followerCount = await getFollowerCount(id);
        setFollowerCount(followerCount);
        const followingCount = await getFollowingCount(id);
        setFollowingCount(followingCount);
        if (Number(id) !== user.id) {
          const isFollowing = await getFollowStatus(user.id, id);
          setFollowed(isFollowing);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      if (userId && Number(userId) === user.id) {
        navigate("/profile");
      }
      if (userId) {
        userProfile(userId);
      } else {
        userProfile(user.id);
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
        await logout();
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
