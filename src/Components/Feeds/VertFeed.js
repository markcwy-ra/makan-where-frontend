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
    } else {
      feedContent = data.map((content, index) => {
        if (content.type === "makanlist") {
          return <MakanlistCard key={index} content={content} />;
        } else {
          return <ReviewCard key={index} content={content} />;
        }
      });
    }
    setFeed(feedContent);
  }, [data, type]);

  return <div className="vert-feed">{feed}</div>;
};

export default VertFeed;
