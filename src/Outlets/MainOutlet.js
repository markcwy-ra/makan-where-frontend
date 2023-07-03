import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ReviewComposer from "../Components/Forms/ReviewComposer";
import { useState, useEffect, useContext } from "react";
import ListComposer from "../Components/Forms/ListComposer";
import { UserContext } from "../App";
import { getCurrentUser, getNewTokens } from "../Utilities/auth";

const MainOutlet = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  useEffect(() => {
    const checkStatus = async () => {
      if (!token || !refreshToken) {
        navigate("/");
      } else {
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
            } catch {
              console.log("Refresh token expired! Login required.");
              navigate("/");
            }
          }
        }
      }
    };

    checkStatus();

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
