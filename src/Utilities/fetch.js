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

const getUpvotedData = async ({ route, userId }) => {
  const response = await axios.get(
    `${url}/${route}/user/${userId}/upvotes`,
    bearerToken(token)
  );
  return response.data;
};

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
  const names = Object.keys(coords);
  const ns = names[0];
  const ew = names[1];
  const response = await axios.get(
    `${url}/map?north=${coords[ns].hi}&south=${coords[ns].lo}&east=${coords[ew].hi}&west=${coords[ew].lo}`,
    bearerToken(token)
  );
  return response;
};

//---------- Profile Page ----------//

const updateUserProfile = async ({
  userId,
  username,
  email,
  currentPassword,
  newPassword,
  photoUrl,
  country,
  countryCode,
  latitude,
  longitude,
}) => {
  console.log(userId);
  const response = await axios.put(
    `${url}/users/${userId}/update`,
    {
      username,
      email,
      currentPassword,
      newPassword,
      photoUrl,
      country,
      countryCode,
      latitude,
      longitude,
    },
    bearerToken(token)
  );
  return response.data.data;
};

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

const getFollowers = async (userId) => {
  const response = await axios.get(
    `${url}/follows/${userId}/followers`,
    bearerToken(token)
  );
  return response.data.followers;
};

const getFollowing = async (userId) => {
  const response = await axios.get(
    `${url}/follows/${userId}/following`,
    bearerToken(token)
  );
  return response.data.following;
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

const getMakanlist = async ({ userId, listId }) => {
  const response = await axios.get(
    `${url}/makanlists/user/${userId}/${listId}`,
    bearerToken(token)
  );
  return response.data;
};

const createMakanlist = async ({ userId, title, description, photoUrl }) => {
  const response = await axios.post(
    `${url}/makanlists/`,
    { userId, title, description, photoUrl },
    bearerToken(token)
  );
  return response.data.newMakanlist;
};

const updateMakanlist = async ({
  userId,
  listId,
  title,
  description,
  photoUrl,
}) => {
  const response = await axios.put(
    `${url}/makanlists/user/${userId}/${listId}`,
    { title, description, photoUrl },
    bearerToken(token)
  );
  return response.data.updatedMakanlist;
};

const addToMakanlist = async ({ userId, listId, restaurantId }) => {
  const response = await axios.post(
    `${url}/makanlists/user/${userId}/${listId}`,
    { restaurantId },
    bearerToken(token)
  );
  return response;
};

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

const getReview = async ({ placeId, userId }) => {
  const response = await axios.get(
    `${url}/reviews/restaurant/${placeId}/user/${userId}`,
    bearerToken(token)
  );
  return response.data;
};

const createReview = async ({
  userId,
  restaurantId,
  rating,
  title,
  review,
  recommendedDishes,
  photoUrl,
}) => {
  const response = await axios.post(
    `${url}/reviews/${restaurantId}/add`,
    {
      userId,
      restaurantId,
      rating,
      title,
      body: review,
      recommendedDishes,
      photoUrl,
    },
    bearerToken(token)
  );
  return response.data;
};

const updateReview = async ({
  userId,
  reviewId,
  rating,
  title,
  review,
  recommendedDishes,
  photoUrl,
}) => {
  const response = await axios.put(
    `${url}/reviews/${reviewId}/update`,
    {
      userId,
      rating,
      title,
      body: review,
      recommendedDishes,
      photoUrl,
    },
    bearerToken(token)
  );
  return response.data;
};

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
  getUpvotedData,
  getUpvoteStatus,
  getUpvoteCount,
  handleHeart,

  // ———————————— Specific Routes

  // Home Page
  getFeed,

  // Map Page
  getMapMarkers,

  // User Page
  updateUserProfile,
  getUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getFollowerCount,
  getFollowingCount,
  getFollowStatus,

  // List Page
  getMakanlist,
  createMakanlist,
  updateMakanlist,
  addToMakanlist,
  removeFromMakanlist,
  deleteMakanlist,

  // Restaurant Page
  getRestaurantData,
  getRestaurantReviews,
  getRestaurantMakanlists,

  // Review Page
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
