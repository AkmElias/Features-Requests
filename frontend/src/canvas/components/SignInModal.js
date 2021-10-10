import { useState, useEffect } from "react";
import Modal from "react-modal";
import "../assets/signInModal.css";

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

const SignInModal = (props) => {
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
                  />
                </div>
                <div className="signInformGroup">
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
                  <p>Didn't Signed up? <span className="navSignUp">Sign up</span></p>
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

export default SignInModal;
