import { AppProvider, useAppContext } from "@/Context";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import toast from "react-hot-toast";

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
  const [fileMp4, setFile] = useState();
  const { loading, setLoading } = useAppContext();

  const blobToFile = (theBlob, fileName) => {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  };

  const getJobId = () => {
    setLoading(true);

    const options = {
      method: "POST",
      url: "https://api.hume.ai/v0/batch/jobs",
      headers: {
        accept: "application/json",
        "content-type":
          "multipart/form-data; boundary=---011000010111000001101001",
        "X-Hume-Api-Key": "Q5KiHFOAPgew62dwR3Y8zgmaaoK5wcE8gGhMmwwfhV2u1LQv",
      },
      data: fileMp4,
    };

    const localOptions = {
      method: "POST",
      url: "http://127.0.0.1:5000/",
      headers: {
        accept: "application/json",
      },

      data: {item: 'test'},
    };

    axios
      .request(localOptions)
      .then(function (response) {
        toast.success("We got your data");
        setLoading(false);
        console.log(response.data);
      })
      .catch(function (error) {
        toast.error("We did not get your data");
        setLoading(false);
        console.error(error);
      });
  };

  const {
    status,
    startRecording,
    stopRecording,
    previewStream,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    video: true,
    blobPropertyBag: {
      type: "video/mp4",
    },
    onStop: async (blobUrl, blob) => {
      const file = blobToFile(blob, "video.mp4");
      console.log("blob", blob);
      console.log("file", file);
      //   clearBlobUrl();
      setFile(file);
    },
  });

  const videoRef = useRef(null);

  return (
    <>
      <div className="rounded-lg flex items-center justify-center gap-5"></div>

      <div>
        <p>{status}</p>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
        <button onClick={getJobId}>GetJobID</button>

        {mediaBlobUrl && status !== "recording" && (
          <video src={mediaBlobUrl} controls autoPlay loop />
        )}

        {status === "recording" && (
          <div className="h-6 w-6 bg-red-500 rounded-full animate-pulse"></div>
        )}

        {status === "recording" && <VideoPreview stream={previewStream} />}

        {status === "idle" && <Camera />}
      </div>
    </>
  );
}

export default RecordView;
