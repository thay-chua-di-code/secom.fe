import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.avif";
import banner3 from "../../../assets/images/banner3.avif";

const fallbackBanners = [
  {
    id: "fallback-banner-1",
    title: "SECOM Marketplace",
    heading: "Trusted second-hand products in one place",
    image: banner1,
  },
  {
    id: "fallback-banner-2",
    title: "Quality & affordability",
    heading: "Discover curated deals from active sellers",
    image: banner2,
  },
  {
    id: "fallback-banner-3",
    title: "Shop with confidence",
    heading: "Browse categories and find the right match faster",
    image: banner3,
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { banners } = useSelector((state) => state.home);
  const { categories } = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const handleSelectedCategory = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };
  const bannerImages =
    banners?.length > 0
      ? banners
      : fallbackBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <section className="hero">
      <div className="hero__categories">
        {categories.map((item) => (
          <div
            key={item.id}
            className="hero__category"
            onClick={() => handleSelectedCategory(item.id)}
          >
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
          {bannerImages?.map((_, index) => (
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
