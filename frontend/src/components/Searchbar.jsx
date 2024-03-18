import React from "react";
import IconSearch from "./Iconsearch";
import "../styles/searchbar.scss";

const Searchbar = () => {
  return (
    <div className="search">
      <form className="search-form">
        <input
          type="text"
         placeholder="Search for stocks, blogs..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          <IconSearch />
        </button>
      </form>
    </div>

  );
}

export default Searchbar;