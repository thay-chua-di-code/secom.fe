import { useRef } from "react";
import "./style.scss";
import bannerSide from "../../assets/images/seller-background.png";
import Button from "../../components/common/Button/Button";
import SellerRegistration from "./Form";
import useReveal from "../../hooks/useReveal";

const RegisterSeller = () => {
  const formRef = useRef(null);

  const heroReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  const imageReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  const featuresReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
  });

  const formReveal = useReveal({
    threshold: 0.08,
    rootMargin: "0px 0px -60px 0px",
    once: false,
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
            SELL ON SECOM
          </div>

          <h1>
            Turn your products
            <br />
            into <span>opportunities.</span>
          </h1>

          <p className="seller-banner__description">
            Join Secom and connect your products with customers who are looking
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
                <p>Reach shoppers across Secom</p>
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
                SECOM MARKETPLACE
              </span>

              <span className="seller-banner__image-status">
                <span />
                LIVE
              </span>
            </div>

            <div className="seller-banner__image">
              <img src={bannerSide} alt="Become a seller on Secom" />
            </div>

            <div className="seller-banner__image-bottom">
              <div>
                <span>Grow your store</span>
                <strong>with Secom</strong>
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
          FORM
      ===================================================== */}
      <section
        ref={(node) => {
          formRef.current = node;
          formReveal.ref.current = node;
        }}
        className={`seller-registration-wrapper ${
          formReveal.visible ? "is-visible" : ""
        }`}
      >
        <div className="seller-registration-wrapper__inner">
          <div className="seller-registration-wrapper__heading">
            <span>SELLER REGISTRATION</span>

            <h2>
              Start building your
              <br />
              <strong>Secom store.</strong>
            </h2>

            <p>
              Complete the registration form below and start selling your
              products on Secom.
            </p>
          </div>

          <SellerRegistration />
        </div>
      </section>
    </div>
  );
};

export default RegisterSeller;
