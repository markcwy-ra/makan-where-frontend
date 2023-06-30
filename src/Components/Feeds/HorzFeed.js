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
    if (type === "reviews") {
      if (location.pathname === "/profile") {
        setTitle("My Reviews");
      } else {
        setTitle("Reviews");
      }
      setFeed(<h3>No Reviews Found!</h3>);
    } else if (type === "makanlists") {
      if (location.pathname === "/profile") {
        setTitle("My Makanlists");
      } else {
        setTitle("Makanlists");
      }
      setFeed(<h3>No Makanlists Found!</h3>);
    }
    if (data) {
      if (type === "reviews") {
        const feedContent = data.map((data, index) => (
          <ReviewCard key={index} config="small" content={data} />
        ));
        setFeed(feedContent);
      } else if (type === "makanlists") {
        const feedContent = data.map((data, index) => (
          <MakanlistCard key={index} config="small" content={data} />
        ));
        setFeed(feedContent);
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
