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

export { getUpvoteStatus, getUpvoteCount };
