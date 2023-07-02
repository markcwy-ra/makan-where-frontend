import "./Feeds.css";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import UserCard from "../../Details/Cards/Users/UserCard";

const VertFeed = ({ data, type = "all" }) => {
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
