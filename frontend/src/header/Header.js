import "./header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="headerContent">
        <p className="logo">Feature Requests</p>
        <div className="headerRight">
           <p>Sign In</p>
           <p>Sign Up</p>
           <img clasName="avatar" src="https://data.whicdn.com/images/322027365/original.jpg?t=1541703413" />
        </div>
      </div>
    </div>
  );
};

export default Header;
