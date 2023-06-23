import Map from "../../Icons/Map.svg";
import Search from "../../Icons/Search.svg";
import "./Header.css";

const Header = ({ children, icon }) => {
  let selectedIcon;

  switch (icon) {
    case "search":
      selectedIcon = Search;
      break;
    case "map":
      selectedIcon = Map;
      break;
    case "profile":
      selectedIcon =
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaG90byUyMGFzaWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60";
      break;
    default:
      break;
  }

  return (
    <div id="header">
      <div className="header-title">{children}</div>
      {selectedIcon && (
        <img
          className={icon === "profile" ? "header-profilepic" : ""}
          src={selectedIcon}
          alt={icon}
        />
      )}
    </div>
  );
};

export default Header;
