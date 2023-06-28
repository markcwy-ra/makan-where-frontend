import { useState } from "react";
import "./SearchBar.css";
import Search from "../../Icons/Search.svg";
import axios from "axios";

const SearchBar = ({
  db = "places",
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

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (db === "users") {
      try {
        const response = axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/search/${query}`
        );
        console.log(response);
      } catch (err) {
        const code = err.response.status;
        if (code === 404) {
          setErrorMessage("No users found");
          setIsError(true);
        }
      }
    }
    // setResults();
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
