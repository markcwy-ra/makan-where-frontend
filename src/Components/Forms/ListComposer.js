import Close from "../../Icons/Close.svg";
import "./Forms.css";

const ListComposer = ({ handleToggle }) => {
  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Create Makanlist</h2>
          <img
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("makanlist-composer")}
          />
        </div>

        <form></form>
      </div>
    </div>
  );
};

export default ListComposer;
