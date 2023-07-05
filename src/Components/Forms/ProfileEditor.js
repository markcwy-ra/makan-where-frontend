//----------- React -----------//

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

//---------- Components ----------//

import Close from "../../Icons/Close.svg";
import Button from "../../Details/Buttons/Button";
import ErrorPill from "../../Details/Errors/ErrorPill";
import UploadImageButton from "../../Details/Buttons/UploadImageButton";

//---------- Firebase ----------//

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

//---------- Motion ----------//

import Fade from "../../Details/Animation/Fade";
import SlideUp from "../../Details/Animation/SlideUp";

//---------- Others ----------//

import "./Forms.css";
import { updateUserProfile } from "../../Utilities/fetch";
import { getCodeList } from "country-list";
import geos from "geos-major";

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

  const [countryList, setCountryList] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setCountry(user.location.name);
    console.log(user);
  }, [user]);

  useEffect(() => {
    const countries = getCodeList();

    const countryOptions = Object.keys(countries).map((code) => (
      <option key={code} value={code}>
        {countries[code]}
      </option>
    ));

    setCountryList(countryOptions);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = null;
      if (file) {
        const fileRef = ref(storage, `profile/${username}`);
        await uploadBytesResumable(fileRef, file);
        photoUrl = await getDownloadURL(fileRef);
      }
      const countryData = geos.country(country);
      const updatedUser = await updateUserProfile({
        userId: user.id,
        username,
        email,
        currentPassword,
        newPassword,
        photoUrl,
        country: countryData.countryName,
        countryCode: countryData.countryCode,
        latitude: countryData.latitude,
        longitude: countryData.longitude,
      });
      console.log(updatedUser);
      setUser({
        username: updatedUser.updatedUser.username,
        email: updatedUser.updatedUser.email,
        id: updatedUser.updatedUser.id,
        photoUrl: updatedUser.updatedUser.photoUrl,
        location: {
          name: updatedUser.location.name,
          lat: updatedUser.location.latitude,
          lng: updatedUser.location.longitude,
        },
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
      case "country":
        setCountry(value);
        break;
      default:
        break;
    }
  };

  return (
    <Fade className="bg-overlay">
      <SlideUp className="form-popup">
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
          <UploadImageButton
            file={file}
            handleChange={handleChange}
            label="Upload a Profile Image"
          />
          {country && countryList && (
            <select
              id="country"
              onChange={handleChange}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Choose your country
              </option>
              {countryList}
            </select>
          )}
        </form>
        {isError && <ErrorPill message={errorMessage} />}
        <Button
          id="form-submit"
          label="Save Edits"
          handleClick={handleSubmit}
        />
      </SlideUp>
    </Fade>
  );
};

export default ProfileEditor;
