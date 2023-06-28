import { useState } from "react";
import "./SearchScreen.css";
import Header from "../../Components/Header/Header";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import ErrorPill from "../../Details/Errors/ErrorPill";

const SearchScreen = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [activeToggle, setActiveToggle] = useState("places");
  const handleToggle = (e) => {
    setActiveToggle(e.currentTarget.id);
  };
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
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
        />
        {isError && <ErrorPill message={errorMessage} />}
      </div>
    </>
  );
};

export default SearchScreen;
