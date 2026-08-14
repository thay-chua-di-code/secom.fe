import { Link } from "react-router-dom";
import "./style.scss";

const PAGE_CONTENT = {
  about: {
    eyebrow: "ABOUT SECOM",
    title: "A commerce experience built around clarity and trust.",
    body: [
      "SECOM combines trusted seller storefronts, discovery tools and streamlined checkout into one marketplace flow.",
      "The platform keeps buyer journeys simple while giving sellers strong merchandising, inventory and order management capabilities.",
    ],
  },
  contact: {
    eyebrow: "CONTACT",
    title: "Reach the SECOM team.",
    body: [
      "For product support, seller onboarding and account issues, contact the operations team through support@secom.local.",
      "Business partnerships and marketplace operations can be coordinated during working hours from Monday to Friday.",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Answers to common buyer and seller questions.",
    body: [
      "Buyers can browse products publicly, compare details and review seller information before purchase.",
      "Sellers can manage products, inventory, vouchers, returns and wallet flows from the seller center after approval.",
    ],
  },
  privacy: {
    eyebrow: "PRIVACY POLICY",
    title: "Privacy commitments for marketplace usage.",
    body: [
      "SECOM stores only the data required to operate accounts, orders, notifications and seller workflows.",
      "Access to protected features follows role-based authorization for buyers, sellers and administrators.",
    ],
  },
  terms: {
    eyebrow: "TERMS OF USE",
    title: "Marketplace usage standards.",
    body: [
      "Products must follow marketplace moderation rules and seller ownership requirements.",
      "Users are expected to provide accurate information when placing orders, registering shops and managing products.",
    ],
  },
};

export default function StaticPage({ variant = "about" }) {
  const content = PAGE_CONTENT[variant] ?? PAGE_CONTENT.about;

  return (
    <section className="static-page">
      <div className="static-page__panel">
        <span className="static-page__eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        {content.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="static-page__actions">
          <Link to="/products">Explore products</Link>
          <Link to="/seller-register">Become a seller</Link>
        </div>
      </div>
    </section>
  );
}
