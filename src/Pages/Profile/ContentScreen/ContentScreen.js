import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import VertFeed from "../../../Components/Feeds/VertFeed";
import Button from "../../../Details/Buttons/Button";
import { UserContext } from "../../../App";
import { getUserContent } from "../../../Utilities/fetch";
import "./ContentScreen.css";
import Fade from "../../../Details/Animation/Fade";

const ContentScreen = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { userId, content } = useParams();
  const [activeToggle, setActiveToggle] = useState("reviews");
  const [reviews, setReviews] = useState(null);
  const [lists, setLists] = useState(null);

  useEffect(() => {
    if (content === "reviews" || content === "makanlists") {
      setActiveToggle(content);
    } else {
      navigate("/home");
    }
    //eslint-disable-next-line
  }, [content]);

  useEffect(() => {
    const userContentData = async (id) => {
      try {
        // Get Review Data
        const reviewData = await getUserContent({
          route: "reviews",
          userId: id,
        });
        setReviews(reviewData.reviews.length > 0 ? reviewData.reviews : null);

        // Get Makanlist Data
        const makanlistData = await getUserContent({
          route: "makanlists",
          userId: id,
        });
        setLists(makanlistData.length > 0 ? makanlistData : null);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) {
      if (userId && Number(userId) === user.id) {
        navigate("/profile");
      }
      if (userId) {
        userContentData(userId);
      } else {
        userContentData(user.id);
      }
    }
    //eslint-disable-next-line
  }, [user, userId]);

  const handleClick = () => {
    navigate(-1);
  };

  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };

  return (
    <Fade className="follows-screen">
      <h4 className="back-button" onClick={handleClick}>
        ← Back
      </h4>
      <div className="search-toggles">
        <Button
          label="Reviews"
          id="reviews"
          size="small"
          isActive={activeToggle === "reviews" ? true : false}
          handleClick={handleToggle}
        />
        <Button
          label="Makanlists"
          id="makanlists"
          size="small"
          isActive={activeToggle === "makanlists" ? true : false}
          handleClick={handleToggle}
        />
      </div>
      <div className="follows-screen-feed">
        {activeToggle === "reviews" && (
          <VertFeed data={reviews} type="reviews" />
        )}
        {activeToggle === "reviews" && reviews && reviews.length === 0 && (
          <h2 className="content-none">No reviews</h2>
        )}
        {activeToggle === "makanlists" && lists && (
          <VertFeed data={lists} type="makanlists" />
        )}
        {activeToggle === "makanlists" && lists && lists.length === 0 && (
          <h2 className="content-none">No Makanlists</h2>
        )}
      </div>
    </Fade>
  );
};

export default ContentScreen;
