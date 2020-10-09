import React from "react";
import Header from "./Header";
import "./Body.css";

function Body({ spotify }) {
  return (
    <div className="body">
      <Header spotify={spotify} />

      <div className="body__info">
        <img
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>description ...</p>
        </div>
      </div>
    </div>
  );
}

export default Body;
