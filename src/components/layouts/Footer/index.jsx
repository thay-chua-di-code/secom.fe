import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* ========================================
            TOP
        ======================================== */}
        <div className="footer__top">
          {/* PRODUCTS */}
          <div className="footer__column">
            <h3 className="footer__title">Products</h3>

            <ul className="footer__links">
              <li>
                <Link to="/products">All products</Link>
              </li>

              <li>
                <Link to="/products">Featured products</Link>
              </li>

              <li>
                <Link to="/products">Latest products</Link>
              </li>

              <li>
                <Link to="/products">AI recommendations</Link>
              </li>

              <li>
                <Link to="/products">Compare products</Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="footer__column">
            <h3 className="footer__title">Company</h3>

            <ul className="footer__links">
              <li>
                <Link to="/">About us</Link>
              </li>

              <li>
                <Link to="/">Customers</Link>
              </li>

              <li>
                <Link to="/">Seller channel</Link>
              </li>

              <li>
                <Link to="/">Newsroom</Link>
              </li>

              <li>
                <Link to="/">Contact</Link>
              </li>
            </ul>
          </div>

          {/* SOLUTIONS */}
          <div className="footer__column">
            <h3 className="footer__title">Solutions</h3>

            <ul className="footer__links">
              <li>
                <Link to="/">For customers</Link>
              </li>

              <li>
                <Link to="/">For sellers</Link>
              </li>

              <li>
                <Link to="/">AI shopping</Link>
              </li>

              <li>
                <Link to="/">Smart discovery</Link>
              </li>
            </ul>
          </div>

          {/* SUBSCRIBE */}
          <div className="footer__newsletter">
            <h3 className="footer__newsletter-title">
              Sign up for email updates
            </h3>

            <p>Keep up with AIDR news, product updates and new features.</p>

            <form
              className="footer__subscribe"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email address"
                aria-label="Email address"
              />

              <button type="submit" aria-label="Subscribe">
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* ========================================
            BOTTOM
        ======================================== */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <span>© 2026 AIDR. All rights reserved.</span>

            <Link to="/">Privacy policy</Link>

            <Link to="/">Terms of use</Link>

            <Link to="/">Contact</Link>
          </div>

          <div className="footer__social">
            <a
              href="/"
              aria-label="Facebook"
              onClick={(e) => e.preventDefault()}
            >
              <FaFacebookF />
            </a>

            <a href="/" aria-label="X" onClick={(e) => e.preventDefault()}>
              <FaXTwitter />
            </a>

            <a
              href="/"
              aria-label="Instagram"
              onClick={(e) => e.preventDefault()}
            >
              <FaInstagram />
            </a>

            <a
              href="/"
              aria-label="LinkedIn"
              onClick={(e) => e.preventDefault()}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
