import React from "react";
import "./Navbar.css";
import { useState, useRef } from "react";
import AddBookshelf from "../addBookshelf/AddBookshelf";
import logo from "../../logo.png";
function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const searchInputRef = useRef(null);

  const searchToggle = (event) => {
    event.preventDefault();
    setIsActive((prev) => !prev);

    if (searchInputRef.current) {
      if (!isActive) {
        searchInputRef.current.focus();
      } else {
        searchInputRef.current.value = "";
      }
    }
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} width="200px" />
      </div>
      <div className="box2">
        <div className={`search-wrapper ${isActive ? "active" : ""}`}>
          <div className="input-holder">
            <input
              type="text"
              className="search-input"
              placeholder="Type to search"
              ref={searchInputRef}
            />
            <button className="search-icon" onClick={searchToggle}>
              {isActive ? (
                <span className="close-icon">&times;</span>
              ) : (
                <span className="search-icon-inner"></span>
              )}
            </button>
          </div>
        </div>

        <h1 className="text"> MyBookshelf</h1>
      </div>
    </header>
  );
}

export default Navbar;
