import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPill from "../../Details/Errors/ErrorPill";
import { UserContext } from "../../App";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { signup } from "../../Utilities/auth.js";
import "./SignUpScreen.css";
// import { getNames } from "country-list";

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // const [countryList, setCountryList] = useState(null);
  // const [country, setCountry] = useState("");
  // useEffect(() => {
  //   const countries = getNames();
  //   const countryOptions = countries.map((country, i) => (
  //     <option key={i} value={country}>
  //       {country}
  //     </option>
  //   ));
  //   setCountryList(countryOptions);
  // }, []);

  useEffect(() => {
    if (file) {
      if (!(file.type === "image/jpeg" || file.type === "image/png")) {
        setErrorMessage("Only JPGs and PNGs are allowed!");
        setIsError(true);
      }
    }
  }, [file]);

  useEffect(() => {
    if (username && email && password && repeatPassword) {
      setIsFormComplete(true);
    } else {
      setIsFormComplete(false);
    }
  }, [username, email, password, repeatPassword]);

  const handleChange = (e) => {
    setIsError(false);
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
        setFile(e.currentTarget.files[0]);
        break;
      // case "country":
      //   setCountry(value);
      //   break;
      default:
        break;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage("Password don't match!");
      setIsError(true);
    } else if (!isFormComplete) {
      setErrorMessage("Please fill in all fields!");
      setIsError(true);
    } else {
      try {
        let photoUrl = null;
        if (file) {
          const fileRef = ref(storage, `profile/${username}`);
          await uploadBytesResumable(fileRef, file);
          photoUrl = await getDownloadURL(fileRef);
        }
        if ((file && photoUrl !== null) || !file) {
          const response = await signup({
            username,
            email,
            password,
            photoUrl,
          });
          localStorage.setItem("token", response.token);
          localStorage.setItem("refreshToken", response.refreshToken);
          setUser({
            username: response.username,
            email: response.email,
            id: response.id,
            photoUrl: response.photoUrl,
          });
          navigate("/home");
        }
      } catch (err) {
        const code = err.response.status;
        if (code === 400) {
          setErrorMessage("User already exists. Login instead!");
          setIsError(true);
        } else if (code === 500) {
          setErrorMessage("There was an error. Please refresh.");
          setIsError(true);
        }
      }
    }
  };
  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "login") {
      navigate("/login");
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
        {/* <select id="country" onChange={handleChange} required defaultValue="">
          <option value="" disabled>
            Choose your country
          </option>
          {countryList}
        </select> */}
        <button
          className={isFormComplete ? "signup-active" : "signup-inactive"}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
      {isError && <ErrorPill message={errorMessage} />}
      <div className="signupscreen-buttons">
        <p>
          Already have an account?{" "}
          <u id="login" onClick={handleClick}>
            Login
          </u>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;
