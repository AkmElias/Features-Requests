import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faThumbsUp,
  faImage,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import "../assets/featureDetails.css";

const FeatureDetails = () => {
  const [featureId, setFeatureId] = useState(
    window.location.pathname.split("/")[2]
  );
  const [faces, setFaces] = useState([1, 2, 3, 4]);
  const [status, setStatus] = useState("In progress");
  const [statusColor, setStatusColor] = useState("inProgress");
  const [date, setDate] = useState(new Date().toLocaleString());
  const [textareaActive, setTextareActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [activeActivity, setActiveActivity] = useState("newest");
  const [comments, setComments] = useState([1, 2, 3, 4]);

  let history = useHistory();
  const textareaRef = useRef();
  const formRef = useRef();

  const backToPosts = () => {
    history.push("/");
  };

  const activityConfig = [
    { label: "NEWEST", value: "newest" },
    { label: "OLDEST", value: "oldest" },
  ];

  const toggoleActivity = (value) => {
    console.log(value);
    setActiveActivity(value);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    console.log("id: ", featureId);
  });

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

    textareaRef.current.addEventListener("focus", showFullForm);

    return textareaRef.current.addEventListener("focus", showFullForm);
  });

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

  const renderRightSectionTop = () => {
    return (
      <div className="rightSectionTop">
        <div className="topVotes">
          <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"} />
          <p>500</p>
        </div>
        <div className="topTitleandStatus">
          <p className="title">Crunchyroll integration</p>
          <p className={`status ${statusColor}`}>{status}</p>
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
          src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
          className="userAvatar"
        />
        <div className="postRight">
          <p className="userName">@Elias11</p>
          <p className="postDetail">
            I don't know whether this is feasible with crunchyroll's APIs, but
            ideally it would be nice to be able to link my kitsu and crunchyroll
            accounts so that when I finish an episode on ...
          </p>
          <p className="date">{date}</p>
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
      </div>
    </div>
  );
};

export default FeatureDetails;
