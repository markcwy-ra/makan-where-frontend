import "./Feeds.css";
import { useEffect, useState } from "react";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";

const VertFeed = ({ data }) => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const feedContent = data.map((data, index) => (
      <RestaurantCard key={index} content={data} />
    ));
    setFeed(feedContent);
  }, [data]);

  return <div className="vert-feed">{feed}</div>;
};

export default VertFeed;
