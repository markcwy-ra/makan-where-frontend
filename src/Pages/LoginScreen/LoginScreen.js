import { useContext, useState } from "react";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import ErrorPill from "../../Details/Errors/ErrorPill";
import axios from "axios";
import { UserContext } from "../../App";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const input = e.currentTarget;
    setIsError(false);
    if (input.id === "email") {
      setEmail(input.value);
    } else if (input.id === "password") {
      setPassword(input.value);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/auth/sign-in`,
          { email, password }
        );
        const data = response.data.data;
        await localStorage.setItem("token", data.token);
        await localStorage.setItem("refreshToken", data.refreshToken);
        setUser({
          username: data.username,
          email: data.email,
          id: data.id,
          photoUrl: data.photoUrl,
        });
        navigate("/home");
      } catch (err) {
        const code = err.response.status;
        if (code === 401) {
          setErrorMessage("This account does not exist.");
          setIsError(true);
        } else if (code === 403) {
          setErrorMessage("This email/password combination doesn't exist.");
          setIsError(true);
        } else if (code === 500) {
          setErrorMessage("There was an error. Please refresh.");
          setIsError(true);
        }
      }
    } else {
      setErrorMessage("Please input both email and password!");
      setIsError(true);
    }
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
    <div className="content loginscreen">
      <h1>Login</h1>
      <form>
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
        <button
          className={
            email !== "" && password !== "" ? "login-active" : "login-inactive"
          }
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      {isError && <ErrorPill message={errorMessage} />}
      <div className="loginscreen-buttons">
        <p>
          Forgot your password?{" "}
          <u id="reset" onClick={handleClick}>
            Reset
          </u>
        </p>
        <p>
          Don't have an account?{" "}
          <u id="signup" onClick={handleClick}>
            Sign up
          </u>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
