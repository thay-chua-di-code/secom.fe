import React, { useState, useEffect } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { Plus, Landmark } from "lucide-react";
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
      <div className="banking-card">
        <div className="banking-header">
          <div>
            <h2>Bank Accounts</h2>

            <p>Manage your withdrawal bank accounts.</p>
          </div>

          <Button
            className="add-bank-btn"
            onClick={() => setShowBankModal(true)}
          >
            <Plus size={18} />
            Add Account
          </Button>
        </div>

        {loading ? (
          <div className="bank-loading">
            {[1, 2, 3].map((item) => (
              <div className="bank-skeleton" key={item}></div>
            ))}
          </div>
        ) : bankAccounts.length === 0 ? (
          <div className="empty-bank">
            <Landmark size={45} />

            <h3>No bank accounts</h3>

            <p>Add a bank account to receive payments.</p>
          </div>
        ) : (
          <div className="bank-list">
            {bankAccounts.map((bank) => (
              <div className="bank-item" key={bank.id}>
                <div className="bank-icon">
                  <Landmark size={24} />
                </div>

                <div className="bank-content">
                  <h3>{bank.bankName}</h3>

                  <span>{bank.accountNumberMasked}</span>

                  <p>{bank.accountHolderName}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showBankModal && (
        <div className="modal-overlay" onClick={() => setShowBankModal(false)}>
          <div className="bank-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Bank Account</h2>

            <form onSubmit={handleCreateBank}>
              <div className="form-group">
                <label>Bank Name</label>

                <input
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Ex: Vietcombank"
                  required
                />
              </div>

              <div className="form-group">
                <label>Account Number</label>

                <input
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="0123456789"
                  required
                />
              </div>

              <div className="form-group">
                <label>Account Holder</label>

                <input
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Nguyen Van A"
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BankingSeller;
