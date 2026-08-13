import Card from "../Card";
import Title from "../../../../components/common/Title";
import { useSelector } from "react-redux";
import { ArrowUpRight, PackageSearch } from "lucide-react";
import "./style.scss";
import { Link } from "react-router-dom";

export default function FeatureProducts() {
  const { loading, error } = useSelector((state) => state.home);

  const featuredProducts = useSelector((state) => {
    const items =
      state.home.featuredProducts?.items ?? state.home.featuredProducts;

    return Array.isArray(items) ? items : [];
  });

  if (loading) {
    return (
      <section className="featured-products">
        <Title eyebrow="OUR PRODUCTS" title="Explore Our Products" />

        <div className="featured-products__empty">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-products">
        <Title eyebrow="OUR PRODUCTS" title="Explore Our Products" />

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
        <Title eyebrow="OUR PRODUCTS" title="Explore Our Products" />

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
      <Title eyebrow="OUR PRODUCTS" title="Explore Our Products" />

      <div className="featured-products__grid">
        {featuredProducts.map((product, index) => (
          <Card
            key={product.id || product.productId}
            product={product}
            index={index}
          />
        ))}
      </div>

      <div className="featured-products__footer">
        <Link to="/products">
          <span>View All Products</span>
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
