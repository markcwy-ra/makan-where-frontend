import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ReviewComposer from "../Components/Forms/ReviewComposer";
import { useState, useEffect, useContext } from "react";
import ListComposer from "../Components/Forms/ListComposer";
import { UserContext } from "../App";
import { getCurrentUser, getNewTokens } from "../Utilities/auth";

const MainOutlet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);
  const [initialLoad, setInitialLoad] = useState(null);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    setInitialLoad(new Date());
  }, []);

  useEffect(() => {
    const currentLoad = new Date();
    const elapsedTime = currentLoad / 60000 - initialLoad / 60000;
    if (elapsedTime > 45) {
      getNewTokens({ setUser, refreshToken }).catch(() => {
        console.log("Refresh token expired! Login required.");
        navigate("/");
      });
    }
    //eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    // Check if tokens exist
    if (!token || !refreshToken) {
      navigate("/");
    } else {
      if (!user) {
        getCurrentUser({ setUser, token, refreshToken }).catch(() => {
          console.log("Access token expired! Getting new tokens.");
          getNewTokens({ setUser, refreshToken }).catch(() => {
            console.log("Refresh token expired! Login required.");
            navigate("/");
          });
        });
      }
    }

    // eslint-disable-next-line
  }, [user]);

  const handleToggle = (target) => {
    if (target === "review-composer") {
      setReviewToggle((prev) => !prev);
    } else if (target === "makanlist-composer") {
      setListToggle((prev) => !prev);
    }
  };

  if (user) {
    return (
      <div className="App">
        {reviewToggle && <ReviewComposer handleToggle={handleToggle} />}
        {listToggle && <ListComposer handleToggle={handleToggle} />}
        <NavBar handleToggle={handleToggle} />
        <Outlet />
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default MainOutlet;
