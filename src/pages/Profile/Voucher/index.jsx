import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVouchers } from "../../../redux/slice/voucherSlice";
import VoucherCard from "../../../components/common/VoucherCard/index";
import "./style.scss";

export default function VoucherList() {
  const dispatch = useDispatch();

  const { vouchers, loading } = useSelector((state) => state.voucher);

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  return (
    <div className="voucher-content">
      <div className="voucher-content__header">
        <h2>My Vouchers</h2>

        <p>Manage and use available vouchers for your orders.</p>
      </div>

      {loading ? (
        <div className="voucher-loading">Loading vouchers...</div>
      ) : (
        <div className="voucher-list">
          {vouchers?.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      )}
    </div>
  );
}
