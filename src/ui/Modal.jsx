import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useDarkMode } from "../context/DarkModeContext";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const open = setIsOpen;
  const close = () => setIsOpen("");
  const { isDarkMode } = useDarkMode();
  return (
    <ModalContext.Provider
      value={{ children, isOpen, open, close, isDarkMode }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ name, children }) {
  const { isOpen, close, isDarkMode } = useContext(ModalContext);

  if (name !== isOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen z-[1000] backdrop-blur-sm ">
      <div
        className={`transition-colors duration-500${
          isDarkMode
            ? " fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  border border-gray-400 text-white rounded-lg shadow-lg px-4 py-4 transition-all duration-500 bg-gray-700 "
            : " fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  border rounded-lg shadow-lg px-4  py-6 transition-all duration-500 text-gray-700 bg-gray-200 "
        }`}
      >
        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;
