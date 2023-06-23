import "./MenuNavBarAdd.css";

const MenuNavBarAdd = ({ handleToggle, setShowMenu }) => {
  const handleClick = (e) => {
    handleToggle(e.currentTarget.id);
    setShowMenu(false);
  };
  return (
    <div className="menu-add-navbar">
      <h4 onClick={handleClick} id="review-composer">
        Add Review
      </h4>
      <div className="divider-line" />
      <h4 onClick={handleClick} id="makanlist-composer">
        Create Makanlist
      </h4>
    </div>
  );
};

export default MenuNavBarAdd;
