import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import "./signUpModal.css";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

const baseURL = "http://localhost:5000/api/users/register/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

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

const SignUpModal = (props) => {
  let subtitle;
  const [{ loading }, dispatch] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [congratsMessage, setCongratsMessage] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    setCongratsMessage("");
    if (email && password && userName) setError(false);
  }, [email, password, userName]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    props.setSignUpModal(false);
    setIsOpen(false);
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    if (email && password && userName) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (email && password && userName) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (email && password && userName) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const checkMissingError = () => {
    if (!email && !password && !userName) {
      setErrorMessage("UserName, Email and Pasword are required!");
      setError(true);
      return true;
    } else if (!email && password && !userName) {
      setErrorMessage("Username and Email is required!");
      setError(true);
      return true;
    } else if (email && !password && !userName) {
      setErrorMessage("Username and Pasword is required!");
      setError(true);
      return true;
    } else if (!email && !password && userName) {
      setErrorMessage("Email and Pasword is required!");
      setError(true);
      return true;
    } else if (email && !password && userName) {
      setErrorMessage("Pasword is required!");
      setError(true);
      return true;
    } else if (email && password && !userName) {
      setErrorMessage("Username is required!");
      setError(true);
      return true;
    } else if (!email && password && userName) {
      setErrorMessage("Email is required!");
      setError(true);
      return true;
    } else {
      return false;
    }
  };

  const register = async () => {
    await axios
      .post(baseURL, JSON.stringify({ userName, email, password }), config)
      .then((response) => {
        dispatch({
          type: "REGISTRATION_SUCCESS",
        });
        setCongratsMessage(response.data.message);
      })
      .catch((error) => {
        dispatch({
          type: "REGISTRATION_FAIL",
        });
        setCongratsMessage("");
        setError(true);
        if (error.message === "Request failed with status code 400") {
          setErrorMessage("user Already exist!");
        } else if (error.message === "Request failed with status code 401") {
          setErrorMessage("Invalid user data");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkMissingError()) {
      setError(false);
      dispatch({
        type: "REGISTRATION_START",
      });
      register();
    } else {
      setError(true);
    }
  };

  return (
    <div className="signUpModal">
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div className="signUpformContainer">
              <p className="signUp">Sign up </p>
              <form
                onSubmit={handleSubmit}
                style={{ backgroundColor: "inherit" }}
              >
                <div className="signUpformGroup">
                  <label>User Name</label>
                  <input
                    type="text"
                    placeholder={"Enter user name."}
                    value={userName}
                    onChange={handleUserNameChange}
                  />
                </div>
                <div className="signUpformGroup">
                  <label>Email</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter a valid email."}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="signUpformGroup">
                  <label>Password</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter password"}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {loading && <div className="loading">{"Processing......"}</div>}
                {error && <div className="error">{errorMessage}</div>}
                {congratsMessage && (
                  <div
                    style={{
                      backgroundColor: "inherit",
                      padding: "5px",
                      color: "green",
                      textAlign: "center",
                    }}
                  >
                    {congratsMessage}
                  </div>
                )}
                <div className="buttonsGroup">
                  <button className="button" type="submit">
                    SUBMIT
                  </button>
                  <p>
                    Already Signed up?{" "}
                    <span className="navSignIn">Sign in</span>
                  </p>
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SignUpModal;
