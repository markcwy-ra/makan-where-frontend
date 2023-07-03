import { useEffect, useState } from "react";
import { getSearchResults } from "../../Utilities/fetch";
import Search from "../../Icons/Search.svg";
import "./SearchBar.css";

const SearchBar = ({
  db = "places",
  location,
  setResults,
  setIsError,
  setErrorMessage,
}) => {
  const [query, setQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState(null);
  let placeholderCopy;

  switch (db) {
    case "places":
      placeholderCopy = "Search by cuisine or place name";
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

  useEffect(() => {
    setQuery("");
  }, [db]);

  useEffect(() => {
    if (location) {
      setSearchLocation(location);
    } else {
      setSearchLocation({
        lat: 1.3521,
        lng: 103.8198,
      });
    }
  }, [location]);

  const handleChange = (e) => {
    setIsError(false);
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (db === "places") {
      if (searchLocation) {
        try {
          const results = await getSearchResults({
            route: "restaurants",
            query,
            location: searchLocation,
          });
          setResults(results.data);
        } catch (err) {
          setErrorMessage("No places found!");
          setIsError(true);
        }
      } else {
        setErrorMessage("Please wait while we get your location!");
        setIsError(true);
      }
    } else if (db === "makanlists") {
      try {
        const results = await getSearchResults({ route: "makanlists", query });
        setResults(results);
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setErrorMessage("No makanlists found!");
          setIsError(true);
        }
      }
    } else if (db === "users") {
      try {
        const results = await getSearchResults({ route: "users", query });
        setResults(results);
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setResults(null);
          setErrorMessage("No users found!");
          setIsError(true);
        }
      }
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={placeholderCopy}
          onChange={handleChange}
          value={query}
        />
        <img src={Search} alt="Search Bar" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default SearchBar;
