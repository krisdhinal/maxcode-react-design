import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <button
          className="w-full flex justify-between items-center py-3 text-left text-gray-700 font-semibold focus:outline-none"
          onClick={() => toggleAccordion()}
        >
          {title}
          <span
            className={`transform transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            open ? "max-h-screen" : "max-h-0"
          }`}
        >
          <div className="px-4 py-3">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
