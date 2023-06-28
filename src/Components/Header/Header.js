import { useContext } from "react";
import Map from "../../Icons/Map.svg";
import Search from "../../Icons/Search.svg";
import User from "../../Icons/User.svg";
import "./Header.css";
import { UserContext } from "../../App";

const Header = ({ children, icon, handleClick = null }) => {
  let selectedIcon;
  const { user } = useContext(UserContext);

  switch (icon) {
    case "search":
      selectedIcon = Search;
      break;
    case "map":
      selectedIcon = Map;
      break;
    case "profile":
      selectedIcon = user.photoUrl ? user.photoUrl : User;
      break;
    default:
      break;
  }

  return (
    <div id="header">
      <div className="header-title">{children}</div>
      {selectedIcon && (
        <img
          id={icon}
          className={icon === "profile" ? "header-profilepic" : ""}
          src={selectedIcon}
          alt={icon}
          onClick={handleClick}
          style={icon === "profile" ? { cursor: "pointer" } : null}
        />
      )}
    </div>
  );
};

export default Header;
