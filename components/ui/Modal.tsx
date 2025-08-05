import React from "react";
import { Button } from "./ButtonUI";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classStyle: React.ReactNode;
  isClose: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  classStyle = "",
  isClose = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000bf] bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 ${classStyle}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on outside click
      >
        {isClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
