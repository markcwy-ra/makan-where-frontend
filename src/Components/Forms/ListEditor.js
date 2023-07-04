import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Components ----------//

import Close from "../../Icons/Close.svg";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import VertFeed from "../Feeds/VertFeed";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import ErrorPill from "../../Details/Errors/ErrorPill";
import StatusPill from "../../Details/Status/StatusPill";

//---------- Helper Functions ----------//

import {
  deleteMakanlist,
  removeFromMakanlist,
  updateMakanlist,
} from "../../Utilities/fetch";
import getLocation from "../../Utilities/location";
import { useIsFirstRender } from "../../Utilities/utils";

//---------- Others ----------//

import { UserContext } from "../../App";
import "./Forms.css";

//------------------------------//

const ListEditor = ({ handleClick, list, setList, data, setData }) => {
  // Get initial variables & hooks
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { listId } = useParams();

  // Form tab toggles
  const [activeToggle, setActiveToggle] = useState("add-places");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [listDisplay, setListDisplay] = useState(null);

  // Search & search result states
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);

  // Messages & Message Pills
  const [deleteListWarning, setDeleteListWarning] =
    useState("Delete Makanlist");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [hasStatus, setHasStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // useRef to check for first render
  const isFirstRender = useIsFirstRender();

  //---------- useEffect Functions ----------//

  // Get Location
  useEffect(() => {
    getLocation(setLocation);
  }, []);

  // Prefill Editor with current details
  useEffect(() => {
    setTitle(data.title);
    setDescription(data.description);
  }, [data]);

  useEffect(() => {
    if (!isFirstRender) {
      setHasStatus(true);
      setStatusMessage("Added to list!");
    }
    //eslint-disable-next-line
  }, [list]);

  // Display Search Results
  useEffect(() => {
    let display = null;
    if (results) {
      const filteredResults = results.filter((place) => {
        for (let i = 0; i < list.length; i++) {
          if (list[i].placeId === place.place_id) {
            return false;
          }
        }
        return true;
      });
      display = filteredResults.map((foundPlace, index) => {
        const content = {
          name: foundPlace.name,
          place_id: foundPlace.place_id,
          address: foundPlace.vicinity,
        };
        return (
          <RestaurantCard
            key={index}
            content={content}
            type="list-add"
            setData={setList}
            listId={listId}
          />
        );
      });
    }
    setResultsDisplay(display);
    if (display && display.length === 0) {
      setErrorMessage("No places found!");
      setIsError(true);
    }
    //eslint-disable-next-line
  }, [results, list]);

  // Update List of Places in Editor
  useEffect(() => {
    setListDisplay(
      <VertFeed
        data={list}
        type="restaurants-list-edit"
        handleRemove={handleRemove}
      />
    );
    //eslint-disable-next-line
  }, [list]);

  //---------- Action Functions ----------//

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeToggle === "edit-details") {
      let photoUrl = null;
      if (file) {
        const fileRef = ref(
          storage,
          `uploads/${user.username}/makanlists/${file.name}`
        );
        await uploadBytesResumable(fileRef, file);
        photoUrl = await getDownloadURL(fileRef);
      }
      const updatedMakanlist = await updateMakanlist({
        userId: user.id,
        listId: data.id,
        title,
        description,
        photoUrl,
      });
      setData(updatedMakanlist);
      handleClick();
    }
  };

  const handleRemove = async (data) => {
    await removeFromMakanlist({
      userId: user.id,
      listId,
      restaurantId: data.id,
    });
    setList((prevList) =>
      prevList.filter((restaurant) => restaurant.id !== data.id)
    );
  };

  const handleDelete = async () => {
    if (deleteListWarning === "Delete Makanlist") {
      setDeleteListWarning("Tap Again to Confirm");
    } else {
      await deleteMakanlist({
        userId: user.id,
        listId,
      });
      navigate("/profile");
    }
  };

  const handleToggle = (e) => {
    const id = e.currentTarget.id;
    setActiveToggle(id);
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

  //------------------------------//

  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Edit Makanlist</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={handleClick}
          />
        </div>
        <div className="search-toggles">
          <Button
            label="Add Places"
            id="add-places"
            size="small"
            isActive={activeToggle === "add-places" ? true : false}
            handleClick={handleToggle}
          />
          <Button
            label="Manage Places"
            id="manage-places"
            size="small"
            isActive={activeToggle === "manage-places" ? true : false}
            handleClick={handleToggle}
          />
          <Button
            label="Edit Details"
            id="edit-details"
            size="small"
            isActive={activeToggle === "edit-details" ? true : false}
            handleClick={handleToggle}
          />
        </div>
        {activeToggle === "add-places" && (
          <div className="form-overflow">
            <SearchBar location={location} setResults={setResults} />
            {hasStatus && <StatusPill message={statusMessage} />}
            {isError && <ErrorPill message={errorMessage} />}
            <div className="form-overflow">{resultsDisplay}</div>
          </div>
        )}
        {activeToggle === "manage-places" && (
          <div className="form-overflow">{listDisplay}</div>
        )}
        {activeToggle === "edit-details" && (
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
            <input id="file" type="file" onChange={handleChange} />
          </form>
        )}

        {activeToggle === "edit-details" && (
          <Button
            id="form-submit"
            label="Save Edits"
            handleClick={handleSubmit}
          />
        )}
        {activeToggle === "edit-details" && (
          <Button
            id="delete-list"
            label={deleteListWarning}
            handleClick={handleDelete}
            type="warning"
          />
        )}
      </div>
    </div>
  );
};

export default ListEditor;
