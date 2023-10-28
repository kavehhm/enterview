import { useAppContext } from "@/Context";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

function RecordView({ question }) {
  // Your component code remains mostly the same
  // ...

  const [blob, setBlob] = useState()



  return (
    <div className="rounded-lg flex items-center justify-center gap-5">
      
      <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            {status === "recording" ? (
              <button className="cursor-pointer" onClick={()=>{stopRecording(); setBlob(mediaBlobUrl)}}>
                Stop Recording
              </button>
            ) : (
              <button className="cursor-pointer" onClick={startRecording}>
                Start Recording
              </button>
            )}
            {/* {mediaBlobUrl && (
              <button className="cursor-pointer" onClick={uploadHandler}>
                Upload video
              </button>
            )} */}
            <p>{status}</p>
            <video src={mediaBlobUrl} controls autoPlay loop />
            <p>{mediaBlobUrl && mediaBlobUrl}</p>

          </div>
        )}
      />

      {/* {mediab ? (
        <video controls width="480" height="360">
          <source src={mediaUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video available</p>
      )} */}
    </div>
  );
}

export default RecordView;
