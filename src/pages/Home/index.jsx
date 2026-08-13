import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeHero from "./HomeHero";
import CategorySidebar from "./CategoriesSideBar";
import RecentlyViewed from "./Product-viewed";
import FeatureProducts from "./Products/FeatureProducts";
import LastestProduct from "./Products/LatestProducts";
import Policy from "./Policy";

import SectionDivider from "../../components/layouts/SectionDivider";
import CompareModal from "../../components/common/CompareModal";

import { fetchHomepage } from "../../redux/slice/homeSlice";

import useCompare from "../../hooks/useCompare";
import useReveal from "../../hooks/useReveal";

import "./style.scss";

const Home = () => {
  const dispatch = useDispatch();

  /* =========================================
     REDUX
  ========================================= */

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { featuredProducts, latestProducts } = useSelector(
    (state) => state.home,
  );

  /* =========================================
     COMPARE
  ========================================= */

  const [openCompare, setOpenCompare] = useState(false);

  const { compareIds, remove, clear } = useCompare();

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

  /* =========================================
     MERGE PRODUCTS
  ========================================= */

  const homeProducts = useMemo(() => {
    const products = [...(featuredProducts || []), ...(latestProducts || [])];

    return products.filter(
      (product, index, allProducts) =>
        allProducts.findIndex(
          (item) =>
            String(item.id || item.productId) ===
            String(product.id || product.productId),
        ) === index,
    );
  }, [featuredProducts, latestProducts]);

  /* =========================================
     PRODUCTS SELECTED FOR COMPARE
  ========================================= */

  const compareProducts = useMemo(
    () =>
      homeProducts.filter((product) =>
        compareIds.includes(String(product.id || product.productId)),
      ),
    [compareIds, homeProducts],
  );

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
        <button
          type="button"
          className="home-compare-floating-btn"
          onClick={() => setOpenCompare(true)}
        >
          Compare ({compareIds.length})
        </button>
      )}

      {/* =====================================================
          COMPARE MODAL
      ===================================================== */}

      <CompareModal
        open={openCompare}
        products={compareProducts}
        onClose={() => setOpenCompare(false)}
        onRemove={remove}
        onClear={clear}
      />
    </div>
  );
};

export default Home;
