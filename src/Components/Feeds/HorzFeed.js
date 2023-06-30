import ReviewCard from "../../Details/Cards/Review/ReviewCard";
import "./Feeds.css";
import { useEffect, useState } from "react";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";
import { useLocation } from "react-router-dom";

const HorzFeed = ({ type, data }) => {
  const [feed, setFeed] = useState(null);
  const [title, setTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (data) {
      if (type === "reviews") {
        const feedContent = data.map((data, index) => (
          <ReviewCard key={index} config="small" content={data} />
        ));
        setFeed(feedContent);
        if (location.pathname === "/profile") {
          setTitle("My Reviews");
        } else {
          setTitle("Reviews");
        }
      } else if (type === "makanlists") {
        const feedContent = data.map((data, index) => (
          <MakanlistCard key={index} config="small" content={data} />
        ));
        setFeed(feedContent);
        if (location.pathname === "/profile") {
          setTitle("My Makanlists");
        } else {
          setTitle("Makanlists");
        }
      }
    }
  }, [type, data, location]);

  return (
    <div className="horz-feed">
      <div className="horz-feed-header">
        <h4>{title}</h4>
      </div>
      <div className="horz-feed-cards">{feed}</div>
    </div>
  );
};

export default HorzFeed;
