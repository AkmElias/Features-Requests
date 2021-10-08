import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment,  faThumbsUp} from "@fortawesome/free-solid-svg-icons";

import "../assets/feature.css";
const Feature = () => {
  return (
    <div className="feature">
      <div className="featureVotes">
        <FontAwesomeIcon icon={faThumbsUp} className={"voteIcon"}/>
        <p>500</p>
      </div>
      <div className="featureContent">
        <p className="title">Crunchyroll integration</p>
        <p className="detail">
          I don't know whether this is feasible with crunchyroll's APIs, but
          ideally it would be nice to be able to link my kitsu and crunchyroll
          accounts so that when I finish an episode on ...
        </p>
      </div>
      <div className="featureComments">
        <FontAwesomeIcon icon={faComment} className="commentIcon"/>
        <p>12</p>
      </div>
    </div>
  );
};

export default Feature;
