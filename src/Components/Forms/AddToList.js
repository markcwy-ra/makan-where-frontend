//---------- React ----------//

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//---------- Components ----------//

import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import Close from "../../Icons/Close.svg";

//---------- Motion ----------//

import Fade from "../../Details/Animation/Fade";
import SlideUp from "../../Details/Animation/SlideUp";

//---------- Others ----------//

import "./Forms.css";
import { UserContext } from "../../App";
import { addToMakanlist, getUserContent } from "../../Utilities/fetch";

//------------------------------//

const AddToList = ({ handleToggle, restaurantId }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [listId, setListId] = useState(null);
  const [allLists, setAllLists] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        // Get restaraunt details
        const response = await getUserContent({
          route: "makanlists",
          userId: user.id,
        });
        const listOptions = response.map((list, i) => (
          <option key={i} value={list.id}>
            {list.title}
          </option>
        ));
        setAllLists(listOptions);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addToMakanlist({ userId: user.id, listId, restaurantId });
      handleToggle("add-to-makanlist");
      navigate(`/makanlists/${user.id}/${listId}`);
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
    <Fade className="bg-overlay">
      <SlideUp className="form-popup">
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
      </SlideUp>
    </Fade>
  );
};

export default AddToList;
