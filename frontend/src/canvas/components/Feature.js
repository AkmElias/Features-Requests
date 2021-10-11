import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import "../assets/feature.css";
const Feature = () => {
  const [status, setStatus] = useState("In progress");
  const [statusColor, setStatusColor] = useState("inProgress");

  let history = useHistory();
  const gotToDetails = () => {
    history.push("/details");
  };

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
        <p>500</p>
      </div>
      <div className="featureContent" onClick={gotToDetails}>
        <p className="title">Crunchyroll integration</p>
        <p className={`status ${statusColor}`}>{status}</p>
        <p className="detail">
          I don't know whether this is feasible with crunchyroll's APIs, but
          ideally it would be nice to be able to link my kitsu and crunchyroll
          accounts so that when I finish an episode on ...
        </p>
      </div>
      <div className="featureComments" onClick={gotToDetails}>
        <FontAwesomeIcon icon={faComment} className="commentIcon" />
        <p>12</p>
      </div>
    </div>
  );
};

export default Feature;
