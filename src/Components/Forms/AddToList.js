import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Components ----------//

import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import Close from "../../Icons/Close.svg";

//---------- Others ----------//

import "./Forms.css";
import axios from "axios";
import { UserContext } from "../../App";
import { bearerToken } from "../../Utilities/token";

//------------------------------//

const AddToList = ({ handleToggle, restaurantId }) => {
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [listId, setListId] = useState(null);
  const [allLists, setAllLists] = useState(null);

  useEffect(() => {
    const getUserLists = async () => {
      try {
        // Get restaraunt details
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${user.id}`,
          bearerToken(user.token)
        );
        console.log(response);
        const listOptions = response.data.map((list, i) => (
          <option key={i} value={list.id}>
            {list.title}
          </option>
        ));
        setAllLists(listOptions);
      } catch (err) {
        console.log(err);
      }
    };

    getUserLists();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get restaraunt details
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${user.id}/${listId}`,
        { restaurantId },
        bearerToken(user.token)
      );
      handleToggle("add-to-makanlist");
    } catch (err) {
      setErrorMessage("Couldn't add to makanlist");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "list":
        setListId(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Add to Makanlist</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("add-to-makanlist")}
          />
        </div>

        <form>
          <select id="list" onChange={handleChange} required defaultValue="">
            <option value="" disabled>
              Choose Makanlist to add to
            </option>
            {allLists}
          </select>
        </form>

        {isError && <ErrorPill message={errorMessage} />}
        <Button
          id="form-submit"
          label="Add to Makanlist"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddToList;
