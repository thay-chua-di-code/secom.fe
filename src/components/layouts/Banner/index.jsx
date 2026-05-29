import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useSelector } from "react-redux";

import "./styles.scss";

const Banner = () => {
  const { banners } = useSelector((state) => state.home);

  const [currentSlide, setCurrentSlide] = useState(0);

 
  const bannerImages =
    banners?.length > 0
      ? banners
      : [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        ];

  useEffect(() => {
    if (!bannerImages.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // prev
  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1,
    );
  };

  // next
  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1,
    );
  };

  // dots
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="banner">
      <div className="banner__container">
        {/* Images */}
        <div className="banner__slides">
          {bannerImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className={`banner__image ${
                index === currentSlide ? "active" : ""
              }`}
            />
          ))}
        </div>

        {/* Overlay */}
        <div className="banner__overlay" />

        {/* Previous */}
        <button
          className="banner__btn banner__btn--prev"
          onClick={goToPrevious}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next */}
        <button className="banner__btn banner__btn--next" onClick={goToNext}>
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="banner__dots">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`banner__dot ${
                currentSlide === index ? "active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
