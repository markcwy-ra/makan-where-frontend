import { useState } from "react";
import "./SearchBar.css";
import Search from "../../Icons/Search.svg";
import axios from "axios";

const SearchBar = ({ db = "places", setResults }) => {
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
    if (db === "places") {
      const results = await axios.get(
        "https://api.yelp.com/v3/businesses/search?term=onalu&categories=restaurant&sort_by=best_match&limit=20",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
          },
        }
      );
      console.log(results);
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
