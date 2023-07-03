import { useState, useEffect, useContext } from "react";
import "./SearchScreen.css";
import Header from "../../Components/Header/Header";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";
import ErrorPill from "../../Details/Errors/ErrorPill";
import UserCard from "../../Details/Cards/Users/UserCard.js";
import { UserContext } from "../../App";
import RestaurantCard from "../../Details/Cards/Restaurant/RestaurantCard";
import MakanlistCard from "../../Details/Cards/Makanlist/MakanlistCard";

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
        if (display[0] === undefined) {
          setErrorMessage("No places found!");
          setIsError(true);
          setResults(null);
        }
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
          location={location}
          setResults={setResults}
          setIsError={setIsError}
          setErrorMessage={setErrorMessage}
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
