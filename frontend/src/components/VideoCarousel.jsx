import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { carouselData } from "../constants";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { VideoWithThumbnail } from "../components/VideoWithThumbnail";

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  function handleWatchVideo(item) {
    console.log("item: ", item);
    if (item?.video) {
      window.open(item.video, "_blank", "noopener,noreferrer");
    }

    // setSelectedVideo(item.video);
  }

  function closeDialog() {
    setSelectedVideo(null);
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className="pb-16"
      >
        {carouselData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-green-100 shadow-md rounded-xl overflow-hidden flex flex-col">
              {/* Video */}
              <VideoWithThumbnail src={item.video} />

              {/* Content */}
              <div className="px-4 py-6 flex flex-col flex-1">
                <h2 className="text-2xl font-semibold px-2 py-2">
                  {item.title}
                </h2>
                <p className="flex-1 px-2 py-2 text-lg">{item.text}</p>
                <button
                  className="mt-4 px-4 py-2 border border-amber-200 bg-green-200 rounded-lg hover:bg-green-800 hover:text-white"
                  onClick={() => handleWatchVideo(item)}
                >
                  {item.buttonLabel}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation - bottom left */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        <button className="custom-prev px-3 py-1 rounded-lg hover:bg-green-800 hover:text-white transition">
          <ChevronLeftIcon size={35} />
        </button>
        <button className="custom-next px-3 py-1 rounded-lg hover:bg-green-800 hover:text-white transition">
          <ChevronRightIcon size={35} />
        </button>
      </div>

      {/* Video Dialog */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-3xl w-full relative">
            {/* Close button */}
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-white bg-black/70 rounded-full px-2 py-1 hover:bg-black"
            >
              ✕
            </button>

            {/* Video player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
