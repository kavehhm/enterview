import { useAppContext } from "@/Context";
import React, { useState, useEffect, useRef } from "react";

function Camera({ question }) {
  const { setVideos, videos } = useAppContext();
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);

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

  function startRecording() {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        // You can now save the recordedBlob or do other operations with it
        // For example, save it in the state
        setRecording(false);
        setMediaRecorder(null);
        setRecordedChunks([]);
      };

      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();
      setRecording(true);
    }
  }

  function stopRecording() {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  }

  const uploadHandler = () => {
    setRecordedBlob(new Blob(recordedChunks, { type: "video/webm" }));

    if (recordedBlob) {
      const videoUrl = URL.createObjectURL(recordedBlob);
      setVideoUrl(videoUrl);
    }

    // Update the videos state with the new videoUrl
    setVideos((prev) => [ ...prev, videoUrl]);
    console.log(videos);
  };

  return (
    <div className="rounded-lg flex flex-col  items-center  justify-center gap-5">
      <video
        className="w-[15rem] h-[15rem] rounded-lg"
        ref={videoRef}
        autoPlay={true}
      />
      <div className="h-6 w-6   bg-red-500 rounded-full animate-pulse"></div>
      <div className="flex gap-5 flex-col">
        <button
          className="cursor-pointer"
          hidden={recording}
          onClick={startRecording}
          disabled={recording}
        >
          Start Recording
        </button>
        <button
          className="cursor-pointer"
          onClick={stopRecording}
          disabled={!recording}
          hidden={!recording}
        >
          Stop Recording
        </button>

        <button className="cursor-pointer" onClick={uploadHandler}>
          Upload video
        </button>
      </div>

      {videos[0] ? (
        <div>
        {videos.map((video=><video controls width="480" height="360">
          <source src={video} type="video/webm" />
          Your browser does not support the video tag.
        </video>))}
        </div>
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
}

export default Camera;
