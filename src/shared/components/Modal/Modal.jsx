import { useEffect } from "react";
import { X } from "lucide-react";

import Button from "@/shared/ui/Button/Button";

import "./Modal.css";

export default function Modal({ children, closeModal }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) closeModal();
  };

  return (
    <div
      className="Modal"
      role="dialog"
      aria-modal="true"
      onMouseDown={handleBackdropClick}
    >
      <div className="ModalContent">
        <Button
          variant="secondary"
          size="sm"
          className="ModalClose"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <X size={18} />
        </Button>
        <div className="ModalBody">{children}</div>
      </div>
    </div>
  );
}
