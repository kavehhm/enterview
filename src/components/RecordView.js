import { AppProvider, useAppContext } from "@/Context";
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

function RecordView({
  status,
  startRecording,
  stopRecording,
  previewStream,
  mediaBlobUrl,
  file,
  getJobId,
  clearBlobUrl,
}) {
  // Your component code remains mostly the same
  // ...

  const [blob, setBlob] = useState();
  const { loading, setLoading, results, setResults } = useAppContext();



  

  const videoRef = useRef(null);

  return (
    <>
      <div className="rounded-lg flex items-center justify-center gap-5"></div>

      <div>
        <div className="flex gap-3">
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        </div>

        <div className="w-[10rem]">
          {file && status !== "recording" && (
            <button className="bg-green-600 cursor-auto p-4 text-white">
                Your video interview is ready! Click start recording to restart.
            </button>
          )}

          {status === "recording" && (
            <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
          )}

          {status === "recording" && <VideoPreview stream={previewStream} />}

          {status === "idle" && <Camera />}
        </div>
      </div>
    </>
  );
}

export default RecordView;
