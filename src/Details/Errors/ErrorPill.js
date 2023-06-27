import "./ErrorPill.css";

const ErrorPill = ({ message }) => {
  return (
    <div className="error-pill">
      <p>{message}</p>
    </div>
  );
};

export default ErrorPill;
