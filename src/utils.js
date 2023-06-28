import axios from "axios";

const bearerToken = (token) => {
  const output = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return output;
};

const bothTokens = (token, refreshToken) => {
  const output = {
    headers: {
      Authorization: `Bearer ${token}`,
      "refresh-token": refreshToken,
    },
  };
  return output;
};

const logoutToken = (token) => {
  const output = {
    headers: {
      "x-refresh-token": token,
    },
  };
  return output;
};

export { bearerToken, bothTokens, logoutToken };
