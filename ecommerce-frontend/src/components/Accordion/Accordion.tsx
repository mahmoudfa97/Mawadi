// UserActions.js
import { useState } from 'react';

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

    return (
        <div className="mb-4">
        <button
          onClick={toggleAccordion}
          className="flex justify-between w-full text-left font-semibold py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
        >
          {title}
          <span className={`transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            ▼
          </span>
        </button>
        {isOpen && <div className="px-4 pt-2">{children}</div>}
      </div>
    );
};

export default Accordion;
