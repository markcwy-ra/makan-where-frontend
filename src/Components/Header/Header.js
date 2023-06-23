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
    default:
      break;
  }

  return (
    <div id="header">
      <div className="header-title">{children}</div>
      {selectedIcon && <img src={selectedIcon} alt={icon} />}
    </div>
  );
};

export default Header;
