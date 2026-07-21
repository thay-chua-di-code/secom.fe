import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProducts } from "../../../redux/slice/seller/product/thunk";
import Button from "../../../components/common/Button/Button";
import UpdateProductModal from "./FormUpdate";
import AddProductModal from "./FormAdd";
import { Plus, Pencil, Package, TrendingUp } from "lucide-react";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import "./style.scss";

const Products = () => {
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error } = useSelector(
    (state) => state.sellerProduct,
  );

  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setSelectedProduct(null);
    setOpenUpdate(false);
  };

  useEffect(() => {
    dispatch(
      fetchSellerProducts({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  if (loading) {
    return (
      <div className="seller-products__loading">
        <div className="loading-spinner" />
        <span>Loading products...</span>
      </div>
    );
  }

  return (
    <div className="seller-products">
      {/* HEADER */}
      <div className="seller-products__header">
        <div className="seller-products__heading">
          <div className="seller-products__icon">
            <Package size={24} />
          </div>

          <div>
            <h1>Product Management</h1>
            <p>Manage and monitor all products in your store</p>
          </div>
        </div>

        <Button className="add-product-btn" onClick={() => setOpenAdd(true)}>
          <Plus size={18} />
          Add Product
        </Button>
      </div>

      {/* STATS */}
      <div className="seller-products__stats">
        <div className="stat-card">
          <div className="stat-card__icon">
            <Package size={20} />
          </div>

          <div>
            <span>Total Products</span>
            <strong>{products?.length || 0}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon">
            <TrendingUp size={20} />
          </div>

          <div>
            <span>Active Products</span>
            <strong>
              {products?.filter((item) => item.isActive)?.length || 0}
            </strong>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="products-card">
        <div className="products-card__header">
          <div>
            <h2>Your Products</h2>
            <p>View and manage your product inventory</p>
          </div>

          <span className="products-count">
            {products?.length || 0} Products
          </span>
        </div>

        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className="action-column">Action</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <div className="product-avatar">
                        {item.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <strong>{item.name}</strong>
                        <span>ID: {item.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="category-badge">{item.categoryName}</span>
                  </td>

                  <td>
                    <strong className="product-price">
                      {formatCurrencyVN(item.price)}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        item.isActive ? "active" : "inactive"
                      }`}
                    >
                      <span className="status-dot" />
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="product-actions">
                      <button
                        type="button"
                        className="action-btn edit"
                        onClick={() => handleOpenUpdate(item)}
                      >
                        <Pencil size={18} />
                      </button>
                      {/* 
                      <button
                        type="button"
                        className="action-btn delete"
                        onClick={() => handleDeleteProduct(item.id)}
                      >
                        <Trash2 size={16} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}

              {products?.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <div className="empty-products">
                      <Package size={40} />
                      <h3>No products found</h3>
                      <p>Start by adding your first product.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {error && <div className="products-error">{error}</div>}

      {openAdd && (
        <AddProductModal open={openAdd} onClose={() => setOpenAdd(false)} />
      )}

      {openUpdate && selectedProduct && (
        <UpdateProductModal
          key={selectedProduct.id}
          open={openUpdate}
          product={selectedProduct}
          onClose={handleCloseUpdate}
        />
      )}
    </div>
  );
};

export default Products;
