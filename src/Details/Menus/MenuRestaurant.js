import "./Menus.css";

const MenuRestaurant = ({ handleToggle, setShowMenu, hasReview = false }) => {
  const handleClick = (e) => {
    handleToggle(e.currentTarget.id);
    setShowMenu(false);
  };
  return (
    <div className="menu-popup menu-restaurant">
      {hasReview ? (
        <h4 onClick={handleClick} id="review-editor">
          Edit Review
        </h4>
      ) : (
        <h4 onClick={handleClick} id="review-composer">
          Add Review
        </h4>
      )}

      <div className="divider-line" />
      <h4 onClick={handleClick} id="add-to-makanlist">
        Add to Makanlist
      </h4>
    </div>
  );
};

export default MenuRestaurant;
