import { Link } from "react-router-dom";
import "./style.scss";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__content">
        <h1 className="notfound__code">404</h1>

        <h2 className="notfound__title">Page not found</h2>

        <p className="notfound__desc">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="notfound__btn">
          Go Home
        </Link>
      </div>
    </div>
  );
}
