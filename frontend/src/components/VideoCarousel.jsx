import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { carouselData } from "../constants";
import { ChevronLeftIcon, ChevronRightIcon, X } from "lucide-react";
import { VideoWithThumbnail } from "../components/VideoWithThumbnail";

export default function VideoCarousel() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  function handleWatchVideo(item) {
    if (item?.video) {
      window.open(item.video, "_blank", "noopener,noreferrer");
    }
  }

  function closeDialog() {
    setSelectedVideo(null);
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 group">
      {/* Carousel */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 },
        }}
        className="pb-16"
      >
        {carouselData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white shadow-md rounded-3xl overflow-hidden flex flex-col h-full transition-transform duration-300 border border-gray-200">
              {/* Video */}
              <VideoWithThumbnail src={item.video} thumbnail={item.thumbnail} />

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold px-2 py-1 sm:py-2">
                  {item.title}
                </h2>
                <p className="flex-1 px-2 py-1 sm:py-2 text-sm sm:text-base md:text-sm leading-relaxed">
                  {item.text}
                </p>
                <div className="p-4 flex justify-center items-center">
                  <button
                    className="px-8 py-2 mt-4 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-300"
                    onClick={() => handleWatchVideo(item)}
                  >
                    {item.buttonLabel}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation arrows — hidden until hover on large screens */}
      <div className="relative justify-center items-center mt-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
        <button className="custom-prev p-2 sm:p-3 rounded-xl border border-green-800 bg-white/70 hover:bg-green-800 hover:text-white transition shadow-md">
          <ChevronLeftIcon size={15} className="w-5 h-5" />
        </button>
        <button className="custom-next p-2 sm:p-3 rounded-xl border border-green-800 bg-white/70 hover:bg-green-800 hover:text-white transition shadow-md">
          <ChevronRightIcon size={15} className="w-5 h-5" />
        </button>
      </div>

      {/* Video Dialog */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-3xl relative">
            {/* Close button */}
            <button
              onClick={closeDialog}
              className="absolute top-3 right-3 text-white bg-black/70 rounded-full px-2 py-1 hover:bg-black"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
