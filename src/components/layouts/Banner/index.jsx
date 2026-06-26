import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import "./styles.scss";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners } = useSelector((state) => state.home);
  const { categories } = useSelector((state) => state.categories);
  const bannerImages =
    banners?.length > 0
      ? banners
      : [
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero__categories">
        {categories.map((item) => (
          <div key={item.id} className="hero__category">
            {item.name}
          </div>
        ))}
      </div>

      <div className="hero__banner">
        <div className="hero__content">
          <span className="hero__subtitle">
            {bannerImages[currentSlide].title}
          </span>

          <h2>{bannerImages[currentSlide].heading}</h2>

          <button>
            Shop Now
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="hero__image">
          <img src={bannerImages[currentSlide].image} alt="" />
        </div>

        <div className="hero__dots">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={currentSlide === index ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
