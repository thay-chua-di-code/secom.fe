import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminSellers } from "../../../redux/slice/admin/seller/thunk";

import "./style.scss";
import SellerDetailModal from "./Detail";

const SellerManage = () => {
  const dispatch = useDispatch();
  const { sellers, loading, pageNumber, pageSize, totalPages } = useSelector(
    (state) => state.sellersAdmin,
  );
  const [openDetail, setOpenDetail] = useState(false);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminSellers());
  }, [dispatch]);

  return (
    <div className="seller-manage">
      <div className="seller-manage__header">
        <div>
          <h1>Seller Management</h1>
          <p>Manage seller registrations and approvals.</p>
        </div>
        <button>
          Pending{" "}
          {sellers?.filter((x) => x.statusText === "PendingApproval").length}
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
                        src={
                          seller.verificationImageUrl ||
                          "https://i.pravatar.cc/100"
                        }
                        alt={seller.shopName}
                      />

                      <div>
                        <h4>{seller.shopName}</h4>
                        <span>{seller.userFullName}</span>
                      </div>
                    </div>
                  </td>

                  <td>{seller.userEmail}</td>

                  <td>
                    <span
                      className={`status ${seller.statusText.toLowerCase()}`}
                    >
                      {seller.statusText}
                    </span>
                  </td>

                  <td>
                    {new Date(seller.submittedAtUtc).toLocaleDateString(
                      "en-US",
                    )}
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        className="detail"
                        onClick={() => {
                          setSellerId(seller.id);
                          setOpenDetail(true);
                        }}
                      >
                        Detail
                      </button>

                      {seller.statusText === "PendingApproval" && (
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

      <SellerDetailModal
        open={openDetail}
        sellerId={sellerId}
        onClose={() => setOpenDetail(false)}
      />
    </div>
  );
};

export default SellerManage;
