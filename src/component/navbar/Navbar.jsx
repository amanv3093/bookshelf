import React, { useState, useRef } from "react";
import "./Navbar.css";

import logo from "../../logo.png";
import { UseContext } from "../../context/Context";

import { NavLink } from "react-router-dom";

function Navbar() {
  let { query, setQuery, handleSearch, fetchAllData } = UseContext();
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
        if (query.length > 1) {
          fetchAllData(1);
        }
        setQuery("");
      }
    }
  };

  return (
    <header>
      <div className="box22">
        <div className="logo">
          <img src={logo} width="200px" alt="Logo" />
        </div>
        <div className="box2">
          <div className={`search-wrapper ${isActive ? "active" : ""} hidden1`}>
            <div className="input-holder ">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
                ref={searchInputRef}
                onChange={handleSearch}
                value={query}
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

          {/* <img src={bookLogo} /> */}
          <NavLink
            to="/bookShelf"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="text">
              <span class="material-symbols-outlined">bookmark</span>
            </div>
          </NavLink>
        </div>
      </div>
      <div
        className={`search-wrapper active hidden2`}
        style={{ padding: "20px 0px" }}
      >
        <div className="input-holder ">
          <input
            type="text"
            className="search-input"
            placeholder="Type to search"
            ref={searchInputRef}
            onChange={handleSearch}
            value={query}
          />
          <button className="search-icon">
            {isActive ? (
              <span className="close-icon">&times;</span>
            ) : (
              <span className="search-icon-inner"></span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
