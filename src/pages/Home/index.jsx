/* eslint-disable react-hooks/refs */
import { LockKeyhole, LogIn, Search, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../../components/layouts/Header";
import HomeHero from "./HomeHero";
import CategorySidebar from "./CategoriesSideBar";
import RecentlyViewed from "./Product-viewed";
import FeatureProducts from "./Products/FeatureProducts";
import LastestProduct from "./Products/LatestProducts";
import Policy from "./Policy";
import HomeAbout from "./About";
import SectionDivider from "../../components/layouts/SectionDivider";

import { fetchHomepage } from "../../redux/slice/homeSlice";

import useCompare from "../../hooks/useCompare";
import useReveal from "../../hooks/useReveal";
import { ROUTES } from "../../constants/routes";

import "./style.scss";

const guestPreviewCards = [
  {
    title: "Saved product trail",
    caption: "Reopen items you explored across sessions.",
  },
  {
    title: "Faster comparison",
    caption: "Jump back into shortlisted products instantly.",
  },
  {
    title: "Smarter follow-up",
    caption: "Let AIDR learn what catches your eye.",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { compareIds } = useCompare();

  const discoveryReveal = useReveal({
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  const featuredReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -70px 0px",
    once: false,
  });

  const latestReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -70px 0px",
    once: false,
  });

  const policyReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch]);

  return (
    <div className="home-page">
      <Header />

      <section className="home-page__hero">
        <HomeHero />
      </section>

      <div className="home-page__content" style={{ padding: "0 10px" }}>
        <section
          ref={discoveryReveal.ref}
          className={`home-discovery reveal-section ${
            discoveryReveal.visible ? "is-visible" : ""
          }`}
        >
          <div className="home-discovery__heading">
            <span className="home-discovery__eyebrow">DISCOVER</span>

            <h2>
              Smarter shopping,
              <br />
              built around you
            </h2>

            <p>
              Explore categories, discover AI-powered suggestions and continue
              where you left off.
            </p>
          </div>

          <div className="home-discovery__grid">
            <div className="home-discovery__card home-discovery__card--ai">
              <CategorySidebar />
            </div>

            <div className="home-discovery__card home-discovery__card--recent">
              {isAuthenticated ? (
                <RecentlyViewed />
              ) : (
                <div className="home-discovery__guest">
                  <div className="home-discovery__guest-head">
                    <span>RECENT ACTIVITY</span>
                    <div className="home-discovery__guest-badge">
                      <LockKeyhole size={14} />
                      Sign in to unlock
                    </div>
                  </div>

                  <div className="home-discovery__guest-copy">
                    <div className="home-discovery__guest-icon">
                      <Sparkles size={22} />
                    </div>
                    <h3>Your browsing history starts working for you</h3>
                    <p>
                      Log in to reopen recently viewed products, compare faster,
                      and continue shopping without losing momentum.
                    </p>
                  </div>

                  <div className="home-discovery__guest-actions">
                    <Link to={ROUTES.LOGIN} className="home-discovery__guest-cta">
                      <LogIn size={16} />
                      Log in
                    </Link>

                    <Link
                      to={ROUTES.PRODUCT.PRODUCTS}
                      className="home-discovery__guest-secondary"
                    >
                      <Search size={15} />
                      Browse products
                    </Link>
                  </div>

                  <div className="home-discovery__guest-preview">
                    {guestPreviewCards.map((item) => (
                      <article key={item.title} className="home-discovery__guest-preview-card">
                        <div className="home-discovery__guest-preview-lock">
                          <LockKeyhole size={14} />
                        </div>
                        <strong>{item.title}</strong>
                        <p>{item.caption}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          ref={featuredReveal.ref}
          className={`home-page__section reveal-section ${
            featuredReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />

          <FeatureProducts />
        </section>

        <section
          ref={latestReveal.ref}
          className={`home-page__section reveal-section ${
            latestReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />

          <LastestProduct />
        </section>

        <section
          ref={policyReveal.ref}
          className={`home-page__section reveal-section ${
            policyReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />
          <Policy />
        </section>

        <section className="home-page__section">
          <SectionDivider />
          <HomeAbout />
        </section>
      </div>

      {compareIds.length > 0 && (
        <Link to={ROUTES.COMPARE} className="home-compare-floating-btn">
          Compare ({compareIds.length})
        </Link>
      )}
    </div>
  );
};

export default Home;
