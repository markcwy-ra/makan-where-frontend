import Close from "../../Icons/Close.svg";
import "./Forms.css";

const ReviewComposer = ({ handleToggle }) => {
  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Add Review</h2>
          <img
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("review-composer")}
          />
        </div>

        <form></form>
      </div>
    </div>
  );
};

export default ReviewComposer;
