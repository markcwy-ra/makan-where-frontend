import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPill from "../../Details/Errors/ErrorPill";
import StatusPill from "../../Details/Status/StatusPill";
import "./LoginScreen.css";
import { resetPassword, sendResetEmail } from "../../Utilities/auth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  // Message Pills
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [hasStatus, setHasStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const input = e.currentTarget;
    setIsError(false);
    setHasStatus(false);
    if (input.id === "email") {
      setEmail(input.value);
    } else if (input.id === "token") {
      setToken(input.value);
    } else if (input.id === "newPassword") {
      setNewPassword(input.value);
    } else if (input.id === "repeatPassword") {
      setRepeatPassword(input.value);
    }
  };
  const handleReset = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.id;
    if (id === "send-email") {
      const account = email;
      setEmail("");
      setStatusMessage("Sending verification email...");
      setHasStatus(true);
      try {
        const response = await sendResetEmail(account);
        console.log(response.data.data.token);
        setHasStatus(false);
        setSentEmail(true);
      } catch (err) {
        setErrorMessage(err.response.data.msg);
        setIsError(true);
      }
    } else if (id === "reset-password") {
      if (newPassword !== repeatPassword) {
        setErrorMessage("Passwords do not match");
        setIsError(true);
      } else {
        try {
          await resetPassword({
            resetToken: token,
            newPassword,
          });
          setToken("");
          setNewPassword("");
          setRepeatPassword("");
          setStatusMessage("Password successfully reset! Please login again.");
          setHasStatus(true);
        } catch (err) {
          setErrorMessage(err.response.data.msg);
          setIsError(true);
        }
      }
    }
  };

  const handleClick = (e) => {
    const id = e.currentTarget.id;
    if (id === "login") {
      navigate("/login");
    } else if (id === "signup") {
      navigate("/signup");
    } else if (id === "resend") {
      setSentEmail(false);
    }
  };

  return (
    <div className="loginscreen">
      <h1>Reset Password</h1>
      {!sentEmail ? (
        <form>
          <input
            id="email"
            type="email"
            placeholder="Enter account email address"
            onChange={handleChange}
            value={email}
          />
          <button
            className={email !== "" ? "login-active" : "login-inactive"}
            id="send-email"
            onClick={handleReset}
          >
            Send Verification Token
          </button>
        </form>
      ) : (
        <form>
          <input
            id="token"
            type="password"
            placeholder="Enter verification token"
            onChange={handleChange}
            value={token}
          />
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={handleChange}
            value={newPassword}
          />
          <input
            id="repeatPassword"
            type="password"
            placeholder="Reenter new password"
            onChange={handleChange}
            value={repeatPassword}
          />
          <button
            className={
              token !== "" && newPassword !== "" && repeatPassword !== ""
                ? "login-active"
                : "login-inactive"
            }
            id="reset-password"
            onClick={handleReset}
          >
            Reset Password
          </button>
        </form>
      )}
      {hasStatus && <StatusPill message={statusMessage} />}
      {isError && <ErrorPill message={errorMessage} />}
      <div className="loginscreen-buttons">
        {sentEmail && (
          <p>
            Didn't get an email?{" "}
            <u id="resend" onClick={handleClick}>
              Resend verification email
            </u>
          </p>
        )}
        <p>
          Remembered your password?{" "}
          <u id="login" onClick={handleClick}>
            Login
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

export default ResetPassword;
