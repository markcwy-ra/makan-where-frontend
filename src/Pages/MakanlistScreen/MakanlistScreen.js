import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//---------- Components ----------//

import HeartButton from "../../Details/Buttons/HeartButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import VertFeed from "../../Components/Feeds/VertFeed";
import EditButton from "../../Details/Buttons/EditButton";
import ListEditor from "../../Components/Forms/ListEditor";

//---------- Others ----------//

import "./MakanlistScreen.css";
import axios from "axios";
import { bearerToken } from "../../Utilities/token";
import { UserContext } from "../../App";

//------------------------------//

const MakanlistScreen = () => {
  const { user } = useContext(UserContext);
  const { userId, listId } = useParams();
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(null);
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState(null);

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
    if (data) {
      setList(data.restaurants);
    }
  }, [data]);

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
  }, [user, heart, listId]);

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

  const handleEdit = async () => {
    setEdit((prev) => !prev);
  };

  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="content">
        {edit && (
          <ListEditor
            handleClick={handleEdit}
            data={data}
            setData={setData}
            list={list}
            setList={setList}
          />
        )}
        <div
          className="makanlist-header"
          style={
            data.photoUrl
              ? {
                  backgroundImage: `linear-gradient(rgba(0 0 0 / 50%), rgba(0 0 0  / 50%)), url(${data.photoUrl})`,
                }
              : {
                  backgroundColor: "#0078ef",
                }
          }
        >
          <div className="makanlist-title">
            <h1>{data.title}</h1>
            <h4>Makanlist by @{data.user.username}</h4>
          </div>
          <div className="makanlist-title-buttons">
            {user.id === Number(userId) && (
              <EditButton handleClick={handleEdit} white={true} />
            )}
            <div className="makanlist-hearts">
              {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
              <HeartButton
                heart={heart}
                handleClick={handleHeart}
                white={true}
              />
            </div>
          </div>
        </div>
        <div className="makanlist-content">
          <h6>{data.description}</h6>
          <div className="divider-line" />
          <VertFeed data={list} type="restaurants" />
        </div>
      </div>
    );
  }
};

export default MakanlistScreen;
