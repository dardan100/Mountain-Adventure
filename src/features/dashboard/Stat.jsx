// import React from "react";

// export default function Stat({ icon, title, value, color, bgColor }) {
//   return (
//     <div className="w-full bg-white grid grid-cols-[4rem_auto] place-content-center md:place-content-start justify-center py-8 md:pr-16 rounded-md gap-2 px-2 h-28 items-center ">
//       <div
//         className={`${color} flex items-center justify-center ${bgColor} rounded-full h-16 w-16 text-4xl`}
//       >
//         {icon}
//       </div>
//       <div className="flex flex-col md:w-10 ">
//         <h5 className="uppercase text-center md:text-start text-gray-900 text-sm">
//           {title}
//         </h5>
//         <p className="font-medium text-2xl md:text-start text-center">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function Stat({ icon, title, value, color, bgColor }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-800 md:grid md:grid-cols-[4rem_2rem] xl:grid-cols-[4rem_2rem] items-center py-8 md:pr-16 rounded-md mt-9 md:place-items-start gap-2 px-2 place-items-center md:h-28  md:w-full grid grid-rows-[auto_auto] w-[250px]"
          : "bg-white md:grid md:grid-cols-[4rem_2rem] xl:grid-cols-[4rem_2rem] items-center py-8 md:pr-16 rounded-md mt-9 md:place-items-start gap-2 px-2 place-items-center md:h-28  md:w-full grid grid-rows-[auto_auto] w-[250px]"
      }`}
    >
      <div
        className={`${color} flex items-center justify-center ${bgColor} rounded-full h-16 w-16 text-4xl`}
      >
        {icon}
      </div>
      <div className="flex flex-col px-8 md:px-0">
        <h5
          className={` transition-colors duration-500 ${
            isDarkMode
              ? "uppercase xl:text-start text-center text-gray-300 text-sm"
              : "uppercase xl:text-start text-center text-gray-900 text-sm"
          }`}
        >
          {title}
        </h5>

        <div>
          <p className="font-medium text-2xl text-center xl:text-start">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
