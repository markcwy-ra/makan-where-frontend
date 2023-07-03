// Fetching data functions

import axios from "axios";
import { bearerToken } from "./token";
import { getNewTokens } from "./auth";

//---------- Constants ----------//

let token = localStorage.getItem("token");
const url = process.env.REACT_APP_BACKEND_URL;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 403 && !config?.sent) {
      config.sent = true;
      const result = await getNewTokens();
      if (result?.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${result?.token}`,
        };
        localStorage.setItem("token", result?.token);
        token = result?.token;
      }
      return axios(config);
    }
    return Promise.reject(error);
  }
);

/**
 *
 *  //---------- Reusable Routes ----------//
 *
 */
//

//---------- Search Data ----------//

const getSearchResults = async ({ route, query, location }) => {
  let response;
  if (route === "restaurants") {
    response = await axios.get(
      `${url}/${route}/search?searchTerm=${query}&lat=${location.lat}&lng=${location.lng}`,
      bearerToken(token)
    );
  } else {
    response = await axios.get(
      `${url}/${route}/search/${query}`,
      bearerToken(token)
    );
  }
  return response.data;
};

//---------- User Profile Data ----------//

const getUserContent = async ({ route, userId }) => {
  const response = await axios.get(
    `${url}/${route}/user/${userId}`,
    bearerToken(token)
  );
  return response.data;
};

//---------- Upvote Data ----------//

const getUpvoteStatus = async ({ route, id, userId }) => {
  const upvoteStatus = await axios.get(
    `${url}/${route}/${id}/upvote/${userId}`,
    bearerToken(token)
  );
  return upvoteStatus.data.hasUpvoted;
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
 *  //---------- Specific Routes ----------//
 *
 */
//

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

const getUserProfile = async (userId) => {
  const response = await axios.get(
    `${url}/users/${userId}`,
    bearerToken(token)
  );
  return response.data.data;
};

const followUser = async ({ followerId, userId }) => {
  await axios.post(
    `${url}/follows/${userId}`,
    { followerId },
    bearerToken(token)
  );
};

const unfollowUser = async ({ followerId, userId }) => {
  await axios.post(
    `${url}/follows/unfollow/${userId}`,
    { followerId },
    bearerToken(token)
  );
};

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

//---------- Restaurant Page ----------//

const getRestaurantData = async (placeId) => {
  const response = await axios.get(
    `${url}/restaurants/${placeId}`,
    bearerToken(token)
  );
  return response.data.data;
};

const getRestaurantReviews = async (placeId) => {
  const response = await axios.get(
    `${url}/reviews/${placeId}`,
    bearerToken(token)
  );
  return response.data.reviews;
};

const getRestaurantMakanlists = async (placeId) => {
  const response = await axios.get(
    `${url}/makanlists/${placeId}`,
    bearerToken(token)
  );
  return response.data;
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
  // ———————————— Reusable Routes

  // Search Data
  getSearchResults,

  // User Data
  getUserContent,

  // User Profile Data
  getUpvoteStatus,
  getUpvoteCount,
  handleHeart,

  // ———————————— Specific Routes

  // Home Page
  getFeed,

  // Map Page
  getMapMarkers,

  // User Page
  getUserProfile,
  followUser,
  unfollowUser,
  getFollowerCount,
  getFollowingCount,
  getFollowStatus,

  // List Page
  removeFromMakanlist,
  deleteMakanlist,

  // Restaurant Page
  getRestaurantData,
  getRestaurantReviews,
  getRestaurantMakanlists,

  // Review Page
  deleteReview,
};
