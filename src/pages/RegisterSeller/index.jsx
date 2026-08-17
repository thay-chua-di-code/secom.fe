import { useRef } from "react";
import "./style.scss";
import bannerSide from "../../assets/images/seller-background.png";
import Button from "../../components/common/Button/Button";
import SellerRegistration from "./Form";
import useReveal from "../../hooks/useReveal";

const RegisterSeller = () => {
  const formRef = useRef(null);

  // Chỉ dùng reveal cho HERO.
  // Registration form KHÔNG phụ thuộc reveal nữa.
  const heroReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: true,
  });

  const imageReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: true,
  });

  const featuresReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: true,
  });

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="register-seller-container">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="seller-banner">
        <div
          ref={heroReveal.ref}
          className={`seller-banner__content seller-banner__reveal ${
            heroReveal.visible ? "is-visible" : ""
          }`}
        >
          <div className="seller-banner__eyebrow">
            <span className="seller-banner__eyebrow-dot" />
            SELL ON AIDR
          </div>

          <h1>
            Turn your products
            <br />
            into <span>opportunities.</span>
          </h1>

          <p className="seller-banner__description">
            Join AIDR and connect your products with customers who are looking
            for quality electronics. Build your store, grow your brand, and sell
            with confidence.
          </p>

          <div className="seller-banner__actions">
            <Button
              className="seller-banner__btn seller-banner__btn--primary"
              onClick={handleScrollToForm}
            >
              Start Selling
              <span>→</span>
            </Button>

            <Button
              className="seller-banner__btn seller-banner__btn--secondary"
              onClick={handleScrollToForm}
            >
              Learn More
            </Button>
          </div>

          {/* =================================================
              FEATURES
          ================================================= */}
          <div
            ref={featuresReveal.ref}
            className={`seller-banner__features seller-banner__features-reveal ${
              featuresReveal.visible ? "is-visible" : ""
            }`}
          >
            <div className="seller-feature">
              <div className="seller-feature__icon">
                <span>✓</span>
              </div>

              <div>
                <strong>Easy onboarding</strong>
                <p>Get your store ready quickly</p>
              </div>
            </div>

            <div className="seller-feature">
              <div className="seller-feature__icon">
                <span>✓</span>
              </div>

              <div>
                <strong>Secure payments</strong>
                <p>Reliable payment processing</p>
              </div>
            </div>

            <div className="seller-feature">
              <div className="seller-feature__icon">
                <span>✓</span>
              </div>

              <div>
                <strong>More customers</strong>
                <p>Reach shoppers across AIDR</p>
              </div>
            </div>

            <div className="seller-feature">
              <div className="seller-feature__icon">
                <span>✓</span>
              </div>

              <div>
                <strong>Seller support</strong>
                <p>Support when you need it</p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            IMAGE
        ===================================================== */}
        <div
          ref={imageReveal.ref}
          className={`seller-banner__visual seller-banner__reveal seller-banner__reveal--image ${
            imageReveal.visible ? "is-visible" : ""
          }`}
        >
          <div className="seller-banner__visual-glow" />

          <div className="seller-banner__image-card">
            <div className="seller-banner__image-top">
              <span className="seller-banner__image-label">
                AIDR MARKETPLACE
              </span>

              <span className="seller-banner__image-status">
                <span />
                LIVE
              </span>
            </div>

            <div className="seller-banner__image">
              <img src={bannerSide} alt="Become a seller on AIDR" />
            </div>

            <div className="seller-banner__image-bottom">
              <div>
                <span>Grow your store</span>
                <strong>with AIDR</strong>
              </div>

              <div className="seller-banner__arrow">↗</div>
            </div>
          </div>

          <div className="seller-floating-card seller-floating-card--top">
            <span className="seller-floating-card__icon">✓</span>

            <div>
              <strong>Trusted marketplace</strong>
              <span>Secure & reliable</span>
            </div>
          </div>

          <div className="seller-floating-card seller-floating-card--bottom">
            <strong>∞</strong>

            <div>
              <span>Potential customers</span>
              <small>Ready to discover your products</small>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SELLER REGISTRATION
          
          QUAN TRỌNG:
          Không dùng useReveal ở section này nữa.
          Form luôn visible.
      ===================================================== */}
      <section
        ref={formRef}
        id="seller-registration"
        className="seller-registration-wrapper"
      >
        <div className="seller-registration-wrapper__inner">
          {/* =================================================
              HEADING
          ================================================= */}
          <div className="seller-registration-wrapper__heading">
            <div className="seller-registration-wrapper__badge">
              <span />
              SELLER REGISTRATION
            </div>

            <h2>
              Build your store on
              <strong> AIDR.</strong>
            </h2>

            <p>
              Tell us a little about your business. After submitting your
              application, our team will review your information before
              activating seller features.
            </p>
          </div>

          {/* =================================================
              REGISTRATION CONTENT
          ================================================= */}
          <div className="seller-registration-content">
            {/* LEFT */}
            <div className="seller-registration-content__aside">
              <span className="seller-registration-content__step">
                APPLICATION
              </span>

              <h3>You're one step away from becoming a AIDR seller.</h3>

              <p>
                Provide accurate store information and a verification document
                to help us review your seller application.
              </p>

              <div className="seller-registration-benefits">
                <div>
                  <span>01</span>

                  <section>
                    <strong>Store information</strong>

                    <p>Tell us about your shop and contact information.</p>
                  </section>
                </div>

                <div>
                  <span>02</span>

                  <section>
                    <strong>Verification</strong>

                    <p>Upload a document for seller verification.</p>
                  </section>
                </div>

                <div>
                  <span>03</span>

                  <section>
                    <strong>Admin review</strong>

                    <p>Your application will be reviewed before approval.</p>
                  </section>
                </div>
              </div>

              <div className="seller-registration-security">
                <span>✓</span>

                <p>
                  Your information is only used for seller verification and
                  account management.
                </p>
              </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="seller-registration-content__form">
              <SellerRegistration />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterSeller;
