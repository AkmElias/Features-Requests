import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./signUpModal.css";

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
  const [isOpen, setIsOpen] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
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
    }else if (!email && password && userName) {
      setErrorMessage("Email is required!");
      setError(true);
      return true;
    } 
    else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkMissingError()) {
      setError(false);
      console.log(userName, email, password)
      // props.setSignUpModal(false);
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
                {error && <div className="error">{errorMessage}</div>}
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
