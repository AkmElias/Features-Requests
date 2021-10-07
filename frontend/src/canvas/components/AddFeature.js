import { useState, useEffect, useRef } from "react";
import "../style.css";

const AddFeature = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!somethingMissing()) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(formData.get("file"));
    }
  };

  const somethingMissing = () => {
    if (!title && !detail) {
      setErrorMessage("Opps! Feature title missing.");
      setError(true);
      return true;
    } else if (!detail && title) {
      setErrorMessage("Opps! Detail is necessary.");
      setError(true);
      return true;
    } else if (!title && detail) {
      setErrorMessage("Opps! Feature title missing.");
      setError(true);
      return true;
    } else {
      setError(false);
      return false;
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const renderImagePreview = () => {
    return (
      <div className="imagePreview">
        <img src={imageSrc} />
        <img
          className="close"
          src="https://cdn.iconscout.com/icon/free/png-256/close-156-462132.png"
          onClick={() => setImageSrc(null)}
        />
      </div>
    );
  };

  return (
    <div className="addFeature">
      <h3> Feature Request </h3>
      <p>Let us know what feature you'd like to see on our app</p>
      <div className="formContainer">
        <form onSubmit={handleSubmit} style={{ backgroundColor: "inherit" }}>
          <div className="formGroup">
            <label>Title</label>
            <input
              type="text"
              placeholder={"Short, descriptive Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Detail</label>
            <textarea
              rows="3"
              placeholder={"Any additional details..."}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          {imageSrc && renderImagePreview()}
          <div className="buttons-group">
            <label>
              <img
                src="https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                style={{ width: "20px", height: "20px" }}
              />
              <input
                type="file"
                name="myfile"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <button ref={submitRef}>FEATURE REQUEST</button>
          </div>
        </form>
        {error && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default AddFeature;
