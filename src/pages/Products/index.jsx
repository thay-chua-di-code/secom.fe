import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import { mockProducts } from "../../utils/temporary";

import "./style.scss";

export default function ProductsPage() {
  return (
    <div className="products-page">
      <div className="container">
        <div className="products-layout">
          <aside className="products-sidebar">
            <Filter />
          </aside>

          <main className="products-content">
            <div className="products-header">
              <h2>All Products</h2>
              <span>{mockProducts.length} products</span>
            </div>

            <div className="products-grid">
              {mockProducts.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
