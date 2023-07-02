import "./Feeds.css";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import UserCard from "../../Details/Cards/Users/UserCard";

const VertFeed = ({ data, type = "all" }) => {
  const [feed, setFeed] = useState(null);
  console.log(data);
  useEffect(() => {
    if (data) {
      let feedContent = [];
      if (type === "restaurants") {
        if (data.length !== 0) {
          feedContent = data.map((data, index) => (
            <RestaurantCard key={index} content={data} />
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
        feedContent = data.map((data, index) => {
          if (data.targetType === "makanlist") {
            return (
              <div key={index}>
                <p>
                  {data.user.username} {data.activityType} a {data.targetType}
                </p>
                <MakanlistCard content={data.targetDetails} />
              </div>
            );
          } else if (data.targetType === "restaurant") {
            return (
              <div key={index}>
                <p>
                  {data.user.username} {data.activityType} a {data.targetType}
                </p>
                <RestaurantCard content={data.targetDetails} />
              </div>
            );
          } else if (data.targetType === "review") {
            return (
              <div key={index}>
                <p>
                  {data.user.username} {data.activityType} a {data.targetType}
                </p>
                <ReviewCard content={data.targetDetails} />
              </div>
            );
          }
        });
      } else {
        feedContent = data.map((data, index) => {
          if (data.type === "makanlist") {
            return <MakanlistCard key={index} content={data} />;
          } else {
            return <ReviewCard key={index} content={data} />;
          }
        });
      }
      setFeed(feedContent);
    }
  }, [data, type]);

  return <div className="vert-feed">{feed}</div>;
};

export default VertFeed;
