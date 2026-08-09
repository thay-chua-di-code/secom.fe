import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Landmark, Save } from "lucide-react";
import { sellerService } from "../../../../service/sellerService";
import "./style.scss";

const initialForm = {
  bankName: "",
  bankCode: "",
  accountHolderName: "",
  accountNumber: "",
  branchName: "",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.message ||
  "Unable to save bank account.";

const maskAccountNumber = (value) => {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (trimmed.length <= 4) return trimmed;
  return `${"*".repeat(Math.max(trimmed.length - 4, 0))}${trimmed.slice(-4)}`;
};

export default function BankingSeller() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    let active = true;

    const loadBankAccount = async () => {
      try {
        setLoading(true);
        setError("");
        const account = await sellerService.getSellerBankAccount();
        if (!active) return;

        if (!account) {
          setHasAccount(false);
          setForm(initialForm);
          setError("");
          return;
        }

        setHasAccount(true);
        setForm({
          bankName: account.bankName ?? "",
          bankCode: account.bankCode ?? "",
          accountHolderName: account.accountHolderName ?? "",
          accountNumber: account.accountNumber ?? "",
          branchName: account.branchName ?? "",
        });
      } catch (loadError) {
        if (!active) return;
        const status = loadError?.response?.status;
        const message = loadError?.response?.data?.message || loadError?.message;

        if (status === 404 && /bank account not found/i.test(message || "")) {
          setHasAccount(false);
          setForm(initialForm);
          setError("");
          return;
        }

        setError("Unable to load bank account. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadBankAccount();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.bankName.trim()) {
      toast.error("Bank name is required.");
      return;
    }

    if (!form.accountHolderName.trim()) {
      toast.error("Account holder name is required.");
      return;
    }

    if (!form.accountNumber.trim()) {
      toast.error("Account number is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      const saved = await sellerService.upsertSellerBankAccount({
        bankName: form.bankName.trim(),
        bankCode: form.bankCode.trim() || null,
        accountHolderName: form.accountHolderName.trim(),
        accountNumber: form.accountNumber.trim(),
        branchName: form.branchName.trim() || null,
      });

      setHasAccount(true);
      setForm({
        bankName: saved?.bankName ?? form.bankName.trim(),
        bankCode: saved?.bankCode ?? form.bankCode.trim(),
        accountHolderName:
          saved?.accountHolderName ?? form.accountHolderName.trim(),
        accountNumber: saved?.accountNumber ?? form.accountNumber.trim(),
        branchName: saved?.branchName ?? form.branchName.trim(),
      });
      toast.success("Bank account saved successfully.");
    } catch (submitError) {
      const message = getErrorMessage(submitError);
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="settings-card seller-banking-settings">
      <div className="settings-card__header">
        <div>
          <h2>
            <Landmark size={22} />
            Bank Account
          </h2>
          <p>Used for seller withdrawals and payouts.</p>
        </div>
      </div>

      {loading ? (
        <div className="settings-state">Loading bank account...</div>
      ) : (
        <form className="settings-form" onSubmit={handleSubmit}>
          {error && <div className="settings-state settings-state--error">{error}</div>}

          {!error && !hasAccount && (
            <div className="settings-state">
              No bank account added yet. Add your payout account before creating a withdrawal.
            </div>
          )}

          {hasAccount && form.accountNumber && (
            <div className="seller-banking-settings__summary">
              <span>Current payout account</span>
              <strong>{form.bankName}</strong>
              <p>
                {form.accountHolderName} · {maskAccountNumber(form.accountNumber)}
              </p>
            </div>
          )}

          <label>
            <span>Bank name *</span>
            <input name="bankName" value={form.bankName} onChange={handleChange} maxLength={255} required />
          </label>

          <label>
            <span>Bank code</span>
            <input name="bankCode" value={form.bankCode} onChange={handleChange} maxLength={50} />
          </label>

          <label>
            <span>Account holder name *</span>
            <input name="accountHolderName" value={form.accountHolderName} onChange={handleChange} maxLength={255} required />
          </label>

          <label>
            <span>Account number *</span>
            <input name="accountNumber" type="text" value={form.accountNumber} onChange={handleChange} maxLength={100} required />
          </label>

          <label>
            <span>Branch name</span>
            <input name="branchName" value={form.branchName} onChange={handleChange} maxLength={255} />
          </label>

          <button type="submit" disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save Bank Account"}
          </button>
        </form>
      )}
    </section>
  );
}
