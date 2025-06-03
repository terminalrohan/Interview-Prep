import React from "react";
import { LuX } from "react-icons/lu";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/40 p-4"
      onClick={handleClose}
    >
      <div 
        className="relative bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors z-50"
          aria-label="Close modal"
        >
          <LuX className="w-6 h-6" />
        </button>
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
