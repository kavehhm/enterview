import Camera from "@/components/Camera";
import RecordView from "@/components/RecordView";
import { useAppContext } from "@/Context";
import { useRouter } from "next/router";
import React from "react";

const Step3 = ({}) => {
    const router = useRouter()
    const {question} = router.query

    const {questions} = useAppContext()

    
  return (
    <div className="relative flex  justify-center w-full min-h-[80vh]">
      <div className="flex gap-5 z-50 flex-col">
        <p className="text-center font-bold text-2xl">
            {/* Why do you want to work at company */}
            {questions[parseInt(question)-1]}
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
      <div className=" left-0 bottom-20">
        <RecordView />
      </div>
    </div>
  );
};

export default Step3;
