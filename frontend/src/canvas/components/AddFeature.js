import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

import "../assets/style.css";

const AddFeature = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 

  const submitRef = useRef();
  const textareaRef = useRef();

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
          onClick={() => setImageSrc("")}
        />
      </div>
    );
  };

  useEffect(() => {
    const calcHeight = (value) => {
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      return newHeight;
    };
    textareaRef.current.addEventListener("input", () => {
      textareaRef.current.style.height =
        calcHeight(textareaRef.current.value) + "px";
    });
  });

  return (
    <div className="addFeature">
      <h3> Feature Request </h3>
      <p>Let us know what feature you'd like to see on our app</p>
      <div className="formContainer">
        <form onSubmit={handleSubmit} style={{ backgroundColor: "inherit" }}>
          <div className="addFeatureformGroup">
            <label>Title</label>
            <input
              type="text"
              placeholder={"Short, descriptive Title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="addFeatureformGroup">
            <label>Detail</label>
            <textarea
              ref={textareaRef}
              rows="3"
              placeholder={"Any additional details..."}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />
          </div>
          {imageSrc && renderImagePreview()}
          <div className="buttons-group">
            <label>
              <FontAwesomeIcon icon={faImage} />
              <input
                type="file"
                name="myfile"
                style={{ display: "none" }}
                value={imageValue}
                onClick={() => setImageValue("")}
                onChange={handleFileChange}
              />
            </label>
            <button className="button" ref={submitRef}>
              FEATURE REQUEST
            </button>
          </div>
        </form>
        {error && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default AddFeature;
