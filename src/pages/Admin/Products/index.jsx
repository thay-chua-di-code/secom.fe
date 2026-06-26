import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import { fetchProducts } from "../../../redux/slice/admin/products/productAdminSlice";

const Products = () => {
  const dispatch = useDispatch();

  const { products, pagination, loading, error } = useSelector(
    (state) => state.productsAdmin,
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchProducts({
        pageNumber: page,
        pageSize: 10,
        keyword: search,
        status,
      }),
    );
  }, [dispatch, page, search, status]);

  if (loading) {
    return <div className="admin-products">Loading...</div>;
  }

  if (error) {
    return <div className="admin-products">{error}</div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-products__header">
        <div>
          <h1>Product Management</h1>
          <p>Manage products on Secom platform</p>
        </div>

        <Button className="add-btn">
          + Add Product
        </Button>
      </div>

      <div className="admin-products__filter">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th width="220">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    #{product.id.slice(0, 8)}
                  </td>

                  <td>{product.name}</td>

                  <td>
                    {product.sellerName ??
                      product.seller?.fullName ??
                      "-"}
                  </td>

                  <td>
                    ₫{formatCurrencyVN(product.price)}
                  </td>

                  <td>
                    <span
                      className={`status status--${product.status?.toLowerCase()}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <Button className="view-btn">
                        View
                      </Button>

                      <Button className="approve-btn">
                        Approve
                      </Button>

                      <Button className="reject-btn">
                        Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span>
          {pagination.pageNumber} / {pagination.totalPages}
        </span>

        <Button
          disabled={page >= pagination.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Products;