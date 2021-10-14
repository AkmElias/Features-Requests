import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { getProperImagePath } from "../utils/utility.js";
import EditModal from "./EditModal.js";
import "./featureBoard.css";
import { UserContext } from "../contexts/userContext";
import axios from "axios";
const baseURL = "http://localhost:5000/api/features/";

const FeatureBoard = () => {
  const [{ user }, dispatch] = useContext(UserContext);
  if (!user && localStorage.getItem("user")) {
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("user")),
    });
  }
  const [featureList, setFeatureList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get(`${baseURL}`, config)
      .then((response) => {
        console.log(response.data);
        setFeatureList(response.data?.features);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleDelete = (featureId) => {
    if (window.confirm("Are you sure to delete?")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(featureId);
      axios
        .delete(`${baseURL}${featureId}`, config)
        .then((response) => {
          console.log(response);
          let newFeatureList = featureList.filter(
            (feature) => feature._id !== featureId
          );
          setFeatureList(newFeatureList);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
    }
  };

  return (
    <div className="featureBoard">
      <p
        style={{
          backgroundColor: "inherit",
          marginBottom: "10px",
          fontSize: "20px",
          color: "rgb(85, 62, 32)",
          padding: "5px",
          fontWeight: "500",
        }}
      >
        Feature List
      </p>
      {loading && <div className="loading">{"Loading....."}</div>}
      {!loading && (
        <div
          style={{
            // backgroundColor: "#eee",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <table id="features">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Logo</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {featureList.map((feature) => {
              return (
                <tr>
                  <td>{feature.title}</td>
                  <td>{feature.detail ? feature.detail : "No Detail!"}</td>
                  <td>
                    {" "}
                    {feature.logo ? (
                      <img
                        src={getProperImagePath(feature.logo)}
                        style={{
                          width: "50px",
                          height: "50px",
                          padding: "5px",
                          borderRadius: "5px",
                          backgroundColor: "#ccc",
                        }}
                      />
                    ) : (
                      "No Logo"
                    )}
                  </td>
                  <td>In Progress</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="editIcon"
                      onClick={() => setEditModalOpen(true)}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="deleteIcon"
                      onClick={() => handleDelete(feature._id)}
                    />
                  </td>
                  {editModalOpen && (
                    <EditModal
                      feature={feature}
                      setEditModalOpen={(value) => setEditModalOpen(value)}
                    />
                  )}
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default FeatureBoard;
