import { useAppContext } from "@/Context";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Check for browser compatibility
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported in this browser.");
      return;
    }

    // Access the user's camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    startCamera();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
    </div>
  );
}

const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  {
    ssr: false,
  }
);

function RecordView({ question }) {
  // Your component code remains mostly the same
  // ...

  const [blob, setBlob] = useState();
  const [file, setFile] = useState();


  const getURL = async (blobUrl) => {
    const response = await fetch(blobUrl)
const blob = await response.blob()
console.log(blob instanceof Blob ? "Blob Object" : "Blob URL")
console.log(blob)
  }

  const videoRef = useRef(null);

  useEffect(() => {
    console.log(blob)
  
    
  }, [blob])
  

  useEffect(() => {
    setFile(new File([blob], "myFile.mp4", { type: "video/mp4" }));
  }, [blob]);

  console.log(blob);

  return (
    <div className="rounded-lg flex items-center justify-center gap-5">
      <ReactMediaRecorder
        video
        render={({
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
          previewStream,
        }) => (
          <div>
            {status === "recording" ? (
              <button
                className="cursor-pointer"
                onClick={async () => {
                  await stopRecording();
                  setBlob(mediaBlobUrl);
                  console.log(mediaBlobUrl)
                  await getURL(mediaBlobUrl)
                }}
              >
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

            <p>{mediaBlobUrl && mediaBlobUrl}</p>
            
            {console.log(mediaBlobUrl)}
            {}
        

            {mediaBlobUrl && status !== "recording" && (
              <video src={mediaBlobUrl} controls autoPlay loop />
            )}

            {status === "recording" && (
              <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
            )}

            {status === "recording" && <VideoPreview stream={previewStream} />}

            {status === "idle" && <Camera />}
          </div>
        )}
      />
    </div>
  );
}

export default RecordView;
