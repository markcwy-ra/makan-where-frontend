import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ReviewComposer from "../Components/Forms/ReviewComposer";
import { useState, useEffect, useContext } from "react";
import ListComposer from "../Components/Forms/ListComposer";
import axios from "axios";
import { bothTokens } from "../utils";
import { UserContext } from "../App";

const MainOutlet = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
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
      navigate("/home");
    };

    if (!user) {
      try {
        getCurrentUser();
      } catch (err) {
        navigate("/");
        console.log(err);
      }
    }
  }, [user]);

  const handleToggle = (target) => {
    if (target === "review-composer") {
      setReviewToggle((prev) => !prev);
    } else if (target === "makanlist-composer") {
      setListToggle((prev) => !prev);
    }
  };
  return (
    <div className="App">
      {reviewToggle && <ReviewComposer handleToggle={handleToggle} />}
      {listToggle && <ListComposer handleToggle={handleToggle} />}
      <NavBar handleToggle={handleToggle} />
      <Outlet />
    </div>
  );
};

export default MainOutlet;
