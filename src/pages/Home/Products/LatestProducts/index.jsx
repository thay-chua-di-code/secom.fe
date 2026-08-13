import Title from "../../../../components/common/Title";
import Card from "../Card";
import { useSelector } from "react-redux";
import { ArrowUpRight, PackageSearch } from "lucide-react";
import "./style.scss";
import { Link } from "react-router-dom";

const LastestProduct = () => {
  const { loading, error } = useSelector((state) => state.home);

  const latestProducts = useSelector((state) => {
    const items = state.home.latestProducts?.items ?? state.home.latestProducts;

    return Array.isArray(items) ? items : [];
  });

  if (loading) {
    return (
      <section className="lastest-products">
        <Title eyebrow="LATEST PRODUCTS" title="Latest Product Searching" />

        <div className="lastest-products__empty">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="lastest-products">
        <Title eyebrow="LATEST PRODUCTS" title="Latest Product Searching" />

        <div className="lastest-products__empty">
          <PackageSearch size={72} />

          <h3>Load products failed</h3>

          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!latestProducts || latestProducts.length === 0) {
    return (
      <section className="lastest-products">
        <Title eyebrow="LATEST PRODUCTS" title="Latest Product Searching" />

        <div className="lastest-products__empty">
          <PackageSearch size={72} />

          <h3>No products found</h3>

          <p>
            Latest products are currently unavailable. Please check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="lastest-products">
      <Title eyebrow="LATEST PRODUCTS" title="Latest Product Searching" />

      <div className="lastest-products__grid">
        {latestProducts.map((product, index) => (
          <Card
            key={product.id || product.productId}
            product={product}
            index={index}
          />
        ))}
      </div>

      <div className="lastest-products__footer">
        <Link to="/products">
          <span>View All Products</span>

          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default LastestProduct;
