import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ReviewComposer from "../Components/Forms/ReviewComposer";
import { useState, useEffect, useContext } from "react";
import ListComposer from "../Components/Forms/ListComposer";
import axios from "axios";
import { bothTokens, logoutToken } from "../utils";
import { UserContext } from "../App";

const MainOutlet = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    // Check if tokens exist
    if (!token || !refreshToken) {
      navigate("/");
    }

    const getCurrentUser = async () => {
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
        });
      } catch (err) {
        console.log("error! getting new refresh token");
        getNewRefreshToken();
        console.log(err);
      }
    };

    const getNewRefreshToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/refresh`,
          {},
          logoutToken(refreshToken)
        );
        console.log(response);
      } catch (err) {
        navigate("/");
      }
    };

    if (!user) {
      getCurrentUser();
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
