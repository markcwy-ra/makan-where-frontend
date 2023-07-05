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
import { UserContext } from "../../../App";
import {
  followUser,
  getFollowStatus,
  getFollowerCount,
  getFollowingCount,
  getUserContent,
  getUserProfile,
  unfollowUser,
} from "../../../Utilities/fetch";
import { logout } from "../../../Utilities/auth";
import Fade from "../../../Details/Animation/Fade";

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
    const userProfile = async (id) => {
      try {
        const profile = await getUserProfile(id);
        setUserData(profile);

        // Get Review Data
        const reviewData = await getUserContent({
          route: "reviews",
          userId: id,
        });
        setReviews(reviewData.reviews.length > 0 ? reviewData.reviews : null);
        setReviewCount(reviewData.reviews.length);

        // Get Makanlist Data
        const makanlistData = await getUserContent({
          route: "makanlists",
          userId: id,
        });
        setLists(makanlistData.length > 0 ? makanlistData : null);
        setListCount(makanlistData.length);

        // Get Follower Count
        const followerCount = await getFollowerCount(id);
        setFollowerCount(followerCount);

        // Get Following Count
        const followingCount = await getFollowingCount(id);
        setFollowingCount(followingCount);

        // Get Following Status
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
        console.log(user, " inside userProfile");
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
          await followUser({ followerId: user.id, userId });
          setFollowed(true);
          setFollowerCount((prev) => prev + 1);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await unfollowUser({ followerId: user.id, userId });
          setFollowed(false);
          setFollowerCount((prev) => prev - 1);
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
    <Fade>
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
    </Fade>
  );
};

export default ProfileScreen;
