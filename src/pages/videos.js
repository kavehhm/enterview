import { useAppContext } from "@/Context";
import React from "react";

const videos = () => {
  const { videos } = useAppContext();
  return (
    <div className="flex flex-col">
      {videos.map((video) => (
        <video src={video} autoPlay loop muted />
      ))}
    </div>
  );
};

export default videos;
