import React from "react";
import {
  BadgeCheck,
  Headphones,
  RefreshCcw,
  ShieldCheck,
  Truck,
  WalletCards,
} from "lucide-react";

import "./style.scss";

const policies = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable delivery for eligible orders.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Friendly support whenever you need assistance.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Simple return process for eligible products.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your payments and personal information stay protected.",
  },
  {
    icon: WalletCards,
    title: "Flexible Payment",
    description: "Convenient payment options for a smoother checkout.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Products",
    description: "Discover products from verified marketplace sellers.",
  },
];

const Policy = () => {
  /*
    Nhân đôi array để marquee chạy liên tục
    mà không bị khoảng trắng ở cuối.
  */
  const marqueeItems = [...policies, ...policies];

  return (
    <section className="policy-section">
      <div className="policy-section__heading">
        <span>SHOP WITH CONFIDENCE</span>

        <h2>Everything you need for a better shopping experience</h2>
      </div>

      <div className="policy-marquee">
        <div className="policy-marquee__fade policy-marquee__fade--left" />
        <div className="policy-marquee__fade policy-marquee__fade--right" />

        <div className="policy-marquee__track">
          {marqueeItems.map((policy, index) => {
            const Icon = policy.icon;

            return (
              <article key={`${policy.title}-${index}`} className="policy-card">
                <div className="policy-card__icon">
                  <Icon size={21} />
                </div>

                <div className="policy-card__content">
                  <h3>{policy.title}</h3>

                  <p>{policy.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Policy;
