import { createContext, useState, useContext } from "react";

export const MenuContext = createContext({
  menuOpened: false,
  setMenuOpened: () => {},
});

export default function MenuContextProvider({ children }) {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <MenuContext.Provider value={{ menuOpened, setMenuOpened }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
