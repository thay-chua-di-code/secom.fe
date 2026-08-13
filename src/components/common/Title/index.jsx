import React from "react";
import "./style.scss";

const Title = ({ eyebrow, title, description, align = "center" }) => {
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}

      {title && <h2 className="section-title__heading">{title}</h2>}

      {description && (
        <p className="section-title__description">{description}</p>
      )}
    </div>
  );
};

export default Title;
