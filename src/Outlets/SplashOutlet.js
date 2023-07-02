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
        getCurrentUser({ setUser }).catch(() => {
          console.log("Access token expired! Getting new tokens.");
          getNewTokens({ setUser }).catch(() => {
            console.log("Refresh token expired! Login required.");
          });
          navigate("/home");
        });
        navigate("/home");
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
