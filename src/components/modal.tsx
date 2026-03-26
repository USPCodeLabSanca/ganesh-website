import React, { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
  onRequestClose: () => void;
}

function Modal({ children, onRequestClose }: ModalProps) {
  function handleRootClick() {
    onRequestClose();
  }

  function handleCardClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  useEffect(() => {
    // quando modal esta aberto e clica na tecla 'esc', ele fecha
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onRequestClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onRequestClose]);

  return (
    <div
      className="cursor-pointer flex items-center justify-center fixed w-full h-full max-h-xl left-0 top-0 bg-black/50 z-50"
      onClick={handleRootClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="cursor-pointer flex flex-col items-center p-4 md:p-10 m-6 rounded-md md:max-w-[70vw] max-h-[90vh] bg-adminForeground text-white overflow-y-auto"
        onClick={handleCardClick}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
