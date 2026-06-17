import { useRef, useState } from "react";
import "./style.scss";
import bannerSide from "../../assets/images/seller-background.png";
import Button from "../../components/common/Button/Button";
import SellerRegistration from "./Form";

const RegisterSeller = () => {
  const formRef = useRef(null);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="register-seller-container">
      <section className="seller-banner">
        <div className="seller-banner__content">
          <span className="seller-banner__badge">Start Selling with Secom</span>

          <h1>
            Become a <span>Seller</span> on Secom
          </h1>

          <p>
            Reach thousands of customers every day, build your own brand, and
            grow your business on the Secom marketplace platform.
          </p>

          <div className="seller-banner__actions">
            <Button className="btn-primary" onClick={handleScrollToForm}>
              Get Started
            </Button>

            <Button className="btn-outline">Learn More</Button>
          </div>
        </div>

        <div className="seller-banner__image">
          <img src={bannerSide} alt="this is a banner picture" />
        </div>
      </section>

      <div ref={formRef}>
        <SellerRegistration />
      </div>
    </div>
  );
};

export default RegisterSeller;
