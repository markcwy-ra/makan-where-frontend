import { useState, useEffect, useContext } from "react";
import "./SearchScreen.css";
import Header from "../../Components/Header/Header";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import ErrorPill from "../../Details/Errors/ErrorPill";
import UserCard from "../../Details/Cards/Users/UserCard.js";
import { UserContext } from "../../App";

const SearchScreen = () => {
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [activeToggle, setActiveToggle] = useState("places");
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);

  const handleToggle = (e) => {
    setResults(null);
    setActiveToggle(e.currentTarget.id);
  };

  useEffect(() => {
    let display = null;
    if (results) {
      if (activeToggle === "users") {
        display = results.map((foundUser) => {
          if (foundUser.username !== user.username) {
            return <UserCard key={foundUser.id} content={foundUser} />;
          }
        });
      }
    }
    setResultsDisplay(display);
  }, [activeToggle, results, user]);

  return (
    <>
      <Header icon="search">
        <h1>Search</h1>
      </Header>
      <div className="content search-page">
        <div className="search-toggles">
          <Button
            label="Places"
            id="places"
            size="small"
            isActive={activeToggle === "places" ? true : false}
            handleClick={handleToggle}
          />
          <Button
            label="Makanlists"
            id="makanlists"
            size="small"
            isActive={activeToggle === "makanlists" ? true : false}
            handleClick={handleToggle}
          />
          <Button
            label="Users"
            id="users"
            size="small"
            isActive={activeToggle === "users" ? true : false}
            handleClick={handleToggle}
          />
        </div>
        <SearchBar
          db={activeToggle}
          setResults={setResults}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
        />
        {isError && <ErrorPill message={errorMessage} />}
        {resultsDisplay && resultsDisplay}
      </div>
    </>
  );
};

export default SearchScreen;
