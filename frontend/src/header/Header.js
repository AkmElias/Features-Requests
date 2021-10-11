import { useState, useEffect, useContext } from "react";
import SignUpModal from "../auth/SignUpModal";
import SignInModal from "../auth/SignInModal";
import "./header.css";
import { UserContext } from "../contexts/userContext";

const Header = () => {
  const [signUpModal, setSignUpModal] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [{user}, dispatch] = useContext(UserContext);

  if(!user && localStorage.getItem("user")){
    dispatch({
      type: "SET_USER",
      user: JSON.parse(localStorage.getItem("user"))
    })
  }

  const removeUser = () => {
    localStorage.removeItem("user");
    dispatch({
      type: "REMOVE_USER",
    });
  };
  
  // useEffect(() => {
  //   if(!user && localStorage.getItem("user")){
  //     dispatch({
  //       type: "SET_USER",
  //       user: JSON.parse(localStorage.getItem("user"))
  //     })
  //   }
  // })

  return (
    <div className="header">
      <div className="headerContent">
        <p className="logo">Feature Requests</p>
        <div className="headerRight">
          {user ? (
            <>
              <img
                clasName="avatar"
                src={
                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt9DZKrj_ZJD2EPmds05DCPmPdXht9oG-PmYytmlbajeltPyRJXxhoepGbXsbwBjc6Cl0&usqp=CAU"
                }
              />
              <span style={{ backgroundColor: "inherit", color: "#FFF", marginRight:"15px", cursor:"pointer"}}>{user.userName}</span>
              <p onClick={removeUser}>Sign Out</p>
            </>
          ) : (
            <>
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
            </>
          )}
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
