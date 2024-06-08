import React, { useContext } from "react";
import { UseContext } from "../../context/Context";

function HeroSection() {
  let { searchText } = UseContext();
  console.log(searchText);
  return (
    <div>
      <h1>{searchText}</h1>
      <h1>{searchText}</h1>

      <h1>{searchText}</h1>
      <h1>{searchText}</h1>

      <h1>{searchText}</h1>
    </div>
  );
}

export default HeroSection;
