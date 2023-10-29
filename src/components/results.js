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

  console.log(results)
  const [topFive, setTopFive] = useState([]);
  useEffect(() => {
    const emotionSums = {};  // Sum of scores for each emotion
    const emotionCounts = {};  // Number of occurrences for each emotion

    for (const pred of results) {
      const emotions = pred.emotions;
      for (const emotion of emotions) {
        const name = emotion.name;
        const score = emotion['score'];
        if (!emotionSums[name]) {
          emotionSums[name] = 0;
        }
        if (!emotionCounts[name]) {
          emotionCounts[name] = 0;
        }

        emotionSums[name] += score;
        emotionCounts[name] = (emotionCounts[name]) + 1;
      }
      // console.log(emotionSums)

    }

    const emotionAvgs = {};
    for (const [name, total] of Object.entries(emotionSums)) {
      emotionAvgs[name] = total / emotionCounts[name];
    }

    const sortedEmotions = Object.entries(emotionAvgs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

    // console.log(sortedEmotions)

    
    setTopFive(sortedEmotions);
  }, [results]);

  // Example usage:

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="font-semibold text-lg">
      Your leading emotions
      </p>
      <div className="w-64">
        {topFive.map((item) => (
          <div key={item[0]} className="mb-4">
            <div className="flex justify-between items-center gap-4">
            <p className="text-gray-800">{item[0]}</p>
            <p> {Math.round(item[1] * 100)} / 100</p>
            </div>

            <div className="bg-gray-600 rounded-md h-4">
              <div
                className="bg-blue-600 rounded-l-md h-full w-[calc(100%*var(--score))]"
                style={{ "--score": item[1] }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
