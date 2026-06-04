import Card from "../Card";
import Title from "../../../../components/common/Title";
import { useSelector } from "react-redux";
import { PackageSearch } from "lucide-react";

import "./style.scss";

export default function FeatureProducts() {
  const { featuredProducts, loading } = useSelector((state) => state.home);

  if (loading) {
    return (
      <section className="featured-products">
        <Title title="Feature Product" />

        <div className="featured-products__empty">
          <p>Loading products...</p>
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
        <button>View All Products</button>
      </div>
    </section>
  );
}
