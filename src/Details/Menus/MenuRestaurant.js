import "./Menus.css";

const MenuRestaurant = ({ handleToggle, setShowMenu }) => {
  const handleClick = (e) => {
    handleToggle(e.currentTarget.id);
    setShowMenu(false);
  };
  return (
    <div className="menu-popup menu-restaurant">
      <h4 onClick={handleClick} id="review-composer">
        Add Review
      </h4>
      <div className="divider-line" />
      <h4 onClick={handleClick} id="makanlist-composer">
        Add to Makanlist
      </h4>
    </div>
  );
};

export default MenuRestaurant;
