import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react";

import { fetchVouchers } from "../../../redux/slice/voucherSlice";
import VoucherCard from "../../../components/common/VoucherCard/index";

import "./style.scss";

const ITEMS_PER_PAGE = 6;

export default function VoucherList() {
  const dispatch = useDispatch();

  const { vouchers, loading } = useSelector((state) => state.voucher);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  const totalPages = Math.ceil((vouchers?.length || 0) / ITEMS_PER_PAGE);

  const currentVouchers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex = startIndex + ITEMS_PER_PAGE;

    return vouchers?.slice(startIndex, endIndex) || [];
  }, [vouchers, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handlePrevious = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNext = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <div className="voucher-content">
      <div className="voucher-content__header">
        <div>
          <span className="voucher-content__eyebrow">AVAILABLE VOUCHERS</span>

          <h3>Your vouchers</h3>

          <p>Save more on eligible purchases with available offers.</p>
        </div>

        {!loading && vouchers?.length > 0 && (
          <span className="voucher-content__count">{vouchers.length}</span>
        )}
      </div>

      {loading ? (
        <div className="voucher-loading">
          <span className="voucher-loading__spinner" />

          <strong>Loading vouchers</strong>

          <p>Finding available offers for you...</p>
        </div>
      ) : vouchers?.length === 0 ? (
        <div className="voucher-empty">
          <div className="voucher-empty__icon">
            <Ticket size={24} />
          </div>

          <h3>No vouchers available</h3>

          <p>
            New vouchers and special offers will appear here when available.
          </p>
        </div>
      ) : (
        <>
          <div className="voucher-list">
            {currentVouchers.map((voucher, index) => (
              <div
                key={voucher.id}
                className="voucher-list__item"
                style={{
                  "--voucher-index": index,
                }}
              >
                <VoucherCard voucher={voucher} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="voucher-pagination">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={14} />
                Previous
              </button>

              <div className="page-info">
                <span>Page</span>

                <strong>{currentPage}</strong>

                <span>of</span>

                <strong>{totalPages}</strong>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
