import { Link } from "react-router-dom";
import banner from "../../../assets/images/SideImage.png";
import logo from "../../../assets/icons/favicon-aidr.svg";

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
  visualTitle = "Shop smarter with AI",
  visualDescription = "Discover products, compare options and manage your retail journey with the same modern AIDR experience.",
  visualBadge = "AI DRIVEN RETAIL",
  visualImage = banner,
}) {
  return (
    <section className="auth-ui">
      <div className="auth-ui__frame">
        <aside className="auth-ui__visual" aria-hidden="true">
          <div className="auth-ui__visual-overlay" />
          <div className="auth-ui__visual-content">
            <span className="auth-ui__visual-badge">{visualBadge}</span>
            <h2>{visualTitle}</h2>
            <p>{visualDescription}</p>
          </div>

          <div className="auth-ui__visual-media">
            <img src={visualImage} alt="" />
          </div>
        </aside>

        <div className="auth-ui__panel">
          <Link to="/" className="auth-ui__brand" aria-label="Go to AIDR home page">
            <span className="auth-ui__brand-mark">
              <img src={logo} alt="AIDR" />
            </span>
            <span className="auth-ui__brand-copy">
              <strong>AIDR</strong>
              <span>AI DRIVEN RETAIL</span>
            </span>
          </Link>

          <div className="auth-ui__card">
            <div className="auth-ui__header">
              {eyebrow ? <span className="auth-ui__eyebrow">{eyebrow}</span> : null}
              <h1>{title}</h1>
              {subtitle ? <p>{subtitle}</p> : null}
            </div>

            {children}

            {footer ? <div className="auth-ui__footer">{footer}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
