import Header from "../../Components/Header/Header";
import "./ProfileScreen.css";
import StatsBar from "../../Details/StatsBar/StatsBar";
import Button from "../../Details/Buttons/Button";
import ReviewCard from "../../Details/Cards/Review/ReviewCard.js";
import { tempListData, tempReviewData } from "../../tempData";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";

const ProfileScreen = () => {
  const handleClick = (e) => {
    console.log(e.currentTarget.id);
  };

  const reviewFeed = tempReviewData.map((data, index) => (
    <ReviewCard key={index} config="small" content={data} />
  ));

  const makanlistFeed = tempListData.map((data, index) => (
    <MakanlistCard key={index} config="small" content={data} />
  ));

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
        <div className="horz-feed">
          <div className="horz-feed-header">
            <h4>My Reviews</h4>
          </div>
          <div className="horz-feed-cards">{reviewFeed}</div>
        </div>
        <div className="horz-feed">
          <div className="horz-feed-header">
            <h4>My Makanlists</h4>
          </div>
          <div className="horz-feed-cards">{makanlistFeed}</div>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
