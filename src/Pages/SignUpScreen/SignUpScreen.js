import { useEffect, useState } from "react";
import "./SignUpScreen.css";
import { useNavigate } from "react-router-dom";
import { getNames } from "country-list";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [file, setFile] = useState(null);
  const [countryList, setCountryList] = useState(null);
  const [country, setCountry] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);

  useEffect(() => {
    const countries = getNames();
    const countryOptions = countries.map((country, i) => (
      <option key={i} value={country}>
        {country}
      </option>
    ));

    setCountryList(countryOptions);
  }, []);

  useEffect(() => {
    if (username && email && password && repeatPassword && country) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [username, email, password, repeatPassword, country]);

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
  const handleSignUp = () => {
    console.log("login button pressed");
  };
  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "signup") {
      navigate("/signup");
    } else if (id === "reset") {
      navigate("/login/reset");
    }
  };

  return (
    <div className="content signupscreen">
      <h1>Sign Up</h1>
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
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={password}
        />
        <input
          id="repeat-password"
          type="password"
          placeholder="Re-enter Password"
          onChange={handleChange}
          value={repeatPassword}
        />
        <input
          id="file"
          type="file"
          placeholder="Add Profile Image"
          onChange={handleChange}
        />
        <select id="country" onChange={handleChange} required defaultValue="">
          <option value="" disabled>
            Choose your country
          </option>
          {countryList}
        </select>
        <button
          className={isFormComplete ? "login-active" : "login-inactive"}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
      <div className="signupscreen-buttons">
        <p>
          Already have an account?{" "}
          <u id="signup" onClick={handleClick}>
            Login
          </u>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;
