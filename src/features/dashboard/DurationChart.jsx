import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  const [dimensions, setDimensions] = useState({
    height: 240,
    innerRadius: 75,
    outerRadius: 110,
  });

  // Adjust chart dimensions based on screen width
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setDimensions({ height: 200, innerRadius: 50, outerRadius: 70 });
      } else if (window.innerWidth < 1024) {
        setDimensions({ height: 220, innerRadius: 65, outerRadius: 90 });
      } else {
        setDimensions({ height: 240, innerRadius: 75, outerRadius: 110 });
      }
    }

    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={
        isDarkMode
          ? "bg-red-300 px-2 py-4 xl:mt-0 mt-2"
          : "bg-red-100 px-2 py-4 xl:mt-0 mt-2"
      }
    >
      <h1
        className={`transition-colors duration-500 ${
          isDarkMode
            ? "bg-indigo-600 px-2 py-2 rounded-lg text-center text-white font-medium"
            : "bg-blue-300 px-2 py-2 rounded-lg text-center text-white font-medium"
        }`}
      >
        Stay duration summary
      </h1>
      {confirmedStays.length > 0 ? (
        <ResponsiveContainer width="100%" height={dimensions.height}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              innerRadius={dimensions.innerRadius}
              outerRadius={dimensions.outerRadius}
              cx="50%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-2xl text-center mt-5 font-semibold">
          No activity today...
        </p>
      )}
    </div>
  );
}
