import "./Button.css";

const Button = ({ id, label, size, isActive, handleClick }) => {
  return (
    <button
      className={`button button-${size} ${
        isActive ? "button-active" : "button-inactive"
      }`}
      onClick={handleClick}
      id={id}
    >
      <h4>{label}</h4>
    </button>
  );
};

export default Button;
