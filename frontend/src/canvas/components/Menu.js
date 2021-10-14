import "../assets/features.css";

const sortOptions = [
  { label: "Top", value: "Top" },
  { label: "New", value: "New" },
  { label: "Trending", value: "Trending" },
];

const filterOptions = [
  { label: "Under Review", value: "Under Review" },
  { label: "Planned", value: "Planned" },
  { label: "In Progress", value: "In Progress" },
  { label: "Complete", value: "Complete" },
];

const Menu = ({ selectedOption, selectOption, setShowMenu, setFilterOption, setSortOption }) => {
  return (
    <div className="menu">
      <div className="menuSort">
        <p>Sort</p>
        {sortOptions.map((option) => {
          return (
            <h4
              className={selectedOption === option.value ? "active" : ""}
              key={option.value}
              onClick={() => {
                setSortOption(option.value);
                selectOption(option.value);
                setShowMenu(false);
              }}
            >
              {option.label}
            </h4>
          );
        })}
      </div>
      <div className="menuFilter">
        <p>Filter</p>
        {filterOptions.map((option) => {
          return (
            <h4
              className={selectedOption === option.value ? "active" : ""}
              key={option.value}
              onClick={() => {
                selectOption(option.value);
                setFilterOption(option.value)
                setShowMenu(false);
              }}
            >
              {option.label}
            </h4>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
