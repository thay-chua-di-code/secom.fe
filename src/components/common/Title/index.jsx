import React from "react";
import './style.scss'
const Title = ({ title }) => {
  return (
    <div className="title-container">
      <div className="title-block"></div>
      <p className="title-text">{title}</p>
    </div>
  );
};

export default Title;
