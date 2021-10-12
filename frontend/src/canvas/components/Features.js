import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import Feature from "./Feature";
import "../assets/features.css";

import axios from "axios";

const baseURL = "http://localhost:5000/api/features/";

const Features = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedOption, setSelectedOption] = useState("New");
  const [showMenu, setShowMenu] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([1, 2, 3, 4]);

  const menuRef = useRef();
  const searchRef = useRef();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(async () => {
    await axios
      .get(`${baseURL}`, config)
      .then((response) =>{
        console.log(response)
        setFeatures(response.data?.features)
        setLoading(false)
      } )
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }, []);

  const toggoleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = () => {};

  useEffect(() => {
    const activeSearch = () => {
      setSearchActive(true);
    };
    if (searchRef && searchRef.current) {
      searchRef.current.addEventListener("focus", activeSearch);
      // return () => {
      //   searchRef.current.removeEventListener("focus", activeSearch);
      // };
    }
  });

  return (
    <div className="features">
      <div className="featuresTopBar">
        {!searchActive && (
          <div className="featuresTopBarLeft">
            <p>Dispalying </p>
            <div className="menuSection" onClick={toggoleMenu}>
              <p> {selectedOption} </p>
              <img src="https://cdn.iconscout.com/icon/free/png-256/keyboard-down-arrow-1780093-1518654.png" />
            </div>
            <p> posts </p>

            {showMenu && (
              <div ref={menuRef} id="postMenu">
                <Menu
                  selectedOption={selectedOption}
                  selectOption={(option) => {
                    setSelectedOption(option);
                  }}
                  setShowMenu={setShowMenu}
                />
              </div>
            )}
          </div>
        )}

        <div className={searchActive ? "searchActive" : "featureTopBarRight"}>
          <FontAwesomeIcon
            icon={faSearch}
            className="searchIcon"
            onSubmit={handleSearch}
          />
          <input
            type="text"
            placeholder={"Search..."}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="searchField"
            ref={searchRef}
          />
          {searchActive && (
            <FontAwesomeIcon
              icon={faTimes}
              className="closeIcon"
              onClick={() => {
                setSearchActive(false);
                setSearchTerm("");
              }}
            />
          )}
        </div>
      </div>
      {loading ? (
        <div
          style={{
            backgroundColor: "inherit",
            color: "green",
            fontSize: "20px",
            padding: "20px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {"Loading......."}
        </div>
      ) : (
        features.map((feature, index) => {
          return <Feature key={index} feature={feature}/>;
        })
      )}
    </div> 
  );
};

export default Features;
