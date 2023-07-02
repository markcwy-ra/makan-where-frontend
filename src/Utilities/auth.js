// Auth related functions

import axios from "axios";
import { bothTokens, logoutToken } from "./token.js";

const getCurrentUser = async ({ setUser, token, refreshToken }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
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

const getNewTokens = async ({ setUser, refreshToken }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
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

export { getCurrentUser, getNewTokens };
