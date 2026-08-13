import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Landmark, Save } from "lucide-react";
import { sellerService } from "../../../../service/sellerService";
import "./style.scss";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { Plus, Landmark, CreditCard, X } from "lucide-react";
import {
  createSellerBankAccount,
  fetchSellerBankAccounts,
} from "../../../../redux/slice/seller/banking/bankingThunk";
import Button from "../../../../components/common/Button/Button";

const BankingSeller = () => {
  const dispatch = useDispatch();

  const [showBankModal, setShowBankModal] = useState(false);

  const { bankAccounts, loading } = useSelector((state) => state.sellerBanking);

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateBank = async (e) => {
    e.preventDefault();

    await dispatch(createSellerBankAccount(formData));

    dispatch(fetchSellerBankAccounts());

    setShowBankModal(false);

    setFormData({
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
    });
  };

  React.useEffect(() => {
    dispatch(fetchSellerBankAccounts());
  }, [dispatch]);

  return (
    <>
      <div className="seller-banking-page">
        <div className="banking-card">
          {/* HEADER */}
          <div className="banking-header">
            <div className="banking-title">
              <div className="title-icon">
                <Landmark size={22} />
              </div>

              <div>
                <h2>Bank Accounts</h2>
                <p>Manage your withdrawal bank accounts.</p>
              </div>
            </div>

            <Button
              className="add-bank-btn"
              onClick={() => setShowBankModal(true)}
            >
              <Plus size={17} />
              <span>Add Account</span>
            </Button>
          </div>

          {/* CONTENT */}
          <div className="banking-body">
            {loading ? (
              <div className="bank-loading">
                {[1, 2, 3].map((item) => (
                  <div className="bank-skeleton" key={item} />
                ))}
              </div>
            ) : bankAccounts.length === 0 ? (
              <div className="empty-bank">
                <div className="empty-bank-icon">
                  <Landmark size={34} />
                </div>

                <h3>No bank accounts</h3>

                <p>
                  You haven't added any bank account yet.
                  <br />
                  Add an account to receive withdrawal payments.
                </p>

                <button
                  className="empty-add-btn"
                  onClick={() => setShowBankModal(true)}
                >
                  <Plus size={17} />
                  Add Bank Account
                </button>
              </div>
            ) : (
              <div className="bank-table-wrapper">
                <div className="bank-table-header">
                  <div>Bank</div>
                  <div>Account Number</div>
                  <div>Account Holder</div>
                </div>

                <div className="bank-list">
                  {bankAccounts.map((bank) => (
                    <div className="bank-item" key={bank.id}>
                      <div className="bank-column bank-name-column">
                        <div className="bank-icon">
                          <Landmark size={21} />
                        </div>

                        <div>
                          <span className="mobile-label">Bank</span>
                          <h3>{bank.bankName}</h3>
                        </div>
                      </div>

                      <div className="bank-column">
                        <span className="mobile-label">Account Number</span>

                        <span className="account-number">
                          {bank.accountNumberMasked}
                        </span>
                      </div>

                      <div className="bank-column">
                        <span className="mobile-label">Account Holder</span>

                        <span className="account-holder">
                          {bank.accountHolderName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showBankModal && (
        <div
          className="bank-modal-overlay"
          onClick={() => setShowBankModal(false)}
        >
          <div className="bank-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bank-modal-header">
              <div>
                <h2>Add Bank Account</h2>
                <p>Add a bank account for withdrawal payments.</p>
              </div>

              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowBankModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateBank}>
              <div className="form-group">
                <label>
                  Bank Name <span>*</span>
                </label>

                <input
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Ex: Vietcombank"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Account Number <span>*</span>
                </label>

                <input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Account Holder <span>*</span>
                </label>

                <input
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Ex: Nguyen Van A"
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowBankModal(false)}
                >
                  Cancel
                </button>

                <button className="save-btn" type="submit">
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
=======

const initialForm = {
  bankName: "",
  bankCode: "",
  accountHolderName: "",
  accountNumber: "",
  branchName: "",
>>>>>>> 9e502702ff9ba4aeca9f9b97ace2ce4b63aad286
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
