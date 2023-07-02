import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { getCurrentUser, getNewTokens } from "../Utilities/auth";

const SplashOutlet = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    // Navigate home if tokens exist
    if (token && refreshToken) {
      if (!user) {
        try {
          getCurrentUser({ setUser, token, refreshToken });
          navigate("/home");
        } catch (err) {
          console.log("Access token expired! Getting new tokens.");
          try {
            getNewTokens({ setUser, refreshToken });
            navigate("/home");
          } catch (err) {
            console.log("Refresh token expired! Login required.");
          }
        }
      }
    }

    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default SplashOutlet;
