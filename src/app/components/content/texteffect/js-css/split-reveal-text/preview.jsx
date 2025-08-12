"use client";
import "./style.css";

const SplitRevealText = ({ outerText, innerText, className = "" }) => {
  return (
    <div className={`split-reveal-container ${className}`}>
      <h2 className="split-reveal-title">
        {outerText}
        <span className="split-reveal-top">{outerText}</span>
        <span className="split-reveal-bottom">{outerText}</span>
        <span className="split-reveal-inner">{innerText}</span>
      </h2>
    </div>
  );
};

export default SplitRevealText;
