import { useEffect, useState } from "react";
import "./SearchBar.css";
import Search from "../../Icons/Search.svg";
import axios from "axios";
import { bearerToken } from "../../Utilities/token";

const SearchBar = ({
  db = "places",
  location,
  setResults,
  setIsError,
  setErrorMessage,
}) => {
  const [query, setQuery] = useState("");
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

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (db === "places") {
      if (location) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/restaurants/search?searchTerm=${query}&lat=${location.lat}&lng=${location.lng}`,
            bearerToken(token)
          );
          setResults(response.data.data);
        } catch (err) {
          console.log(err);
          setErrorMessage("?");
          setIsError(true);
        }
      } else {
        setErrorMessage("Please wait while we get your location!");
        setIsError(true);
      }
    } else if (db === "makanlists") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/makanlists/search/${query}`,
          bearerToken(token)
        );
        setResults(response.data);
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setErrorMessage("No makanlists found!");
          setIsError(true);
        }
      }
    } else if (db === "users") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/users/search/${query}`
        );
        setResults(response.data);
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
