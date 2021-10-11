import { useState, useEffect, useContext } from "react";
import SignUpModal from "../auth/SignUpModal";
import SignInModal from "../auth/SignInModal";
import "./header.css";
import { UserContext } from "../contexts/userContext";

const Header = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [{ user }] = useContext(UserContext);

  return (
    <div className="header">
      <div className="headerContent">
        <p className="logo">Feature Requests</p>
        <div className="headerRight">
          <p
            onClick={() => {
              setSignInModal(true);
              setSignUpModal(false);
            }}
          >
            Sign In
          </p>
          <p
            onClick={() => {
              setSignUpModal(true);
              setSignInModal(false);
            }}
          >
            Sign Up
          </p>
          <img
            clasName="avatar"
            src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413"
          />
        </div>
      </div>
      {signUpModal && (
        <SignUpModal setSignUpModal={(value) => setSignUpModal(value)} />
      )}
      {signInModal && (
        <SignInModal setSignInModal={(value) => setSignInModal(value)} />
      )}
    </div>
  );
};

export default Header;
