import { ReactComponent as ImageIcon } from "../../Icons/Image.svg";
import { ReactComponent as DoneIcon } from "../../Icons/Done.svg";
import "./Button.css";

const UploadImageButton = ({ file, handleChange, label }) => {
  return (
    <>
      <label
        htmlFor="file"
        className={`custom-file-upload clickable ${file && "file-attached"}`}
      >
        {file ? file.name : label}
        {file ? (
          <DoneIcon className={`upload-icon-after`} />
        ) : (
          <ImageIcon className={`upload-icon-before`} />
        )}
      </label>
      <input id="file" type="file" onChange={handleChange} />
    </>
  );
};
export default UploadImageButton;
