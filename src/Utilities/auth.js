// Auth related functions

import axios from "axios";
import { bothTokens, logoutToken } from "./token.js";
const url = process.env.REACT_APP_BACKEND_URL;
// const url = process.env.REACT_APP_HOSTED_BACKEND_URL;

const login = async ({ email, password }) => {
  const response = await axios.post(`${url}/auth/sign-in`, { email, password });
  return response.data.data;
};

const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  await axios.post(`${url}/auth/sign-out`, {}, logoutToken(refreshToken));
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

const signup = async ({ username, email, password, photoUrl }) => {
  const response = await axios.post(`${url}/auth/sign-up`, {
    username,
    email,
    password,
    photoUrl,
  });
  return response.data.data;
};

const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.get(
    `${url}/users`,
    bothTokens(token, refreshToken)
  );
  return response.data.data;
};

const getNewTokens = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axios.post(
    `${url}/auth/refresh`,
    {},
    logoutToken(refreshToken)
  );
  const returnedData = response.data.data;
  localStorage.setItem("token", returnedData.token);
  localStorage.setItem("refreshToken", returnedData.refreshToken);
  return { data: returnedData, token: returnedData.token };
};

const sendResetEmail = async (email) => {
  const response = await axios.post(`${url}/auth/email-reset`, { email });
  return response;
};

const resetPassword = async ({ resetToken, newPassword }) => {
  const response = await axios.post(`${url}/auth/reset-password`, {
    resetToken,
    newPassword,
  });
  return response;
};

export {
  login,
  logout,
  signup,
  getCurrentUser,
  getNewTokens,
  sendResetEmail,
  resetPassword,
};
