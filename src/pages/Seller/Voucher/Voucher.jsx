import { useState } from "react";
import Button from "../../../components/common/Button/Button";
import AddVoucherModal from "./FormAdd";

const Vouchers = () => {
  const [openAdd, setOpenAdd] = useState(false);

  // const dispatch = useDispatch();
  // const { vouchers, loading } = useSelector(
  //   (state) => state.sellerVoucher,
  // );

  // useEffect(() => {
  //   dispatch(fetchSellerVouchers());
  // }, [dispatch]);

  // if (loading) return <h3>Loading...</h3>;

  const vouchers = []; // Demo

  return (
    <div>
      <div className="page-header">
        <h1>Voucher Management</h1>

        <Button onClick={() => setOpenAdd(true)}>Add Voucher</Button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Discount</th>
              <th>Min Order</th>
              <th>Quantity</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {vouchers?.map((item) => (
              <tr key={item.id}>
                <td>{item.code}</td>

                <td>{item.name}</td>

                <td>
                  {item.discountType === "PERCENT"
                    ? `${item.discountValue}%`
                    : `${item.discountValue.toLocaleString()} VNĐ`}
                </td>

                <td>{item.minOrderAmount.toLocaleString()} VNĐ</td>

                <td>{item.quantity}</td>

                <td>{new Date(item.startAtUtc).toLocaleDateString("vi-VN")}</td>

                <td>{new Date(item.endAtUtc).toLocaleDateString("vi-VN")}</td>

                <td>
                  {new Date(item.endAtUtc) > new Date() ? "Active" : "Expired"}
                </td>

                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}

            {vouchers?.length === 0 && (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  No vouchers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openAdd && (
        <AddVoucherModal open={openAdd} onClose={() => setOpenAdd(false)} />
      )}
    </div>
  );
};

export default Vouchers;
