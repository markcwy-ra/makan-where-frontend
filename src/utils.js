const bearerToken = (token) => {
  const output = {
    headers: {
      Authorization: `Bearer ${token}`,
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

export { bearerToken, logoutToken };
