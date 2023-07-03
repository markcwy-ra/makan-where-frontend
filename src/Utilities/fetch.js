// Fetching data functions

import axios from "axios";
import { bearerToken } from "./token";

//---------- Constants ----------//

const token = localStorage.getItem("token");
const url = process.env.REACT_APP_BACKEND_URL;

/**
 *
 *  //---------- Generic Routes ----------//
 *
 */

//---------- Upvote Data ----------//

const getUpvoteStatus = async ({ route, id, userId, setHeart }) => {
  const upvoteStatus = await axios.get(
    `${url}/${route}/${id}/upvote/${userId}`,
    bearerToken(token)
  );
  setHeart(upvoteStatus.data.hasUpvoted);
};

const getUpvoteCount = async ({ route, id, setUpvoteCount }) => {
  const upvoteCount = await axios.get(
    `${url}/${route}/${id}/upvotes/count`,
    bearerToken(token)
  );
  setUpvoteCount(upvoteCount.data.count);
};

const handleHeart = async ({ route, id, userId, heart, setHeart }) => {
  if (heart) {
    await axios.delete(
      `${url}/${route}/${id}/upvote/remove/${userId}`,
      bearerToken(token)
    );
  } else {
    await axios.post(
      `${url}/${route}/${id}/upvote`,
      { userId },
      bearerToken(token)
    );
  }
  setHeart((prev) => !prev);
};

/**
 *
 *  //---------- Page-Specific Routes ----------//
 *
 */

//---------- Home Page----------//

const getFeed = async (type) => {
  const response = await axios.get(`${url}/feed/${type}`, bearerToken(token));
  return response.data;
};

//---------- Map Page ----------//

const getMapMarkers = async (coords) => {
  const response = await axios.get(
    `${url}/map?north=${coords.Va.hi}&south=${coords.Va.lo}&east=${coords.Ha.hi}&west=${coords.Ha.lo}`,
    bearerToken(token)
  );
  return response;
};

//---------- Profile Page ----------//

const getFollowerCount = async (userId) => {
  const followers = await axios.get(
    `${url}/follows/${userId}/followers/count`,
    bearerToken(token)
  );
  return followers.data.count;
};

const getFollowingCount = async (userId) => {
  const following = await axios.get(
    `${url}/follows/${userId}/following/count`,
    bearerToken(token)
  );
  return following.data.count;
};

const getFollowStatus = async (followerId, userId) => {
  const response = await axios.get(
    `${url}/follows/${followerId}/follow/${userId}`,
    bearerToken(token)
  );
  return response.data.isFollowing;
};

//---------- List Page----------//

const removeFromMakanlist = async ({ userId, listId, restaurantId }) => {
  const response = await axios.put(
    `${url}/makanlists/user/${userId}/${listId}/restaurant/${restaurantId}`,
    {},
    bearerToken(token)
  );
  return response;
};

const deleteMakanlist = async ({ userId, listId }) => {
  const response = await axios.delete(
    `${url}/makanlists/user/${userId}/${listId}`,
    bearerToken(token)
  );
  return response;
};

//---------- Review Page----------//

const deleteReview = async ({ userId, reviewId }) => {
  const response = await axios.delete(
    `${url}/reviews/${userId}/${reviewId}`,
    bearerToken(token)
  );
  return response;
};

//------------------------------//

export {
  getFeed,
  getUpvoteStatus,
  getUpvoteCount,
  getMapMarkers,
  getFollowerCount,
  getFollowingCount,
  getFollowStatus,
  handleHeart,
  removeFromMakanlist,
  deleteMakanlist,
  deleteReview,
};
