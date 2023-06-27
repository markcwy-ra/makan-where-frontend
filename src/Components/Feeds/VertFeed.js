import "./Feeds.css";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import ReviewCard from "../../Details/Cards/Review/ReviewCard";

const VertFeed = ({ data, type = "all" }) => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    let feedContent = [];
    if (type === "restaurants") {
      feedContent = data.map((data, index) => (
        <RestaurantCard key={index} content={data} />
      ));
    } else if (type === "makanlists") {
      feedContent = data.map((data, index) => (
        <MakanlistCard key={index} content={data} />
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
  }, [data, type]);

  return <div className="vert-feed">{feed}</div>;
};

export default VertFeed;
