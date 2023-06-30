//----------- React -----------//

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

//---------- Components ----------//

import Close from "../../Icons/Close.svg";
import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Others ----------//

import { bearerToken } from "../../Utilities/token";
import "./Forms.css";
import axios from "axios";
// import { getNames } from "country-list";

//------------------------------//

const ProfileEditor = ({ handleToggle, profileData }) => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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
      let photoUrl = null;
      if (file) {
        const fileRef = ref(storage, `profile/${username}`);
        await uploadBytesResumable(fileRef, file);
        photoUrl = await getDownloadURL(fileRef);
      }
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/users/${user.id}/update`,
        { username, email, currentPassword, newPassword, photoUrl },
        bearerToken(user.token)
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
      console.log(err);
      setErrorMessage(err.response.data.msg);
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
      case "currentPassword":
        setCurrentPassword(value);
        break;
      case "password":
        setNewPassword(value);
        break;
      case "repeat-password":
        setRepeatPassword(value);
        break;
      case "file":
        setFile(e.currentTarget.files[0]);
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
            id="currentPassword"
            type="password"
            placeholder="Enter Current Password"
            onChange={handleChange}
            value={currentPassword}
          />
          <input
            id="password"
            type="password"
            placeholder="Enter New Password"
            onChange={handleChange}
            value={newPassword}
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
