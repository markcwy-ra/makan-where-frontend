import "./Menus.css";

const MenuProfile = ({ handleClick }) => {
  return (
    <div className="menu-popup menu-profile">
      <h4 onClick={handleClick} id="edit-profile">
        Edit Profile
      </h4>
      <div className="divider-line" />
      <h4 onClick={handleClick} id="logout">
        Log Out
      </h4>
    </div>
  );
};

export default MenuProfile;
