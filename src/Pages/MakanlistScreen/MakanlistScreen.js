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
import { UserContext } from "../../App";
import {
  getMakanlist,
  getUpvoteCount,
  getUpvoteStatus,
  handleHeart,
} from "../../Utilities/fetch";
import Fade from "../../Details/Animation/Fade";

//------------------------------//

const MakanlistScreen = () => {
  const { user } = useContext(UserContext);
  const { userId, listId } = useParams();
  const [heart, setHeart] = useState(false);
  const [data, setData] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(null);
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const route = "makanlists";

  useEffect(() => {
    const getListData = async () => {
      const response = await getMakanlist({ userId, listId });
      setData(response);
      const status = await getUpvoteStatus({
        route,
        id: listId,
        userId: user.id,
      });
      setHeart(status);
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
    getUpvoteCount({
      route,
      id: listId,
      setUpvoteCount,
    });
  }, [listId, heart]);

  useEffect(() => {
    if (Number(userId) === user.id) {
      setIsUser(true);
    }
  }, [user, userId]);

  const handleUpvote = () => {
    handleHeart({ route, id: listId, userId: user.id, heart, setHeart });
  };

  const handleEdit = async () => {
    setEdit((prev) => !prev);
  };

  if (!data) {
    return <LoadingScreen />;
  } else {
    return (
      <Fade className="content">
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
            <h4>Makanlist by {isUser ? "you" : `@${data.user.username}`}</h4>
          </div>
          <div className="makanlist-title-buttons">
            {user.id === Number(userId) && (
              <EditButton handleClick={handleEdit} white={true} />
            )}
            <div className="makanlist-hearts">
              {upvoteCount > 0 && <h4>{upvoteCount}</h4>}
              <HeartButton
                heart={heart}
                handleClick={handleUpvote}
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
      </Fade>
    );
  }
};

export default MakanlistScreen;
