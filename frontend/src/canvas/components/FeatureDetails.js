import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import "../assets/featureDetails.css";

const FeatureDetails = () => {
  const [faces, setFaces] = useState([1, 2, 3, 4]);
  let history = useHistory();

  const backToPosts = () => {
    history.push("/");
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
      <div></div>
    </div>
  );
};

export default FeatureDetails;
