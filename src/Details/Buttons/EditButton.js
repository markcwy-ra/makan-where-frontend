import { ReactComponent as EditIcon } from "../../Icons/Edit.svg";

const EditButton = ({ handleClick, white = false }) => {
  return (
    <EditIcon
      className={`icon-button ${white && "white-icon"}`}
      onClick={handleClick}
    />
  );
};

export default EditButton;
