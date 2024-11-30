import React from "react";

import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { useDarkMode } from "../../context/DarkModeContext";

export default function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const { isDarkMode } = useDarkMode();
  console.log(activities);

  return (
    <div
      className={`transition-colors duration-500 ${
        isDarkMode ? " px-2 py-4 bg-blue-300" : " px-2 py-4 bg-blue-100"
      }`}
    >
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "font-medium bg-indigo-600 rounded-lg text-center text-more-gray-100  px-2 py-2"
            : "font-medium bg-blue-300 rounded-lg text-center text-more-gray-100  px-2 py-2"
        }`}
      >
        Today
      </h1>
      {!isLoading ? (
        activities?.length > 0 ? (
          <>
            <div className="bg-grey-0 rounded-md pt-6 gap-6 ">
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <p className="text-2xl text-center mt-5 font-semibold">
              No activity today...
            </p>
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

{
  /* <div >
  <p className="bg-green-500 px-2 rounded-full text-white text-center">
    Arriving
  </p>
  <p className="bg-green-500">Flag Jonas Schmedtmann</p>
  <p className="bg-green-500">7 nights</p>
  <button className="bg-green-500">Check in</button>
</div> */
}
