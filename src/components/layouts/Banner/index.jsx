import React, { useState, useEffect } from "react";
import "./styles.scss";

const Banner = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!images || images.length === 0) {
    return <div className="banner">No images available</div>;
  }

  return (
    <div className="banner-container">
      <div className="banner-wrapper">
        {/* Slides */}
        <div className="banner-slides">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className={`banner-slide ${
                index === currentSlide ? "active" : ""
              }`}
            />
          ))}
        </div>

        <button
          className="banner-control banner-prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button
          className="banner-control banner-next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Banner;
