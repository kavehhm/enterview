import { useAppContext } from "@/Context";
import React, { useState, useEffect, useRef } from "react";
import RecordView from "./RecordView";

function Camera({ question }) {

    const videoRef = useRef(null)
 

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported in this browser.");
      return;
    }

    async function startCamera() {
      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setStream(userMediaStream);
        videoRef.current.srcObject = userMediaStream;
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }

    startCamera();
  }, []);




  

  return (
    <div className="rounded-lg flex-col z-50 flex items-center justify-center gap-5">
      <video
        className="w-[15rem] h-[15rem] rounded-lg"
        ref={videoRef}
        autoPlay={true}
      />
      <div className="h-6 w-6   bg-red-500 rounded-full animate-pulse"></div>
      

     <RecordView />
    </div>
  );
}

export default Camera;
