//---------- React ----------//

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//---------- Components ----------//

import MenuNavBarAdd from "../../Details/Menus/MenuNavBarAdd";

//---------- Icons ----------//

import Home from "../../Icons/Home.svg";
import Map from "../../Icons/Map.svg";
import Add from "../../Icons/Add.svg";
import Search from "../../Icons/Search.svg";

//---------- Others ----------//

import "./NavBar.css";

//------------------------------//

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    setActiveIcon(location.pathname);
  }, [location]);

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "add") {
      setShowMenu((prev) => !prev);
    } else {
      setActiveIcon(location.pathname);
      navigate("/" + id);
    }
  };

  return (
    <div id="nav">
      {showMenu && <MenuNavBarAdd />}

      <div className="navbar-icon">
        <img src={Home} onClick={handleClick} id="" alt="Home Button" />
        {activeIcon === "/" && <div className="navbar-active" />}
      </div>

      <div className="navbar-icon">
        <img src={Map} onClick={handleClick} id="map" alt="Map Button" />
        {activeIcon === "/map" && <div className="navbar-active" />}
      </div>

      <img src={Add} onClick={handleClick} id="add" alt="Add Button" />

      <div className="navbar-icon">
        <img
          src={Search}
          onClick={handleClick}
          id="search"
          alt="Search Button"
        />
        {activeIcon === "/search" && <div className="navbar-active" />}
      </div>

      <div className="navbar-icon">
        <img
          src={Home}
          onClick={handleClick}
          id="profile"
          alt="Profile Button"
        />
        {activeIcon === "/profile" && <div className="navbar-active" />}
      </div>
    </div>
  );
};

export default NavBar;
