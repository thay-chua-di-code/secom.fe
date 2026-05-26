import React, { useState, useEffect } from "react";

import "./styles.scss";

const Banner = ({ images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="w-full relative">
      <div className="relative w-full h-56 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden rounded-2xl">
        {/* SLIDES */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-600 ease-in-out ${
                index === currentSlide ? "opacity-100 visibility-visible z-20" : "opacity-0 visibility-hidden z-10"
              }`}
            />
          ))}
        </div>

        {/* Previous Button */}
        <button
          className="absolute top-1/2 left-4 z-30 w-12 h-12 rounded-full bg-black/35 hover:bg-black/55 text-white text-2xl transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm flex items-center justify-center"
          onClick={goToPrevious}
          aria-label="Previous Slide"
        >
          &#10094;
        </button>

        {/* Next Button */}
        <button
          className="absolute top-1/2 right-4 z-30 w-12 h-12 rounded-full bg-black/35 hover:bg-black/55 text-white text-2xl transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-sm flex items-center justify-center"
          onClick={goToNext}
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        {/* <div className="banner-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
