// Fetching data functions

import axios from "axios";
import { bearerToken } from "./token";

const token = localStorage.getItem("token");

const getUpvoteStatus = async ({ route, id, userId, setHeart }) => {
  const upvoteStatus = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/${route}/${id}/upvote/${userId}`,
    bearerToken(token)
  );
  setHeart(upvoteStatus.data.hasUpvoted);
};

const getUpvoteCount = async ({ route, id, setUpvoteCount }) => {
  const upvoteCount = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/${route}/${id}/upvotes/count`,
    bearerToken(token)
  );
  setUpvoteCount(upvoteCount.data.count);
};

const getMapMarkers = async (coords) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/map?north=${coords.Va.hi}&south=${coords.Va.lo}&east=${coords.Ha.hi}&west=${coords.Ha.lo}`,
    bearerToken(token)
  );
  return response;
};

const handleHeart = async ({ route, id, userId, heart, setHeart }) => {
  if (heart) {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/${route}/${id}/upvote/remove/${userId}`,
      bearerToken(token)
    );
  } else {
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/${route}/${id}/upvote`,
      { userId },
      bearerToken(token)
    );
  }
  setHeart((prev) => !prev);
};

export { getUpvoteStatus, getUpvoteCount, getMapMarkers, handleHeart };
