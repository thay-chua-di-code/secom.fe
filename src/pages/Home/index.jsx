import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

const Home = () => {
  const dispatch = useDispatch();

  /* =========================================
     REDUX
  ========================================= */

  const { isAuthenticated } = useSelector((state) => state.auth);

  /* =========================================
     COMPARE
  ========================================= */

  const { compareIds } = useCompare();

  /* =========================================
     REVEAL ANIMATIONS
  ========================================= */

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

  /* =========================================
     FETCH HOMEPAGE
  ========================================= */

  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch]);

  return (
    <div className="home-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-page__hero">
        <HomeHero />
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="home-page__content" style={{ padding: "0 10px" }}>
        {/* =================================================
            DISCOVERY
        ================================================= */}

        <section
          ref={discoveryReveal.ref}
          className={`home-discovery reveal-section ${
            discoveryReveal.visible ? "is-visible" : ""
          }`}
        >
          {/* TITLE */}

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

          {/* DISCOVERY PANEL */}

          <div className="home-discovery__grid">
            {/* LEFT - AI SUGGESTIONS */}
            <div className="home-discovery__card home-discovery__card--ai">
              <CategorySidebar />
            </div>

            {/* RIGHT - RECENTLY VIEWED */}
            <div className="home-discovery__card home-discovery__card--recent">
              {isAuthenticated ? (
                <RecentlyViewed />
              ) : (
                <div className="home-discovery__guest">
                  <span>RECENT ACTIVITY</span>

                  <h3>Your browsing history lives here</h3>

                  <p>
                    Sign in to continue from products you previously viewed.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            FEATURED PRODUCTS
        ================================================= */}

        <section
          ref={featuredReveal.ref}
          className={`home-page__section reveal-section ${
            featuredReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />

          <FeatureProducts />
        </section>

        {/* =================================================
            LATEST PRODUCTS
        ================================================= */}

        <section
          ref={latestReveal.ref}
          className={`home-page__section reveal-section ${
            latestReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />

          <LastestProduct />
        </section>

        {/* =================================================
    ABOUT SECOM
================================================= */}

        <section className="home-page__section">
          <SectionDivider />

          <HomeAbout />
        </section>

        {/* =================================================
            POLICY
        ================================================= */}

        <section
          ref={policyReveal.ref}
          className={`home-page__policy reveal-section ${
            policyReveal.visible ? "is-visible" : ""
          }`}
        >
          <SectionDivider />

          <Policy />
        </section>
      </div>

      {/* =====================================================
          FLOATING COMPARE BUTTON
      ===================================================== */}

      {compareIds.length > 0 && (
        <Link
          to={ROUTES.COMPARE}
          className="home-compare-floating-btn"
        >
          View Compare ({compareIds.length})
        </Link>
      )}
    </div>
  );
};

export default Home;
