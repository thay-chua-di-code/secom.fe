import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import video from "../../../assets/video/hero-video.mp4";

import "./style.scss";

export default function HomeHero() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateScroll = () => {
      const shrinkDistance = 420;

      const nextProgress = Math.min(
        Math.max(window.scrollY / shrinkDistance, 0),
        1,
      );

      setProgress(nextProgress);

      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    updateScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const heroInset = progress * 64;
  const heroRadius = 24 * Math.min(progress, 0.85);
  const heroTopSpace = 0;
  const heroBottomSpace = progress * 12;

  return (
    <section
      className="home-hero-stage"
      style={{
        "--hero-progress": progress,
        "--hero-inset": `${Math.min(heroInset, 24)}px`,
        "--hero-radius": `${heroRadius}px`,
        "--hero-top-space": `${heroTopSpace}px`,
        "--hero-bottom-space": `${heroBottomSpace}px`,
      }}
    >
      <div className="home-hero">
        <video
          className="home-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="home-hero__overlay" />
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">AIDR INTELLIGENCE</span>

          <h1 className="home-hero__title">
            Experience the future of
            <br />
            shopping with AIDR
          </h1>

          <p className="home-hero__description">
            Discover smarter shopping, intelligent recommendations, and new
            opportunities powered by AI.
          </p>

          <Link to="/products" className="home-hero__button">
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
