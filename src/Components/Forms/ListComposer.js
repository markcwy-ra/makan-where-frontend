import Close from "../../Icons/Close.svg";
import "./Forms.css";
import { useState } from "react";
import Button from "../../Details/Buttons/Button";
import SearchBar from "../../Details/SearchBar/SearchBar";

const ListComposer = ({ handleToggle }) => {
  const [results, setResults] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit clicked");
  };

  const handleChange = (e) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "title":
        setTitle(e.currentTarget.value);
        break;
      case "description":
        setDescription(e.currentTarget.value);
        break;
      case "image":
        setFile(e.currentTarget.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-overlay">
      <div className="form-popup">
        <div className="form-popup-header">
          <h2>Create New Makanlist</h2>
          <img
            className="form-close"
            src={Close}
            alt="Close Button"
            onClick={() => handleToggle("makanlist-composer")}
          />
        </div>

        <form>
          <input
            id="title"
            type="text"
            placeholder="List Name"
            onChange={handleChange}
            value={title}
          />
          <textarea
            id="description"
            rows="5"
            placeholder="Description"
            onChange={handleChange}
            value={description}
          />
          <input id="image" type="file" onChange={handleChange} />
        </form>
        <SearchBar setResults={setResults} />
        <Button
          id="form-submit"
          label="Create Makanlist"
          handleClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ListComposer;
