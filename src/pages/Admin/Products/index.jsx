import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { fetchProducts } from "../../../redux/slice/admin/products/productAdminSlice";
import { Package, Search, Eye, Pencil, Check, X } from "lucide-react";

const Products = () => {
  const dispatch = useDispatch();

  const { products, pagination, loading, error } = useSelector(
    (state) => state.productsAdmin,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  // ========================================
  // FETCH PRODUCTS
  // ========================================

  useEffect(() => {
    dispatch(
      fetchProducts({
        pageNumber: 1,
        pageSize: 1000,
      }),
    );
  }, [dispatch]);

  // ========================================
  // SEARCH + FILTER ON FRONTEND
  // ========================================

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products?.filter((product) => {
      const matchesSearch =
        !keyword ||
        product.name?.toLowerCase().includes(keyword) ||
        product.categoryName?.toLowerCase().includes(keyword) ||
        product.sellerFullName?.toLowerCase().includes(keyword);

      const matchesStatus =
        !status || product.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [products, search, status]);

  // ========================================
  // SEARCH
  // ========================================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ========================================
  // STATUS
  // ========================================

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  // ========================================
  // PAGINATION FRONTEND
  // ========================================

  const pageSize = 10;

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="admin-products">
        <div className="products-state">Loading products...</div>
      </div>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <div className="admin-products">
        <div className="products-state products-state--error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-products">
      {/* HEADER */}
      <div className="admin-products__header">
        <div>
          <h1>Products</h1>

          <p>{filteredProducts.length} listings</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="admin-products__filter">
        {/* SEARCH */}
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        {/* STATUS */}
        <select value={status} onChange={handleStatusChange}>
          <option value="">All Status</option>

          <option value="PENDING">Pending</option>

          <option value="APPROVED">Approved</option>

          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th width="160">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product.id}>
                  {/* PRODUCT */}
                  <td>
                    <div className="product-info">
                      <div className="icon">
                        <Package size={18} />
                      </div>

                      <span>{product.name}</span>
                    </div>
                  </td>

                  {/* CATEGORY */}
                  <td>{product.categoryName || "-"}</td>

                  {/* SELLER */}
                  <td>{product.sellerFullName || "-"}</td>

                  {/* PRICE */}
                  <td>₫{formatCurrencyVN(product.price)}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`status status--${product.status?.toLowerCase()}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td>
                    <div className="action-buttons">
                      <Button
                        className="action-btn view-btn"
                        title="View product"
                      >
                        <Eye size={17} />
                      </Button>

                      <Button
                        className="action-btn edit-btn"
                        title="Edit product"
                      >
                        <Pencil size={17} />
                      </Button>

                      <Button
                        className="action-btn approve-btn"
                        title="Approve product"
                      >
                        <Check size={17} />
                      </Button>

                      <Button
                        className="action-btn reject-btn"
                        title="Reject product"
                      >
                        <X size={17} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span>
          {totalPages === 0 ? 0 : page}
          {" / "}
          {totalPages || 1}
        </span>

        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Products;
