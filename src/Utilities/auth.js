// Auth related functions

import axios from "axios";
import { bothTokens, logoutToken } from "./token.js";

const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");
const url = process.env.REACT_APP_BACKEND_URL;

const getCurrentUser = async ({ setUser }) => {
  try {
    const response = await axios.get(
      `${url}/users`,
      bothTokens(token, refreshToken)
    );
    const data = response.data.data;
    setUser({
      username: data.username,
      email: data.email,
      id: data.id,
      photoUrl: data.photoUrl,
      token: token,
    });
  } catch (err) {
    throw err;
  }
};

const getNewTokens = async ({ setUser }) => {
  try {
    const response = await axios.post(
      `${url}/auth/refresh`,
      {},
      logoutToken(refreshToken)
    );
    const data = response.data.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser({
      username: data.username,
      email: data.email,
      id: data.id,
      photoUrl: data.photoUrl,
      token: data.token,
    });
  } catch (err) {
    throw err;
  }
};

const logout = async () => {
  await axios.post(`${url}/auth/sign-out`, {}, logoutToken(refreshToken));
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

export { getCurrentUser, getNewTokens, logout };
