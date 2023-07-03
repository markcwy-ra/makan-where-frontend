// Auth related functions

import axios from "axios";
import { bothTokens, logoutToken } from "./token.js";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const url = process.env.REACT_APP_BACKEND_URL;

const getCurrentUser = async () => {
  const response = await axios.get(
    `${url}/users`,
    bothTokens(token, refreshToken)
  );
  return response.data.data;
};

const getNewTokens = async () => {
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

const logout = async () => {
  await axios.post(`${url}/auth/sign-out`, {}, logoutToken(refreshToken));
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export { getCurrentUser, getNewTokens, logout };
