import { useState } from "react";
import "./SearchBar.css";
import Search from "../../Icons/Search.svg";

const SearchBar = ({ db = "places" }) => {
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
  const handleSubmit = () => {
    console.log(query);
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
        <img src={Search} alt="Search Bar" />
      </form>
    </div>
  );
};

export default SearchBar;
