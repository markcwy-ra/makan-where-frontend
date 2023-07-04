import "./StatusPill.css";

const StatusPill = ({ message }) => {
  return (
    <div className="status-pill">
      <p>{message}</p>
    </div>
  );
};

export default StatusPill;
