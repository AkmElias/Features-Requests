import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import SignInModal from "../../auth/SignInModal";
import "../assets/style.css";

import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    backgroundColor: "#FFF",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const baseURL = "http://localhost:5000/api";

const AddFeature = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [signInModal, setSignInModal] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitRef = useRef();
  const textareaRef = useRef();

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage.getItem("user")));
  //   console.log(user)
  // },[])

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${baseURL}/upload/`, formData, config);
      return data;
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    let imagePath;
    if (!user) {
      setSignInModal(true);
      return;
    }
    if (!somethingMissing()) {
      if (selectedFile) {
        console.log("fuck")
       imagePath =  await handleFileUpload(e);
        e.preventDefault();
      }

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
          console.log(imagePath);
          axios
            .post(
              `${baseURL}/features/post/`,
              { title, detail, imagePath },
              config
            )
            .then((response) => {
              setLoading(false);
              resetAddFeatureForm();
              console.log(response.data);
              window.location.reload();
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        } catch (error) {}
      // axios.post("/api/features/post", {title})
    }
  };

  const resetAddFeatureForm = () => {
    setTitle("");
    setDetail("");
    setImageSrc("");
    setSelectedFile(null);
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
            {loading && <div className="loading">{"Posting...."}</div>}
            <button className="button" ref={submitRef}>
              FEATURE REQUEST
            </button>
          </div>
        </form>
        {error && <div className="error">{errorMessage}</div>}
      </div>
      {signInModal && (
        <SignInModal setSignInModal={(value) => setSignInModal(value)} />
      )}
    </div>
  );
};

export default AddFeature;
