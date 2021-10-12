import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "../assets/feature.css";
const Feature = ({feature}) => {
  const [status, setStatus] = useState(feature?.status);
  const [statusColor, setStatusColor] = useState("inProgress");
  const [title, setTitle] = useState(feature?.title);
  const [detail, setDetail] = useState(feature?.detail);
  const [imageSrc, setImageSrc] = useState(feature?.logo);
  const [votes,setVotes] = useState(feature?.votes);

  let history = useHistory();
  const gotToDetails = () => {
    history.push("/details");
  };

  const getProperImagePath = (imagePath) => {
    console.log(imagePath)
    let tempImagePath = "";
    if (imagePath[1] === "f") {
      for (let i = 24; i < imagePath.length; i++) {
        tempImagePath += imagePath[i];
      }
      return `/images/${tempImagePath}`;
    } else {
      return imagePath;
    }
  };

  useEffect(() => {
    // console.log(props.feature)
  })

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

  return (
    <div className="feature">
      <div className="featureVotes">
        <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"} />
        <p>{votes}</p>
      </div>
      <div className="featureContent" onClick={gotToDetails}>
        <p className="title">{title}</p>
        <p className={`status ${statusColor}`}>{status}</p>
        <p className="detail">
          {detail}
        </p>
        {imageSrc && ( <img
          src={getProperImagePath(imageSrc)}
          className="featureLogo"
        />)}
       
      </div>
      <div className="featureComments" onClick={gotToDetails}>
        <FontAwesomeIcon icon={faComment} className="commentIcon" />
        <p>12</p>
      </div>
    </div>
  );
};

export default Feature;
