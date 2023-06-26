import Header from "../../Components/Header/Header";
import { tempListData, tempReviewData } from "../../tempData";
import "./ProfileScreen.css";
import StatsBar from "../../Details/StatsBar/StatsBar";
import Button from "../../Details/Buttons/Button";
import HorzFeed from "../../Components/Feeds/HorzFeed";

const ProfileScreen = () => {
  const handleClick = (e) => {
    console.log(e.currentTarget.id);
  };

  return (
    <>
      <Header icon="profile">
        <h1>@johntan</h1>
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
