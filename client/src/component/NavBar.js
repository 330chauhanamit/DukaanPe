import React, {useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyPost from "./MyPost";
import Home from "./Home.js";

const NavBar = (props) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="nav-container">
      <nav className="navbar">
        <ul>
          <li>
            <Link className="Link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="Link" to="/MyPost">
              My Post
            </Link>
          </li>
          <li>
            <Link className="Link" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
        <div onClick={()=>setClicked(!clicked)} className="burger">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {clicked && <div className="nav-items">
          <Link to="/">
            <i className="material-icons">home</i>
            </Link>
            <Link to="/MyPost">
          <i className="material-icons">storefront</i>
          </Link>
        <Link to="profile/">
          <i className="material-icons">account_circle</i>
        </Link>
        </div>}
      </nav>
    </div>
  );
};

export default NavBar;
