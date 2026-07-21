import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const totalPages = Math.ceil(
    (vouchers?.length || 0) / ITEMS_PER_PAGE,
  );

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
      {loading ? (
        <div className="voucher-loading">
          Loading vouchers...
        </div>
      ) : vouchers?.length === 0 ? (
        <div className="voucher-empty">
          No vouchers available
        </div>
      ) : (
        <>
          <div className="voucher-list">
            {currentVouchers.map((voucher) => (
              <VoucherCard
                key={voucher.id}
                voucher={voucher}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="voucher-pagination">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
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
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}