import "./Menus.css";

const MenuRestaurant = ({ handleClick }) => {
  return (
    <div className="menu-popup menu-restaurant">
      <h4 onClick={handleClick} id="add-review">
        Add Review
      </h4>
      <div className="divider-line" />
      <h4 onClick={handleClick} id="add-makanlist">
        Add to Makanlist
      </h4>
    </div>
  );
};

export default MenuRestaurant;
