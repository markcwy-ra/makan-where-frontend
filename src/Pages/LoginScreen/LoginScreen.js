import { useState } from "react";
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const input = e.currentTarget;
    if (input.id === "email") {
      setEmail(input.value);
    } else if (input.id === "password") {
      setPassword(input.value);
    }
  };
  const handleLogin = () => {
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
