import React from "react";
import SearchBar from "./SearchBar";

function MealList() {
  return (
    <div>
      <div className="header">
        <h1>Our Menu</h1>
        <h3>Choose your favorite from our Italian classics.</h3>
      </div>
      <SearchBar />
    </div>
  );
}

export default MealList;
