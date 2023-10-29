import { useAppContext } from "@/Context";
import React, { useEffect, useState } from "react";

function getTop5Objects(inputArray) {
  // Sort the input array in descending order of scores
  const sortedArray = inputArray.sort((a, b) => b.score - a.score);

  // Slice the first 5 elements to get the top 5 objects
  const top5Objects = sortedArray.slice(0, 5);

  return top5Objects;
}

export default function Results() {
  const { results } = useAppContext();
  const [topFive, setTopFive] = useState([]);
  useEffect(() => {
    setTopFive(getTop5Objects(results));
  }, [results]);

  // Example usage:

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="font-semibold text-lg">
      Your leading emotions
      </p>
      <div className="w-64">
        {topFive.map((item) => (
          <div key={item.name} className="mb-4">
            <div className="flex justify-between items-center gap-4">
            <p className="text-gray-800">{item.name}</p>
            <p> {Math.round(item.score * 100)} / 100</p>
            </div>

            <div className="bg-gray-600 rounded-md h-4">
              <div
                className="bg-blue-600 rounded-l-md h-full w-[calc(100%*var(--score))]"
                style={{ "--score": item.score }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
