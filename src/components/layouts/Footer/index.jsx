import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Send } from "lucide-react";

import "./style.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Exclusive */}
          <div>
            <h3 className="footer__title">Secom</h3>

            <h4 className="footer__subtitle">Subscribe</h4>

            <p className="footer__text">Get 10% off your first order</p>

            <div className="footer__subscribe">
              <input type="email" placeholder="Enter your email" />
              <button>
                <Send size={18} />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="footer__title">Support</h3>

            <ul className="footer__list">
              <li>Hai Chau, Da Nang, Vietnam</li>
              <li>secom@gmail.com</li>
              <li>+84905120975</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="footer__title">Account</h3>

            <ul className="footer__links">
              <li>
                <a href="/">My Account</a>
              </li>
              <li>
                <a href="/">Login / Register</a>
              </li>
              <li>
                <a href="/">Cart</a>
              </li>
              <li>
                <a href="/">Wishlist</a>
              </li>
              <li>
                <a href="/">Shop</a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="footer__title">Quick Link</h3>

            <ul className="footer__links">
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms Of Use</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="footer__title">Download App</h3>

            <p className="footer__small">Save $3 with App New User Only</p>

            <div className="footer__download">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=ShopeeClone"
                alt="QR"
              />

              <div className="footer__stores">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                />

                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                />
              </div>
            </div>

            <div className="footer__social">
              <a href="/">
                <FaFacebookF size={18} />
              </a>

              <a href="/">
                <FaTwitter size={18} />
              </a>

              <a href="/">
                <FaInstagram size={18} />
              </a>

              <a href="/">
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          © Copyright Secom 2026. All rights reserved
        </div>
      </div>
    </footer>
  );
}
