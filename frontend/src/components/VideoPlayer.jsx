import React from "react";

const VideoPlayer = ({ src }) => {
  return (
    <div className="flex justify-center w-full bg-green-50">
      <video
        className="rounded-3xl shadow-lg max-w-full border border-gray-300"
        controls
        autoPlay
        muted
        loop
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
