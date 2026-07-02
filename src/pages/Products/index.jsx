import Filter from "./Filter";
import Card from "../../components/common/Card/index";
import { mockProducts } from "../../utils/temporary";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProductsByCategory } from "../../redux/slice/productSlice";
import { useEffect } from "react";
export default function ProductsPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const { products, loading } = useSelector((state) => state.products);

  console.log("Prodcuts page:", products);
  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

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
