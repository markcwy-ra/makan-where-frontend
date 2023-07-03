import "./Button.css";

const Button = ({
  id,
  label,
  size = "large",
  isActive = true,
  type = "default",
  handleClick,
}) => {
  let buttonLabel;
  if (size === "small") {
    buttonLabel = <h4>{label}</h4>;
  } else {
    buttonLabel = <p>{label}</p>;
  }
  return (
    <button
      className={`button button-${size} ${
        isActive ? "button-active" : "button-inactive"
      } button-color-${type}`}
      onClick={handleClick}
      id={id}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;
