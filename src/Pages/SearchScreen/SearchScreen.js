//---------- React ----------//

import { useState, useEffect, useContext } from "react";

//---------- Components ----------//

import Header from "../../Components/Header/Header";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import ErrorPill from "../../Details/Errors/ErrorPill";
import UserCard from "../../Details/Cards/Users/UserCard.js";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";

//---------- Others ----------//

import getLocation from "../../Utilities/location";
import { UserContext } from "../../App";
import "./SearchScreen.css";
import Fade from "../../Details/Animation/Fade";

//------------------------------//

const SearchScreen = () => {
  const { user } = useContext(UserContext);
  const [location, setLocation] = useState(null);
  // Search Type and Results
  const [activeToggle, setActiveToggle] = useState("places");
  const [results, setResults] = useState(null);
  const [resultsDisplay, setResultsDisplay] = useState(null);
  // Error Handling
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleToggle = (e) => {
    setResults(null);
    setIsError(false);
    setActiveToggle(e.currentTarget.id);
  };

  // Get current location
  useEffect(() => {
    getLocation(setLocation);
  }, []);

  useEffect(() => {
    let display = null;
    if (results) {
      setIsError(false);
      if (activeToggle === "places") {
        console.log(results);
        display = results.map((foundPlace, index) => {
          const content = {
            name: foundPlace.name,
            place_id: foundPlace.place_id,
            address: foundPlace.vicinity,
          };
          return <RestaurantCard key={index} content={content} />;
        });
      } else if (activeToggle === "makanlists") {
        //eslint-disable-next-line
        display = results.map((foundList) => {
          if (foundList.user.username !== user.username) {
            return <MakanlistCard key={foundList.id} content={foundList} />;
          }
        });
        if (display[0] === undefined) {
          setErrorMessage("No makanlists found!");
          setIsError(true);
          setResults(null);
        }
      } else if (activeToggle === "users") {
        //eslint-disable-next-line
        display = results.map((foundUser) => {
          if (foundUser.username !== user.username) {
            return <UserCard key={foundUser.id} content={foundUser} />;
          }
        });
        if (display[0] === undefined) {
          setErrorMessage("No users found!");
          setIsError(true);
          setResults(null);
        }
      }
    }
    setResultsDisplay(display);
  }, [activeToggle, results, user]);

  return (
    <>
      <Fade>
        <Header icon="search">
          <h1>Search</h1>
        </Header>
      </Fade>
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
          location={location}
          setResults={setResults}
        />
        {isError && <ErrorPill message={errorMessage} />}
        <div className="content search-results">
          {resultsDisplay && resultsDisplay}
        </div>
      </div>
    </>
  );
};

export default SearchScreen;
