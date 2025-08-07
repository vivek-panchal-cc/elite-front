import React, { useEffect } from "react";
import { Button } from "./ButtonUI";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  classStyle?: string;
  isClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  classStyle = "",
  isClose = true,
}) => {
  // Disable background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000bf] bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto mx-4 ${classStyle}`}
        onClick={(e) => e.stopPropagation()}
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
