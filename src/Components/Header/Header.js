import { useContext } from "react";
import Map from "../../Icons/Map.svg";
import Search from "../../Icons/Search.svg";
import User from "../../Icons/User.svg";
import "./Header.css";
import { UserContext } from "../../App";

const Header = ({ children, icon, userData, handleClick = null }) => {
  const { user } = useContext(UserContext);

  let selectedIcon;
  switch (icon) {
    case "search":
      selectedIcon = Search;
      break;
    case "map":
      selectedIcon = Map;
      break;
    default:
      break;
  }

  if (icon === "profile") {
    if (userData) {
      return (
        <div id="header">
          <div className="header-title">
            <h1>@{userData.username}</h1>
          </div>

          <img
            id={icon}
            className={"header-profilepic"}
            src={userData.photoUrl ? userData.photoUrl : User}
            alt={icon}
            onClick={handleClick}
            style={userData.id === user.id ? { cursor: "pointer" } : null}
          />
        </div>
      );
    }
  } else {
    return (
      <div id="header">
        <div className="header-title">{children}</div>
        {selectedIcon && (
          <img id={icon} src={selectedIcon} alt={icon} onClick={handleClick} />
        )}
      </div>
    );
  }
};

export default Header;
