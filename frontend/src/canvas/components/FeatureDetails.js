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
import { formateDate, getProperImagePath } from "../../utils/utility.js";
import axios from "axios";
import SignInModal from "../../auth/SignInModal";
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
  const [activeActivity, setActiveActivity] = useState("newest");
  const [feature, setFeature] = useState({});
  const [featureAuthor, setFeatureAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState(0);

  //comment state
  const [signInModal, setSignInModal] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageValue, setImageValue] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [filterCommentsOption, setFilterCommentsOption] = useState("")
  const [commentAuthorId, setCommentAuthorId] = useState(null);
  const [commentAuthorDetails, setCommentAuthorDetails] = useState({});

  let history = useHistory();
  const textareaRef = useRef();
  const formRef = useRef();

  const backToPosts = () => {
    history.push("/");
  };

  const toggoleActivity = (value) => {
    console.log(value);
    setActiveActivity(value);
    setFilterCommentsOption(value);
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
        .get(`${baseURL}/features/${featureId}`, config)
        .then((response) => {
          setFeature(response.data);
          setVotes(response.data.numOfVotes);
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
    let imagePath;
    if (!user) {
      setSignInModal(true);
    } else {
      if (comment) {
        if (selectedFile) {
          imagePath = await handleFileUpload(e);
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
              `${baseURL}/features/comment/${feature._id}`,
              { comment, imagePath },
              config
            )
            .then((response) => {
              resetAddFeatureForm();
              setComments(response.data.comments);
              console.log(response.data);
              // window.location.reload();
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
            });
        } catch (error) {}
      }
    }
    // console.log(selectedFile, comment);
  };

  const resetAddFeatureForm = () => {
    setComment("");
    setImageSrc("");
    setSelectedFile(null);
  };

  useEffect(() => {


  },[commentAuthorId])

  useEffect(() => {

    if(filterCommentsOption){
      if(filterCommentsOption === "newest"){
        let filteredtComments = comments.slice().sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComments(filteredtComments)
      } else {
        let filteredtComments = comments.slice().sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        setComments(filteredtComments)
      }
    }

  },[filterCommentsOption])

  const getCommentAuthorDetails = (authorId) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.get(`${baseURL}/users/${authorId}`, config).then((response) => {
      setCommentAuthorDetails(response.data);
      console.log(commentAuthorDetails);
    });
  };

  const handleVote = () => {
    if(!user){
      setSignInModal(true);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("api request")
      axios.get(`${baseURL}/features/vote/${featureId}`, config).then(response => {
        console.log(response.data.numOfVotes)
        setVotes(response.data.numOfVotes)
      })
    }
  }
  
  const renderRightSectionTop = () => {
    return (
      <div className="rightSectionTop">
        <div className="topVotes">
          <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"} onClick={handleVote}/>
          <p>{votes}</p>
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
        <form className="form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Leave a comment"
            rows="1"
            ref={textareaRef}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
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
        <img src={featureAuthor.profilePicture} className="userAvatar" />
        <div className="postRight">
          <p className="userName">{featureAuthor.userName}</p>
          <p className="postDetail">{feature.detail}</p>
          {feature.logo && (
            <img
              src={getProperImagePath(feature.logo)}
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                marginBottom: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
          )}
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
        {/* {getCommentAuthorDetails(comment.author)} */}
        <div className="commentMain">
          <p className="commentAuthor">Elias</p>
          <p className="commentContent">{comment.content}</p>
          {comment.logo && (
            <img
              className="commentImage"
              src={getProperImagePath(comment.logo)}
            />
          )}
          <div className="commentBottom">
            <FontAwesomeIcon icon={faHeart} className="heartIcon" />
            <p className="count">0</p>
            <p className="dot">.</p>
            <p className="date">{formateDate(comment.createdAt)}</p>
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
                // setCommentAuthorId(comment.author)
                return renderComment(comment, index);
              })}
            </div>
          </div>{" "}
        </>
      )}
       {signInModal && (
        <SignInModal setSignInModal={(value) => setSignInModal(value)} />
      )}
    </div>
  );
};

export default FeatureDetails;
