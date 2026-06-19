import React, { useState } from "react";
import "./style.scss";
import Button from "../../../components/common/Button/Button";
import { mockProductsAdmin } from "../../../utils/temporary";
import { formatCurrencyVN } from "../../../utils/fncUtils";
const Products = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="admin-products">
      <div className="admin-products__header">
        <div>
          <h1>Product Management</h1>
          <p>Manage products on Secom platform</p>
        </div>

        <Button className="add-btn">+ Add Product</Button>
      </div>

      <div className="admin-products__filter">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select>
          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
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
              <th>Stock</th>
              <th>Status</th>
              <th width="220">Actions</th>
            </tr>
          </thead>

          <tbody>
            {mockProductsAdmin.map((product) => (
              <tr key={product.id}>
                <td>#{product.id}</td>

                <td>{product.name}</td>

                <td>{product.seller}</td>

                <td>₫{formatCurrencyVN(product.price)}</td>

                <td>{product.stock}</td>

                <td>
                  <span
                    className={`status status--${product.status.toLowerCase()}`}
                  >
                    {product.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <Button className="view-btn">View</Button>

                    <Button className="approve-btn">Approve</Button>

                    <Button className="reject-btn">Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
