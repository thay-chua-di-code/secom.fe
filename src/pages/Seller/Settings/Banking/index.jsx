import React, { useState, useEffect } from "react";
import "./style.scss";
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
};

export default BankingSeller;
