"use client";

import { useState } from "react";
import "./style.css";

const Accordion = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="accordion-container">
      {items.map((item, index) => {
        const isOpen = openItems.includes(item.id);
        const isLast = index === items.length - 1;
        return (
          <div
            key={item.id}
            className={`accordion-item ${
              !isLast ? "accordion-item--with-border" : ""
            }`}>
            <button
              onClick={() => toggleItem(item.id)}
              className="accordion-header">
              <span className="accordion-title">{item.title}</span>
              <div
                className={`accordion-chevron ${
                  isOpen ? "accordion-chevron--rotated" : ""
                }`}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </button>

            <div
              className={`accordion-content ${
                isOpen ? "accordion-content--open" : ""
              }`}>
              <div className="accordion-content-inner">
                <div className="accordion-text">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
