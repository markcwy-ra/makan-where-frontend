//---------- React ----------//

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//---------- Components ----------//

import MenuNavBar from "../../Details/Menus/MenuNavBar";

//---------- Icons ----------//

import Home from "../../Icons/Home.svg";
import Map from "../../Icons/Map.svg";
import Add from "../../Icons/Add.svg";
import Search from "../../Icons/Search.svg";

//---------- Others ----------//

import "./NavBar.css";

//------------------------------//

const NavBar = ({ handleToggle }) => {
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
      {showMenu && (
        <MenuNavBar handleToggle={handleToggle} setShowMenu={setShowMenu} />
      )}

      <div className="navbar-icon">
        <img src={Home} onClick={handleClick} id="home" alt="Home Button" />
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

      <div className="navbar-icon navbar-profilepic">
        <img
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90byUyMGFzaWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60"
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
