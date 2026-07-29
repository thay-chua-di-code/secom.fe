import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerBankAccounts } from "../../../../redux/slice/seller/banking/bankingThunk";
import { Landmark, Wallet, FileText, ArrowUpRight } from "lucide-react";
import "./style.scss";
import toast from "react-hot-toast";
import { sellerService } from "../../../../service/sellerService";

const FormWithDraw = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { bankAccounts } = useSelector((state) => state.sellerBanking);

  const [form, setForm] = useState({
    bankAccountId: "",
    amount: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchSellerBankAccounts());
  }, [dispatch]);

  useEffect(() => {
    if (bankAccounts?.length > 0) {
      setForm((prev) => ({
        ...prev,
        bankAccountId: bankAccounts[0].id,
      }));
    }
  }, [bankAccounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!form.bankAccountId) {
      return toast.error("Please select a bank account.");
    }

    if (!form.amount || Number(form.amount) <= 0) {
      return toast.error("Amount must be greater than 0.");
    }

    try {
      const result = await sellerService.createWithDraw({
        ...form,
        amount: Number(form.amount),
      });

      if (result.data.success) {
        toast.success("Create withdraw successfully!");
        setLoading(false);
        setForm({
          bankAccountId: bankAccounts?.[0]?.id || "",
          amount: "",
          reason: "",
        });
        onSuccess?.();
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="withdraw-form" onSubmit={handleSubmit}>
      <div className="withdraw-header">
        <div className="icon">
          <Wallet size={28} />
        </div>

        <div>
          <h2>Withdraw Money</h2>
          <p>Transfer your balance to your bank account.</p>
        </div>
      </div>

      <div className="form-group">
        <label>
          <Landmark size={18} />
          Bank Account
        </label>

        <select
          name="bankAccountId"
          value={form.bankAccountId}
          onChange={handleChange}
          disabled={loading}
        >
          {bankAccounts?.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.bankName} • {bank.accountNumberMasked} •{" "}
              {bank.accountHolderName}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <Wallet size={18} />
          Amount
        </label>

        <input
          type="number"
          min={1000}
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Enter withdrawal amount"
        />
      </div>

      <div className="form-group">
        <label>
          <FileText size={18} />
          Reason
        </label>

        <textarea
          rows={4}
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Withdrawal reason..."
        />
      </div>

      <button className="withdraw-btn" disabled={loading} type="submit">
        <ArrowUpRight size={20} />
        {loading ? "Processing..." : "Withdraw"}
      </button>
    </form>
  );
};

export default FormWithDraw;
