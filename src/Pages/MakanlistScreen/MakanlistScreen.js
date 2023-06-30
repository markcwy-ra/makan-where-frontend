import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//---------- Components ----------//

import HeartButton from "../../Details/Buttons/HeartButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import VertFeed from "../../Components/Feeds/VertFeed";

//---------- Others ----------//

import "./MakanlistScreen.css";
import { tempListPageData } from "../../tempData";
import axios from "axios";
import { bearerToken } from "../../Utilities/token";
import { UserContext } from "../../App";

//------------------------------//

const MakanlistScreen = () => {
  const tempData = { ...tempListPageData };
  const { user } = useContext(UserContext);
  const { userId, listId } = useParams();
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(null);

  useEffect(() => {
    const getUpvoteStatus = async (reviewId) => {
      const upvoteStatus = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/${listId}/upvote/${user.id}`,
        bearerToken(user.token)
      );
      setHeart(upvoteStatus.data.hasUpvoted);
    };

    const getListData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${userId}/${listId}`,
        bearerToken(user.token)
      );
      setData(response.data);
      getUpvoteStatus(response.data.id);
    };

    getListData();
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    // Get upvote count
    const getUpvoteCount = async () => {
      const upvoteCount = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/${listId}/upvotes/count`,
        bearerToken(user.token)
      );
      setUpvoteCount(upvoteCount.data.count);
    };
    getUpvoteCount();
  }, [user, listId]);

  const handleHeart = async () => {
    if (heart) {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/${listId}/upvote/${user.id}`,
        bearerToken(user.token)
      );
    } else {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/${listId}/upvote`,
        { userId: user.id },
        bearerToken(user.token)
      );
    }
    setHeart((prev) => !prev);
  };
  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="content">
        <div
          className="makanlist-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0 0 0 / 50%), rgba(0 0 0  / 50%)), url(${data.photoUrl})`,
          }}
        >
          <div className="makanlist-title">
            <h1>{data.title}</h1>
            <div className="makanlist-title-buttons">
              {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
              <HeartButton
                heart={heart}
                handleClick={handleHeart}
                white={true}
              />
            </div>
          </div>
          <h4>Makanlist by @{data.user.username}</h4>
        </div>
        <div className="makanlist-content">
          <h6>{data.description}</h6>
          <div className="divider-line" />
        </div>
        {<VertFeed data={tempData.restaurants} type="restaurants" />}
      </div>
    );
  }
};

export default MakanlistScreen;
