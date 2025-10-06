import { motion } from "framer-motion";

import { useMenuContext } from "../context/MobileMenuContext";
import {
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
import Close from "./Close";

export default function MobileMenu() {
  const { menuOpened } = useMenuContext();
  const { isDarkMode } = useDarkMode();

  return (
    <motion.div
      animate={menuOpened ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, display: "none" },
        visible: { opacity: 1, display: "flex" },
      }}
      transition={{ duration: 0.25 }}
      className={`fixed top-0 right-0 bottom-0 left-0 z-50 hidden justify-end ${
        isDarkMode ? "bg-gray-900/60" : "bg-gray-100/70"
      } xl:hidden`}
    >
      <motion.nav
        animate={menuOpened ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, x: "100%" },
          visible: { opacity: 1, x: "0%" },
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`flex h-full w-[55%] max-w-96 min-w-60 flex-col items-start gap-y-8 p-6 pl-7 shadow-xl ${
          isDarkMode ? "bg-indigo-800" : "bg-indigo-100"
        }`}
      >
        <Close />

        <motion.ul
          animate={menuOpened ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, x: "100%" },
            visible: { opacity: 1, x: "0%" },
          }}
          transition={{ ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-y-6 w-full"
        >
          {[
            { to: "/dashboard", icon: <HiOutlineHome />, text: "Home" },
            { to: "/cabins", icon: <HiOutlineHomeModern />, text: "Cabins" },
            {
              to: "/bookings",
              icon: <HiOutlineCalendarDays />,
              text: "Bookings",
            },
            { to: "/user", icon: <HiOutlineUser />, text: "User" },
            { to: "/settings", icon: <HiOutlineCog6Tooth />, text: "Settings" },
          ].map(({ to, icon, text }) => (
            <li
              key={to}
              className={`text-[22px] font-medium py-3 px-6 rounded-lg transition-all duration-200 ${
                isDarkMode
                  ? "hover:bg-indigo-600 text-gray-100"
                  : "hover:bg-indigo-300 text-gray-700"
              }`}
            >
              <Link to={to} className="flex items-center gap-4">
                <span
                  className={`text-2xl ${
                    isDarkMode
                      ? "text-indigo-300 group-hover:text-indigo-100"
                      : "text-indigo-700 group-hover:text-indigo-900"
                  }`}
                >
                  {icon}
                </span>
                <span>{text}</span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </motion.nav>
    </motion.div>
  );
}
