import { ReactComponent as ImageIcon } from "../../Icons/Image.svg";
import { ReactComponent as DoneIcon } from "../../Icons/Done.svg";
import "./Button.css";

const UploadImageButton = ({ file, handleChange, label, type = "default" }) => {
  return (
    <>
      <label
        htmlFor="file"
        className={`custom-file-upload clickable ${
          type === "outline" && "custom-file-outline"
        } ${file && "file-attached"}`}
      >
        <p>{file ? file.name : label}</p>
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
