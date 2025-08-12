"use client";
import "./style.css";

const PopText = ({ maintext, subText, className = "" }) => {
  return (
    <div className={`pop-text-container ${className}`}>
      <h1 className="pop-text-title">
        <span className="pop-word">{maintext}</span>
        <span className="pop-word pop-word-sub">{subText}</span>
      </h1>
    </div>
  );
};

export default PopText;
