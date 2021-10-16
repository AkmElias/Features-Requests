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
  const [selectedOption, setSelectedOption] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState();
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

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
      .then((response) => {
        console.log(response);
        setFeatures(response.data?.features);
        setFilteredFeatures(response.data.features);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const toggoleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (setSearchTerm) {
      const newFeatures = features.filter((feature) => {
        return feature.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredFeatures(newFeatures);
    } else {
      setFilteredFeatures(features);
    }
  };

  useEffect(() => {
    if (sortOption) {
      if (sortOption === "Top" || sortOption === "Trending") {
        const sortedFeatures = features
          .slice()
          .sort((a, b) => b.comments.length - a.comments.length);
        setFilteredFeatures(sortedFeatures);
      } else if (sortOption === "New") {
        let sortedFeatures = features
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setFilteredFeatures(sortedFeatures)
      }
    }
  }, [sortOption]);

  useEffect(() => {
    if (filterOption) {
      const newFeatures = features.filter((feature) => {
        return feature.status === filterOption;
      });
      setFilteredFeatures(newFeatures);
    } else {
      setFilteredFeatures(features);
    }
  }, [filterOption]);

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
                  setFilterOption={(value) => setFilterOption(value)}
                  setSortOption={(value) => setSortOption(value)}
                />
              </div>
            )}
          </div>
        )}

        <div className={searchActive ? "searchActive" : "featureTopBarRight"}>
          <FontAwesomeIcon
            icon={faSearch}
            className="searchIcon"
            type="submit"
            onSubmit={handleSearch}
          />
          <input
            type="text"
            placeholder={"Search..."}
            value={searchTerm}
            onChange={handleSearch}
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
        <>
          {searchTerm || filterOption || sortOption
            ? filteredFeatures.map((feature) => {
                return <Feature key={feature._id} feature={feature} />;
              })
            : features.map((feature) => {
                return <Feature key={feature._id} feature={feature} />;
              })}
        </>
      )}
    </div>
  );
};

export default Features;
