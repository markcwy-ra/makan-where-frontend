import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Components ----------//

import Close from "../../Icons/Close.svg";
import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import SearchBar from "../../Details/SearchBar/SearchBar";
import VertFeed from "../Feeds/VertFeed";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";

//---------- Others ----------//

import "./Forms.css";
import axios from "axios";
import { UserContext } from "../../App";
import { bearerToken } from "../../Utilities/token";

//------------------------------//

const ListEditor = ({ handleClick, list, setList, data, setData }) => {
  const { user } = useContext(UserContext);
  const { listId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [activeToggle, setActiveToggle] = useState("add-places");
  const [location, setLocation] = useState(null);
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);
  const [listDisplay, setListDisplay] = useState(null);

  //---------- useEffect Functions ----------//

  // Get Location
  useEffect(() => {
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Can't find your location! Enable location services for your browser in settings."
            );
            setLocation({
              lat: 1.3521,
              lng: 103.8198,
            });
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: Infinity,
        }
      );
    };
    getLocation();
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
    setListDisplay(<VertFeed data={list} type="restaurants" />);
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
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/makanlists/user/${user.id}/${data.id}`,
        { title, description, photoUrl },
        bearerToken(user.token)
      );
      setData(response.data.updatedMakanlist);
      handleClick();
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
            {/* {listDisplay} */}
            <SearchBar
              location={location}
              setIsError={setIsError}
              setErrorMessage={setErrorMessage}
              setResults={setResults}
            />
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
        {isError && <ErrorPill message={errorMessage} />}
        {activeToggle === "edit-details" && (
          <Button
            id="form-submit"
            label="Save Edits"
            handleClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default ListEditor;
