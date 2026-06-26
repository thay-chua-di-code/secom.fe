import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminSellers } from "../../../redux/slice/admin/seller/thunk";

import "./style.scss";

const SellerManage = () => {
  const dispatch = useDispatch();

  const { sellers, loading, pageNumber, pageSize, totalPages } = useSelector(
    (state) => state.sellersAdmin,
  );

  useEffect(() => {
    dispatch(
      fetchAdminSellers({
        pageNumber,
        pageSize,
      }),
    );
  }, [dispatch, pageNumber, pageSize]);

  return (
    <div className="seller-manage">
      <div className="seller-manage__header">
        <div>
          <h1>Seller Management</h1>
          <p>Manage seller registrations and approvals.</p>
        </div>

        <button>
          Pending {sellers.filter((x) => x.status === "PENDING").length}
        </button>
      </div>

      <div className="seller-manage__toolbar">
        <input type="text" placeholder="Search seller..." />

        <select>
          <option>All Status</option>
          <option>PENDING</option>
          <option>APPROVED</option>
          <option>REJECTED</option>
        </select>
      </div>

      <div className="seller-manage__table">
        <table>
          <thead>
            <tr>
              <th>Seller</th>
              <th>Email</th>
              <th>Status</th>
              <th>Applied</th>
              <th width={180}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              sellers.map((seller) => (
                <tr key={seller.id}>
                  <td>
                    <div className="seller-info">
                      <img
                        src={seller.avatar || "https://i.pravatar.cc/100"}
                        alt=""
                      />

                      <div>
                        <h4>{seller.shopName}</h4>
                        <span>{seller.ownerName}</span>
                      </div>
                    </div>
                  </td>

                  <td>{seller.email}</td>

                  <td>
                    <span className={`status ${seller.status.toLowerCase()}`}>
                      {seller.status}
                    </span>
                  </td>

                  <td>{seller.createdAt}</td>

                  <td>
                    <div className="actions">
                      <button className="detail">Detail</button>

                      {seller.status === "PENDING" && (
                        <>
                          <button className="approve">Approve</button>

                          <button className="reject">Reject</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && sellers.length === 0 && (
          <div className="empty">No seller applications.</div>
        )}
      </div>
    </div>
  );
};

export default SellerManage;
