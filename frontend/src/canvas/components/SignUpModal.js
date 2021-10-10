import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/signUpModal.css";

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

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    console.log(props);
  });

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    props.setSignUpModal(false);
    setIsOpen(false);
  }

  const handleSubmit = () => {

  }
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
                  />
                </div>
                <div className="signUpformGroup">
                  <label>Email</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter a valid email."}
                    type="email"
                  />
                </div>
                <div className="signUpformGroup">
                  <label>Password</label>
                  <input
                    className="formGroupInput"
                    placeholder={"Enter password"}
                    type="password"
                  />
                </div>
                <div className="buttonsGroup">
                  
                  <button className="button" onSubmit={closeModal}>
                    SUBMIT
                  </button>
                  <p>Already Signed up? <span className="navSignIn">Sign in</span></p>
                </div>
                <div>

                </div>
              </form>
              {/* {error && <div className="error">{errorMessage}</div>} */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SignUpModal;
