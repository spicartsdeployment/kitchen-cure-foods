import React from "react";
import { useEffect, useRef, useState } from "react";
import { Video } from "lucide-react";

export const VideoWithThumbnail = ({ src,thumbnail }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const captureThumbnail = () => {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;  
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPoster(canvas.toDataURL("image/png"));
    };

    // wait for metadata, then seek first frame
    video.addEventListener("loadeddata", captureThumbnail, { once: true });

    return () => {
      video.removeEventListener("loadeddata", captureThumbnail);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hidden video (only used to capture frame) */}
      <video ref={videoRef} src={src} className="hidden" />

      {/* Actual playable video with poster */}
      <video
        src={src}
        poster="src/assets/page-under-construction.jpg"  //{poster || thumbnail}
        controls
        className="w-full h-48 object-cover"
      />

      {/* Camcorder icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-green-800/60 p-4 rounded-full">
          <Video className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Hidden canvas for extracting frame */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
