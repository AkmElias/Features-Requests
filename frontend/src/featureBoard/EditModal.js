import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import { getProperImagePath } from "../utils/utility.js";
import { UserContext } from "../contexts/userContext";
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

const baseURL = "http://localhost:5000/api/";

const EditModal = ({ feature, setEditModalOpen, setUpdated }) => {
  const [{ user }, dispatch] = useContext(UserContext);
  if (!user && localStorage.getItem("user")) {
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("user")),
    });
  }
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(feature.title);
  const [detail, setDetail] = useState(feature.detail);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState(feature.logo);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const textareaRef = useRef();

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setEditModalOpen(false);
    setIsOpen(false);
  }

  useEffect(() => {
    const calcHeight = (value) => {
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      return newHeight;
    };
    if (textareaRef && textareaRef.current) {
      textareaRef.current.addEventListener("input", () => {
        textareaRef.current.style.height =
          calcHeight(textareaRef.current.value) + "px";
      });
    }
  });

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${baseURL}upload/`, formData, config);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, detail, feature.logo);
    if (!somethingMissing()) {
      setUpdateLoading(true);
      let imagePath;
      if (selectedFile) {
        imagePath = await handleFileUpload();
      } else {
        imagePath = feature.logo;
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
          .put(
            `${baseURL}features/${feature._id}`,
            { title, detail, imagePath },
            config
          )
          .then((response) => {
            setUpdateLoading(false);
            setUpdated(true);
            setIsOpen(false);
          })
          .catch((error) => {
            setUpdateLoading(false);
            setIsOpen(false);
            console.log(error);
          });
      } catch (error) {}
    }
  };

  const somethingMissing = () => {
    console.log("hh");
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

  const renderImagePreview = () => {
    return (
      <div className="imagePreview">
        <img src={selectedFile ? imageSrc : getProperImagePath(feature.logo)} />
        <img
          className="close"
          src="https://cdn.iconscout.com/icon/free/png-256/close-156-462132.png"
          onClick={() => setImageSrc("")}
        />
      </div>
    );
  };

  return (
    <div className="EditModal">
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div className="formContainer">
              <form
                onSubmit={handleSubmit}
                style={{ backgroundColor: "inherit" }}
              >
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
                  {updateLoading && (
                    <div className="loading">{"Updating...."}</div>
                  )}
                  <button className="button">UPDATE</button>
                </div>
              </form>
              {error && <div className="error">{errorMessage}</div>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditModal;
