import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";

const MainOutlet = () => {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainOutlet;
