import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import "./signInModal.css";
import { UserContext } from "../contexts/userContext";
import axios from "axios";

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

const baseURL = "http://localhost:5000/api/users/login/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const SignInModal = (props) => {
  let subtitle;
  const [{ loading }, dispatch] = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (email && password) setError(false);
  }, [email, password]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    props.setSignInModal(false);
    setIsOpen(false);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (email && password) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (email && password) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const checkMissingError = () => {
    if (!email && !password) {
      setErrorMessage("Email and Pasword are required!");
      setError(true);
      return true;
    } else if (!email && password) {
      setErrorMessage("Email is required!");
      setError(true);
      return true;
    } else if (email && !password) {
      setErrorMessage("Pasword is required!");
      setError(true);
      return true;
    } else {
      return false;
    }
  };

  const login = async () => {
    await axios
      .post(baseURL, { email, password }, config)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "SET_USER",
          user: response.data.user,
        });
        localStorage.setItem("user", JSON.stringify(response.data.user))
        props.setSignInModal(false);
        setIsOpen(false);
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAIL",
        });
        if (error.message === "Request failed with status code 401") {
          setError(true);
          setErrorMessage("UserName/Password doesn't match");
        } else {
          setError(true);
          setErrorMessage(error.message);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkMissingError()) {
      setError(false);
      login();
      dispatch({
        type: "LOGIN_START",
      });
      // console.log(email, password);
      // props.setSignInModal(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="signInModal">
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div className="signInformContainer">
              <p className="signIn">Sign In </p>
              <form
                onSubmit={handleSubmit}
                style={{ backgroundColor: "inherit" }}
              >
                <div className="signInformGroup">
                  <label>Email</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter a valid email."}
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="signInformGroup">
                  <label>Password</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter password"}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                {loading && <div className="loading">{"Verifying......"}</div>}
                {error && <div className="error">{errorMessage}</div>}
                <div className="buttonsGroup">
                  <button className="button" type="submit">
                    SUBMIT
                  </button>
                  <p>
                    Didn't Signed up? <span className="navSignUp">Sign up</span>
                  </p>
                </div>
                <div></div>
              </form>
              {/* {error && <div className="error">{errorMessage}</div>} */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SignInModal;
