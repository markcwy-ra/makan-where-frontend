import { useContext, useEffect, useState } from "react";

//---------- Components ----------//

import StatusPill from "../Status/StatusPill";
import ErrorPill from "../Errors/ErrorPill";
import Search from "../../Icons/Search.svg";
import { ReactComponent as LocationServices } from "../../Icons/LocationServices.svg";
import { ReactComponent as Loading } from "../../Icons/Loading.svg";

//---------- Helper Functions ----------//

import getLocation from "../../Utilities/location";
import { getSearchResults } from "../../Utilities/fetch";

//---------- Others ----------//

import { UserContext } from "../../App";
import "./SearchBar.css";
import "../../Pages/LoadingScreen/LoadingScreen.css";

//------------------------------//

const SearchBar = ({ db = "places", setResults }) => {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  const [hasStatus, setHasStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let placeholderCopy;

  switch (db) {
    case "places":
      placeholderCopy = "Search for a place";
      break;
    case "makanlists":
      placeholderCopy = "Search by Makanlist name";
      break;
    case "users":
      placeholderCopy = "Search by username";
      break;
    default:
      break;
  }

  //-------------- useEffect Functions ------------//

  useEffect(() => {
    setQuery("");
    setIsError(false);
    setHasStatus(false);
  }, [db]);

  // Set state location to user's selection
  useEffect(() => {
    if (db === "places") {
      if (hasLocation) {
        getLocation(setLocation);
      } else {
        setLocation({
          lat: user.location.lat,
          lng: user.location.lng,
        });
      }
    }
  }, [db, hasLocation, user]);

  // Set search location to location state
  useEffect(() => {
    if (location) {
      setSearchLocation(location);
    }
  }, [location]);

  // Check if location is still loading
  useEffect(() => {
    if (
      hasLocation &&
      location.lat === user.location.lat &&
      location.lng === user.location.lng
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [location, user, hasLocation]);

  //-------------- Action Functions ------------//

  const handleChange = (e) => {
    setIsError(false);
    setHasStatus(false);
    setQuery(e.currentTarget.value);
  };

  const handleLocation = () => {
    setHasLocation((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResults(null);
    setStatusMessage("Loading results...");
    setHasStatus(true);
    if (db === "places") {
      if (searchLocation) {
        try {
          const results = await getSearchResults({
            route: "restaurants",
            query,
            location: searchLocation,
          });
          setResults(results.data);
          setHasStatus(false);
          if (results.data.length === 0) {
            setErrorMessage("No places found!");
            setIsError(true);
          }
        } catch (err) {
          setHasStatus(false);
          setErrorMessage("No places found!");
          setIsError(true);
        }
      } else {
        setStatusMessage("Please wait while we get your location!");
        setHasStatus(true);
        setIsError(false);
      }
    } else if (db === "makanlists") {
      try {
        const results = await getSearchResults({ route: "makanlists", query });
        setResults(results);
        setHasStatus(false);

        if (!results) {
          setErrorMessage("No makanlists found!");
          setIsError(true);
        }
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setHasStatus(false);
          setErrorMessage("No makanlists found!");
          setIsError(true);
        }
      }
    } else if (db === "users") {
      try {
        const results = await getSearchResults({ route: "users", query });
        setResults(results);
        setHasStatus(false);
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setResults(null);
          setHasStatus(false);
          setErrorMessage("No users found!");
          setIsError(true);
        }
      }
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-field">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={placeholderCopy}
            onChange={handleChange}
            value={query}
          />
          <img src={Search} alt="Search Bar" onClick={handleSubmit} />
        </form>
        {db === "places" && (
          <div
            className={`search-bar-location-${
              hasLocation && !isLoading ? "active" : "inactive"
            }`}
            onClick={handleLocation}
          >
            {isLoading ? (
              <div className="rotate">
                <Loading />
              </div>
            ) : (
              <LocationServices />
            )}
          </div>
        )}
      </div>
      {hasStatus && <StatusPill message={statusMessage} />}
      {isError && <ErrorPill message={errorMessage} />}
    </div>
  );
};

export default SearchBar;
