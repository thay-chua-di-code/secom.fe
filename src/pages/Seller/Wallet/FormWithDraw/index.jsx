import React from "react";
import { FileText, ArrowUpRight, Landmark, Wallet } from "lucide-react";
import "./style.scss";
import toast from "react-hot-toast";
import { sellerService } from "../../../../service/sellerService";

const FormWithDraw = ({ onSuccess, bankAccount, onManageBankAccount }) => {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    amount: "",
    reason: "",
  });

  const maskedAccountNumber = bankAccount?.accountNumberMasked || "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!bankAccount?.id) {
      toast.error("Please add a bank account before requesting a withdrawal.");
      onManageBankAccount?.();
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      return toast.error("Amount must be greater than 0.");
    }

    try {
      setLoading(true);
      const result = await sellerService.createWithDraw({
        bankAccountId: bankAccount.id,
        amount: Number(form.amount),
        reason: form.reason,
      });

      if (result?.success) {
        toast.success("Create withdraw successfully!");
        setForm({ amount: "", reason: "" });
        onSuccess?.();
      }
    } catch (e) {
      toast.error(
        e?.response?.data?.detail ||
          e?.response?.data?.message ||
          e.message,
      );
      if ((e?.message || "").includes("bank account")) {
        onManageBankAccount?.();
      }
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
          <p>Transfer your balance to your saved bank account.</p>
        </div>
      </div>

      <div className="form-group">
        <label>
          <Landmark size={18} />
          Withdraw to
        </label>

        {bankAccount?.id ? (
          <div className="withdraw-bank-summary">
            <strong>{bankAccount.bankName}</strong>
            <span>{maskedAccountNumber}</span>
            <p>{bankAccount.accountHolderName}</p>
            {bankAccount.branchName ? <small>{bankAccount.branchName}</small> : null}
            <button type="button" className="manage-bank-link" onClick={onManageBankAccount}>
              Manage Bank Account
            </button>
          </div>
        ) : (
          <div className="withdraw-bank-summary withdraw-bank-summary--empty">
            <p>No bank account added.</p>
            <button type="button" className="manage-bank-link" onClick={onManageBankAccount}>
              Add Bank Account
            </button>
          </div>
        )}
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
