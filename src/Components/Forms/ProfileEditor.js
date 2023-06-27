import Close from "../../Icons/Close.svg";
import "./Forms.css";
import { useEffect, useState } from "react";
import Button from "../../Details/Buttons/Button";
import { getNames } from "country-list";

const ProfileEditor = ({ handleToggle, profileData }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [file, setFile] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const countries = getNames();
    const countryOptions = countries.map((country, i) => (
      <option key={i} value={country}>
        {country}
      </option>
    ));

    setCountryList(countryOptions);
    setUsername(profileData.username);
    setEmail(profileData.email);
    setCountry(profileData.country);
  }, [profileData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
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
      case "country":
        setCountry(value);
        break;
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
            onClick={() => handleToggle("makanlist-composer")}
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
          <select id="country" onChange={handleChange} required value={country}>
            <option value="" disabled>
              Choose your country
            </option>
            {countryList}
          </select>
        </form>
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
