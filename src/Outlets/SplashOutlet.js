import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//---------- Others ----------//

import { UserContext } from "../App";
import { getCurrentUser, getNewTokens } from "../Utilities/auth";

//------------------------------//

const SplashOutlet = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    // Navigate home if tokens exist

    const checkStatus = async () => {
      if (token && refreshToken) {
        if (!user) {
          try {
            const returnedUser = await getCurrentUser();
            setUser({
              username: returnedUser.username,
              email: returnedUser.email,
              id: returnedUser.id,
              photoUrl: returnedUser.photoUrl,
              token: token,
            });
            navigate("/home");
          } catch (err) {
            console.log("Access token expired! Getting new tokens.");
            try {
              const returnedUser = await getNewTokens();
              setUser({
                username: returnedUser.data.username,
                email: returnedUser.data.email,
                id: returnedUser.data.id,
                photoUrl: returnedUser.data.photoUrl,
                token: returnedUser.token,
              });
              navigate("/home");
            } catch {
              console.log("Refresh token expired! Login required.");
              navigate("/");
            }
          }
        } else {
          navigate("/home");
        }
      }
    };

    checkStatus();

    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
};

export default SplashOutlet;
