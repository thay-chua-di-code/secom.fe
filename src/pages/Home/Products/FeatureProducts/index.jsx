import Card from "../Card";
import Title from "../../../../components/common/Title";
import { useSelector } from "react-redux";
import { PackageSearch } from "lucide-react";
import "./style.scss";
import { Link } from "react-router-dom";

export default function FeatureProducts() {
  const { featuredProducts, loading, error } = useSelector(
    (state) => state.home,
  );

  if (loading) {
    return (
      <section className="featured-products">
        <Title title="Our Products" />

        <div className="featured-products__empty">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-products">
        <Title title="Our Products" />

        <div className="featured-products__empty">
          <PackageSearch size={72} />

          <h3>Load products failed</h3>

          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section className="featured-products">
        <Title title="Our Products" />

        <div className="featured-products__header">
          <h2>Explore Our Products</h2>
        </div>

        <div className="featured-products__empty">
          <PackageSearch size={72} />

          <h3>No products found</h3>

          <p>
            Featured products are currently unavailable. Please check back
            later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-products">
      <Title title="Our Products" />

      <div className="featured-products__header">
        <h2>Explore Our Products</h2>
      </div>

      <div className="featured-products__grid">
        {featuredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      <div className="featured-products__footer">
        <Link to={'/products'}>View All Products</Link>
      </div>
    </section>
  );
}
