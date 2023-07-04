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

//---------- Others ----------//

import "./Forms.css";
import { UserContext } from "../../App";
import {
  deleteMakanlist,
  removeFromMakanlist,
  updateMakanlist,
} from "../../Utilities/fetch";
import getLocation from "../../Utilities/location";

//------------------------------//

const ListEditor = ({ handleClick, list, setList, data, setData }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { listId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [activeToggle, setActiveToggle] = useState("add-places");
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);
  const [listDisplay, setListDisplay] = useState(null);
  const [deleteListWarning, setDeleteListWarning] =
    useState("Delete Makanlist");

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

  // Display Search Results
  useEffect(() => {
    let display = null;
    if (results) {
      console.log(results);
      display = results.map((foundPlace, index) => {
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
    //eslint-disable-next-line
  }, [results]);

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
