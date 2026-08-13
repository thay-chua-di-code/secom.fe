import {
  BrainCircuit,
  ShieldCheck,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import useReveal from "../../../hooks/useReveal";

import "./style.scss";

const features = [
  {
    id: "ai-shopping",
    icon: BrainCircuit,
    label: "AI SHOPPING",
    title: "Recommendations built around what you actually need",
    description:
      "Discover electronics through smarter suggestions based on products, categories and your shopping interests.",
  },
  {
    id: "compare",
    icon: SlidersHorizontal,
    label: "SMART COMPARE",
    title: "Compare products before making the final decision",
    description:
      "Put multiple devices side by side and quickly understand the differences that matter most.",
  },
  {
    id: "trusted-marketplace",
    icon: ShieldCheck,
    label: "TRUSTED MARKETPLACE",
    title: "Shop confidently from verified sellers",
    description:
      "Explore products, seller information, reviews and purchasing options in one transparent shopping experience.",
  },
];

export default function HomeAbout() {
  const reveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -70px 0px",
    once: false,
  });

  return (
    <section
      ref={reveal.ref}
      className={`home-about ${reveal.visible ? "is-visible" : ""}`}
    >
      {/* ================================================
          LEFT
      ================================================= */}

      <div className="home-about__intro">
        <span className="home-about__eyebrow">ABOUT SECOM</span>

        <h2>
          Electronics shopping,
          <br />
          made smarter.
        </h2>

        <p>
          SECOM brings products, sellers and intelligent shopping tools together
          in one modern marketplace.
        </p>

        <Link to="/products" className="home-about__discover">
          <span>Explore products</span>

          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* ================================================
          RIGHT
      ================================================= */}

      <div className="home-about__features">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.id}
              className="home-about__feature"
              style={{
                "--feature-delay": `${0.08 + index * 0.08}s`,
              }}
            >
              <div className="home-about__visual">
                <div className="home-about__visual-grid" />

                <div className="home-about__icon">
                  <Icon size={32} strokeWidth={1.4} />
                </div>

                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="home-about__feature-content">
                <span className="home-about__feature-label">
                  {feature.label}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
