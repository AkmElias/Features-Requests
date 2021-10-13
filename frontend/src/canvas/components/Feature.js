import { useState, useEffect , useContext} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import {getProperImagePath} from "../../utils/utility.js";
import SignInModal from "../../auth/SignInModal";
import "../assets/feature.css";
import { UserContext } from "../../contexts/userContext";

import axios from "axios";
const baseURL = "http://localhost:5000/api";

const Feature = ({feature}) => {
  const [{user}, dispatch] = useContext(UserContext);
  if(!user && localStorage.getItem("user")){
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("user"))
    })
  }
  const [signInModal, setSignInModal] = useState(false);
  const [status, setStatus] = useState(feature?.status);
  const [statusColor, setStatusColor] = useState("inProgress");
  const [title, setTitle] = useState(feature?.title);
  const [detail, setDetail] = useState(feature?.detail);
  const [imageSrc, setImageSrc] = useState(feature?.logo);
  const [votes,setVotes] = useState(feature?.numOfVotes ? feature?.numOfVotes : 0);

  let history = useHistory();
  const gotToDetails = () => {

    history.push(`/details/${feature._id}`);
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
      axios.get(`${baseURL}/features/vote/${feature._id}`, config).then(response => {
        console.log(response.data.numOfVotes)
        setVotes(response.data.numOfVotes)
      })
    }
  }

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
      <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"} onClick={handleVote}/>
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
      {signInModal && (
        <SignInModal setSignInModal={(value) => setSignInModal(value)} />
      )}
    </div>
  );
};

export default Feature;
