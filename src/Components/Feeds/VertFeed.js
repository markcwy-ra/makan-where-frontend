import "./Feeds.css";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import UserCard from "../../Details/Cards/Users/UserCard";
import { capitalise } from "../../Utilities/formatting";
import Close from "../../Icons/Close.svg";

const VertFeed = ({ data, type = "all", handleRemove }) => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    if (data) {
      let feedContent = [];
      if (type === "restaurants") {
        if (data.length !== 0) {
          feedContent = data.map((data, index) => (
            <RestaurantCard key={index} content={data} />
          ));
        }
      } else if (type === "restaurants-list-edit") {
        if (data.length !== 0) {
          feedContent = data.map((data, index) => (
            <div className="list-edit-card" key={index}>
              <img
                className="list-edit-card-delete clickable"
                src={Close}
                alt="Delete button"
                onClick={() => handleRemove(data)}
              />
              <RestaurantCard content={data} />
            </div>
          ));
        }
      } else if (type === "makanlists") {
        feedContent = data.map((data, index) => (
          <MakanlistCard key={index} content={data} />
        ));
      } else if (type === "reviews") {
        feedContent = data.map((data, index) => (
          <ReviewCard key={index} content={data} />
        ));
      } else if (type === "users") {
        feedContent = data.map((data, index) => (
          <UserCard key={index} content={data} />
        ));
      } else if (type === "following-feed") {
        if (data.length !== 0) {
          // eslint-disable-next-line
          feedContent = data.map((data, index) => {
            if (
              !(
                data.activityType.includes("removed") ||
                data.activityType.includes("deleted")
              )
            ) {
              if (data.targetType === "makanlistrestaurant") {
                return (
                  <div className="following-feed-card" key={index}>
                    <p>
                      @{data.user.username} {data.activityType} a Restaurant to{" "}
                      {data.targetDetails.makanlist.title}
                    </p>

                    <RestaurantCard content={data.targetDetails.restaurant} />
                  </div>
                );
              } else {
                return (
                  <div className="following-feed-card" key={index}>
                    <p>
                      @{data.user.username} {data.activityType} a{" "}
                      {capitalise(data.targetType)}
                    </p>
                    {data.targetType === "makanlist" && (
                      <MakanlistCard content={data.targetDetails} />
                    )}
                    {data.targetType === "restaurant" && (
                      <RestaurantCard content={data.targetDetails} />
                    )}
                    {data.targetType === "review" && (
                      <ReviewCard content={data.targetDetails} />
                    )}
                  </div>
                );
              }
            }
          });
        } else {
          feedContent = <h2 className="feed-none">No activity yet!</h2>;
        }
      } else {
        if (data.length !== 0) {
          feedContent = data.topActivities.map((data, index) => {
            if (data.targetType === "makanlist") {
              return <MakanlistCard key={index} content={data.target} />;
            } else if (data.targetType === "restaurant") {
              return <RestaurantCard key={index} content={data.target} />;
            } else {
              return <ReviewCard key={index} content={data.target} />;
            }
          });
        } else {
          feedContent = <h2 className="feed-none">No activity yet!</h2>;
        }
      }
      setFeed(feedContent);
    }
    //eslint-disable-next-line
  }, [data, type]);

  return <div className="vert-feed">{feed}</div>;
};

export default VertFeed;
