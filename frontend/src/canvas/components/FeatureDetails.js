import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faThumbsUp,
  faImage,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../contexts/userContext";
import {formateDate, getProperImagePath} from "../../utils/utility.js";
import axios from "axios";
import "../assets/featureDetails.css";

const baseURL = "http://localhost:5000/api";

const activityConfig = [
  { label: "NEWEST", value: "newest" },
  { label: "OLDEST", value: "oldest" },
];

const FeatureDetails = () => {
  const [featureId, setFeatureId] = useState(
    window.location.pathname.split("/")[2]
  );
  const [{ user }, dispatch] = useContext(UserContext);
  if (!user && localStorage.getItem("user")) {
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("user")),
    });
  }
  const [faces, setFaces] = useState([1, 2, 3, 4]);
  const [date, setDate] = useState(new Date().toLocaleString());
  const [status, setStatus] = useState("In progress");
  const [statusColor, setStatusColor] = useState("inProgress");
  const [textareaActive, setTextareActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [activeActivity, setActiveActivity] = useState("newest");
  const [feature, setFeature] = useState({});
  const [featureAuthor, setFeatureAuthor] = useState({});
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(true);

  let history = useHistory();
  const textareaRef = useRef();
  const formRef = useRef();

  const backToPosts = () => {
    history.push("/");
  };

  const toggoleActivity = (value) => {
    console.log(value);
    setActiveActivity(value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .get(`${baseURL}/features/feature/${featureId}`, config)
        .then((response) => {
          setFeature(response.data);
          setStatus(response.data.status);
          if (response.data.comments.length > 0)
            setComments(response.data.comments);
          axios
            .get(`${baseURL}/users/${response.data.author}`, config)
            .then((response) => {
              setFeatureAuthor(response.data);
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });

      // return data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (status === "In progress") {
      setStatusColor("inProgress");
    } else if (status === "Planned") {
      setStatusColor("planned");
    } else if (status === "Complete") {
      setStatusColor("complete");
    } else {
      setStatusColor("underReview");
    }
  }, [status]);

  useEffect(() => {
    const showFullForm = () => {
      setTextareActive(true);
    };
    if (textareaRef && textareaRef.current) {
      textareaRef.current.addEventListener("focus", showFullForm);
    }
    // return textareaRef.current.removeEventListener("focus", showFullForm);
  });

  useEffect(() => {
    const calcHeight = (value) => {
      let numberOfLineBreaks = (value.match(/\n/g) || []).length;
      // min-height + lines x line-height + padding + border
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      return newHeight;
    };
    if (textareaRef.current && textareaRef) {
      textareaRef.current.addEventListener("input", () => {
        textareaRef.current.style.height =
          calcHeight(textareaRef.current.value) + "px";
      });
    }
  });

  const renderRightSectionTop = () => {
    return (
      <div className="rightSectionTop">
        <div className="topVotes">
          <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"} />
          <p>{feature?.numOfVotes ? feature.numOfVotes : 0}</p>
        </div>
        <div className="topTitleandStatus">
          <p className="title">{feature.title}</p>
          <p className={`status ${statusColor}`}>{feature.status}</p>
        </div>
      </div>
    );
  };

  const renderCommentForm = () => {
    return (
      <div
        className="commentForm"
        onDoubleClick={() => setTextareActive(false)}
      >
        <form className="form">
          <textarea placeholder="Leave a comment" rows="1" ref={textareaRef} />
          {textareaActive && (
            <div className="formBottom">
              {imageSrc && renderImagePreview()}
              <div className="buttons-group">
                <label>
                  <FontAwesomeIcon icon={faImage} className="imageIcon" />
                  <input
                    type="file"
                    name="myfile"
                    style={{ display: "none" }}
                    value={imageValue}
                    onClick={() => setImageValue("")}
                    onChange={handleFileChange}
                  />
                </label>
                <button className="button" type="submit">
                  SUBMIT
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    );
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

  const renderPost = () => {
    return (
      <div className="post">
        <img
          src={featureAuthor.profilePicture}
          className="userAvatar"
        />
        <div className="postRight">
          <p className="userName">{featureAuthor.userName}</p>
          <p className="postDetail">
           {feature.detail}
          </p>
          {feature.logo && ( <img
          src={getProperImagePath(feature.logo)}
          style={{maxWidth: "100%", maxHeight: "200px", marginBottom: "5px", padding: "5px", borderRadius: "5px",}}
        />)}
          <p className="date">{formateDate(feature.createdAt)}</p>
        </div>
      </div>
    );
  };

  const renderComment = (comment, index) => {
    return (
      <div className="comment">
        <img
          className="commentAvatar"
          src={
            "https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
          }
        />
        <div className="commentMain">
          <p className="commentAuthor">Elias</p>
          <p className="commentContent">
            Any updates on an ETA for this? I love kitsu but I just keep going
            back to MAL because the seasonal view is just so nice to use
          </p>
          <img
            className="commentImage"
            src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
          />
          <div className="commentBottom">
            <FontAwesomeIcon icon={faHeart} className="heartIcon" />
            <p className="count">0</p>
            <p className="dot">.</p>
            <p className="date">{date}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="featureDetails">
      {loading ? (
        <div
          style={{
            backgroundColor: "inherit",
            color: "green",
            fontSize: "20px",
            padding: "20px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {"Loading......."}
        </div>
      ) : (
        <>
          {" "}
          <div className="leftSection">
            <div className="backToPosts" onClick={backToPosts}>
              <FontAwesomeIcon icon={faArrowLeft} className="backIcon" />
              <p>Back to posts</p>
            </div>
            <p className="votersP">Voters</p>
            <div className="voters">
              {faces.map((face) => {
                return (
                  <img
                    className={"faceAvatar"}
                    src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
                  />
                );
              })}
              <p>+200 </p>
            </div>
            <p className="powerdBy">Powerd by Feature Requests</p>
          </div>
          <div className="rightSection">
            {renderRightSectionTop()}
            <div className="postWithCommentForm">
              {renderPost()}
              {renderCommentForm()}
            </div>
            <div className="activitySection">
              {/* comments/activity section */}
              <div className="activityTop">
                <p className="activity">ACTIVITY</p>
                <div className="activityNav">
                  {activityConfig.map((activity, index) => {
                    return (
                      <p
                        className={
                          activeActivity === activity.value
                            ? "activeNav active"
                            : "activeNav"
                        }
                        onClick={() => toggoleActivity(activity.value)}
                      >
                        {activity.label}
                      </p>
                    );
                  })}
                </div>
              </div>
              {comments.map((comment, index) => {
                return renderComment(comment, index);
              })}
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default FeatureDetails;
