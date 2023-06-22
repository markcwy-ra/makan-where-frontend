import "./NavBar.css";
import Home from "../../Icons/Home.svg";
import Map from "../../Icons/Map.svg";
import Add from "../../Icons/Add.svg";
import Search from "../../Icons/Search.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuNavBarAdd from "../Menus/MenuNavBarAdd";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "add") {
      setShowMenu((prev) => !prev);
    } else {
      navigate("/" + id);
    }
  };

  return (
    <div id="nav">
      {showMenu && <MenuNavBarAdd />}
      <img src={Home} onClick={handleClick} id="" alt="Home Button" />
      <img src={Map} onClick={handleClick} id="map" alt="Map Button" />
      <img src={Add} onClick={handleClick} id="add" alt="Add Button" />
      <img src={Search} onClick={handleClick} id="search" alt="Search Button" />
      <img src={Home} onClick={handleClick} id="profile" alt="Profile Button" />
    </div>
  );
};

export default NavBar;
