import Close from "../../Icons/Close.svg";
import "./Forms.css";
import { useContext, useEffect, useState } from "react";
import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import axios from "axios";
import { UserContext } from "../../App";
import { bearerToken } from "../../utils";
// import { getNames } from "country-list";

const ProfileEditor = ({ handleToggle, profileData }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  // const [countryList, setCountryList] = useState(null);
  // const [country, setCountry] = useState("");

  useEffect(() => {
    // const countries = getNames();
    // const countryOptions = countries.map((country, i) => (
    //   <option key={i} value={country}>
    //     {country}
    //   </option>
    // ));
    // setCountryList(countryOptions);
    // setCountry(profileData.country);

    setUsername(profileData.username);
    setEmail(profileData.email);
  }, [profileData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${user.id}/update`,
        { username, email },
        bearerToken(token)
      );
      const data = response.data.data;
      setUser({
        username: data.username,
        email: data.email,
        id: data.id,
        photoUrl: data.photoUrl,
      });
      handleToggle();
    } catch (err) {
      setErrorMessage("Could not update profile");
      setIsError(true);
    }
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "oldPassword":
        setOldPassword(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "repeat-password":
        setRepeatPassword(value);
        break;
      case "file":
        setFile(value);
        break;
      // case "country":
      //   setCountry(value);
      //   break;
      default:
        break;
    }
  };

  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Edit Profile</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={handleToggle}
          />
        </div>

        <form>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={username}
          />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            value={email}
          />
          <input
            id="old-password"
            type="password"
            placeholder="Enter Current Password"
            onChange={handleChange}
            value={oldPassword}
          />
          <input
            id="password"
            type="password"
            placeholder="Enter New Password"
            onChange={handleChange}
            value={password}
          />
          <input
            id="repeat-password"
            type="password"
            placeholder="Re-enter New Password"
            onChange={handleChange}
            value={repeatPassword}
          />
          <input
            id="file"
            type="file"
            placeholder="Add Profile Image"
            onChange={handleChange}
          />
          {/* <select id="country" onChange={handleChange} required value={country}>
            <option value="" disabled>
              Choose your country
            </option>
            {countryList}
          </select> */}
        </form>
        {isError && <ErrorPill message={errorMessage} />}
        <Button
          id="form-submit"
          label="Save Edits"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfileEditor;
