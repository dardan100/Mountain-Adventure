import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenuContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const open = setOpenId;
  const close = () => setOpenId("");

  return (
    <MenuContext.Provider value={{ openId, open, close }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, open, close } = useContext(MenuContext);

  function handleClick() {
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <div className="relative inline-block text-2xl">
      <button onClick={handleClick}>
        <HiEllipsisVertical />
      </button>
    </div>
  );
}

function List({ id, children }) {
  const { openId, close } = useContext(MenuContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return (
    <div
      ref={ref}
      className="absolute top-full -left-16 -mt-1 w-[180px] bg-white shadow-lg z-10 flex flex-col gap-2 px-2 py-4"
    >
      {children}
    </div>
  );
}
Menus.Menu = Menus;
Menus.Toggle = Toggle;
Menus.List = List;

export default Menus;
