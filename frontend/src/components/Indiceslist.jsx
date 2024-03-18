import React from "react";
import "../styles/indices.scss";

const Indiceslist = () => { 
  return (
    <div className="indices">
      <div className="indices-title">
        <h3>INDICES</h3>  
      </div>
      <div className="indices-info">
        <p>Name</p>
        <p>Last Price</p>
        <p>Change</p>
      </div>
    </div>
  );
};

export default Indiceslist;