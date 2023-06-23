import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import ReviewComposer from "../Components/Forms/ReviewComposer";
import { useState } from "react";
import ListComposer from "../Components/Forms/ListComposer";

const MainOutlet = () => {
  const [reviewToggle, setReviewToggle] = useState(false);
  const [listToggle, setListToggle] = useState(false);

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
