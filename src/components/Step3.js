import React from "react";
import Camera from "./Camera";

const Step3 = ({}) => {

    
  return (
    <div className="relative flex  justify-center w-full min-h-[80vh]">
      <div className="flex gap-5 z-50 flex-col">
        <p className="text-center font-bold text-2xl">
            Why do you want to work at company
        </p>
        <div className="flex gap-5 z-50 flex-col">
        <button  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Next Question
        </button>
        <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Cancel
        </button>
      </div>
      </div>
      <div className="absolute left-0 bottom-20">
        <Camera />
      </div>
    </div>
  );
};

export default Step3;
