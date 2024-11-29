import React from 'react';

const Alert = ({ message, type, onClose }) => {
 
  const alertStyles = type === 'error' 
    ? 'border-[#f87171] text-[#991b1b] bg-[linear-gradient(#f871711a,#f871711a)]' 
    : 'border-[#6ee7b7] text-[#064e3b] bg-[linear-gradient(#6ee7b71a,#6ee7b71a)]'; 

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div
        className={`relative w-full max-w-96 p-6 rounded-lg text-base font-medium ${alertStyles} shadow-lg`}
      >
        <button
          type="button"
          aria-label="close-error"
          className="absolute right-4 top-4 p-1 rounded-md transition-opacity opacity-40 hover:opacity-100"
          onClick={onClose} 
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="16"
            width="16"
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        <p className="flex flex-row items-center mr-auto gap-x-2">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="28"
            width="28"
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
            ></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Alert;
