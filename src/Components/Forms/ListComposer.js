//---------- React ----------//

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Components ----------//

import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import Close from "../../Icons/Close.svg";
import UploadImageButton from "../../Details/Buttons/UploadImageButton";

//---------- Motion ----------//

import Fade from "../../Details/Animation/Fade";
import SlideUp from "../../Details/Animation/SlideUp";

//---------- Others ----------//

import "./Forms.css";
import { UserContext } from "../../App";
import { createMakanlist } from "../../Utilities/fetch";

//------------------------------//

const ListComposer = ({ handleToggle }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setErrorMessage("Please fill in title and description!");
      setIsError(true);
    } else {
      try {
        let photoUrl = null;

        if (file) {
          const fileRef = ref(
            storage,
            `uploads/${user.username}/makanlists/${file.name}`
          );
          await uploadBytesResumable(fileRef, file);
          photoUrl = await getDownloadURL(fileRef);
        }
        const newMakanlist = await createMakanlist({
          userId: user.id,
          title,
          description,
          photoUrl,
        });
        handleToggle("makanlist-composer");
        navigate(`/makanlists/${user.id}/${newMakanlist.id}`);
      } catch (err) {
        console.log(err);
        setErrorMessage("Error creating Makanlist");
        setIsError(true);
      }
    }
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "title":
        setTitle(e.currentTarget.value);
        break;
      case "description":
        setDescription(e.currentTarget.value);
        break;
      case "file":
        setFile(e.currentTarget.files[0]);
        break;
      default:
        break;
    }
  };

  return (
    <Fade className="bg-overlay">
      <SlideUp className="form-popup">
        <div className="form-popup-header">
          <h2>Create New Makanlist</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("makanlist-composer")}
          />
        </div>

        <form>
          <input
            id="title"
            type="text"
            placeholder="List Name"
            onChange={handleChange}
            value={title}
          />
          <textarea
            id="description"
            rows="5"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
          <UploadImageButton
            file={file}
            handleChange={handleChange}
            label="Upload a Cover Image"
          />
        </form>

        {isError && <ErrorPill message={errorMessage} />}
        <Button
          id="form-submit"
          label="Create Makanlist"
          handleClick={handleSubmit}
        />
      </SlideUp>
    </Fade>
  );
};

export default ListComposer;
