import { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  Wallet as WalletIcon,
  Landmark,
} from "lucide-react";
import { sellerService } from "../../../service/sellerService";
import { formatCurrencyVN } from "../../../utils/fncUtils";
import FormWithDraw from "./FormWithDraw";
import { useNavigate } from "react-router-dom";

import "./style.scss";

const getApiErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Load wallet failed";

const normalizeTransactions = (payload) => ({
  items: Array.isArray(payload?.items)
    ? payload.items
    : Array.isArray(payload)
      ? payload
      : [],
  totalCount: payload?.totalCount ?? payload?.items?.length ?? 0,
  totalPages: payload?.totalPages ?? 1,
});

export default function SellerWallet() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [openWithDraw, setOpenWithDraw] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWallet = useCallback(async () => {
    setLoading(true);
    setError("");

    // Wallet
    try {
      const walletResponse = await sellerService.getWalletSeller();
      setWallet(walletResponse);
    } catch (err) {
      console.error("Wallet:", err);
      setError(getApiErrorMessage(err));
    }

    try {
      const bankAccountResponse = await sellerService.getSellerBankAccount();
      setBankAccount(bankAccountResponse);
    } catch (err) {
      setBankAccount(null);
    }

    // Transactions
    try {
      const transactionResponse =
        await sellerService.getWalletTransactionsSeller({
          page,
          pageSize: 20,
        });

      const transactionPayload = normalizeTransactions(transactionResponse);

      setTransactions(transactionPayload.items);
      setPagination({
        totalCount: transactionPayload.totalCount,
        totalPages: transactionPayload.totalPages,
      });
    } catch (err) {
      console.error("Transactions:", err);

      setTransactions([]);
      setPagination({
        totalCount: 0,
        totalPages: 1,
      });
    }

    setLoading(false);
  }, [page]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadWallet, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadWallet]);

  return (
    <div className="seller-wallet-page">
      <div className="seller-wallet-page__header">
        <div>
          <span>Seller Finance</span>
          <h1>Wallet</h1>
          <p>Balances and transaction history from backend.</p>
        </div>
        <div className="seller-wallet-page__actions">
          <button
            type="button"
            className="withdraw-btn"
            onClick={() => {
              if (!bankAccount?.id) {
                setError("Please add a bank account before requesting a withdrawal.");
                navigate("/seller/settings");
                return;
              }

              setOpenWithDraw(true);
            }}
          >
            <WalletIcon size={18} />
            Withdraw
          </button>

          <button
            className="refresh-btn"
            type="button"
            disabled={loading}
            onClick={loadWallet}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="seller-wallet-page__error">{error}</div>}

      <div className="seller-wallet-page__cards">
        <article className="wallet-card">
          <div className="wallet-card__icon">
            <WalletIcon size={26} />
          </div>

          <span>Available Balance</span>
          <strong>{formatCurrencyVN(wallet?.availableBalance ?? 0)}</strong>
        </article>

        <article className="wallet-card">
          <div className="wallet-card__icon">
            <WalletIcon size={26} />
          </div>

          <span>Pending Balance</span>
          <strong>{formatCurrencyVN(wallet?.pendingBalance ?? 0)}</strong>
        </article>

        <article className="wallet-card">
          <div className="wallet-card__icon">
            <WalletIcon size={26} />
          </div>

          <span>Withdrawn</span>
          <strong>{formatCurrencyVN(wallet?.withdrawnBalance ?? 0)}</strong>
        </article>
      </div>

      <div className="seller-wallet-page__table-card seller-wallet-page__payout-card">
        <div className="seller-wallet-page__table-header">
          <h2>Withdrawal Account</h2>
          <button type="button" className="refresh-btn" onClick={() => navigate("/seller/settings")}>
            <Landmark size={16} />
            Manage
          </button>
        </div>

        {bankAccount?.id ? (
          <div className="seller-wallet-page__state seller-wallet-page__state--account">
            <strong>{bankAccount.bankName}</strong>
            <span>{bankAccount.accountHolderName}</span>
            <span>{bankAccount.accountNumberMasked}</span>
          </div>
        ) : (
          <div className="seller-wallet-page__state">
            No bank account added.
          </div>
        )}
      </div>

      <div className="seller-wallet-page__table-card">
        <div className="seller-wallet-page__table-header">
          <h2>Transactions</h2>
          <span>{pagination.totalCount} records</span>
        </div>

        {loading ? (
          <div className="seller-wallet-page__state">Loading wallet...</div>
        ) : transactions.length === 0 ? (
          <div className="seller-wallet-page__state">
            No transactions found.
          </div>
        ) : (
          <div className="seller-wallet-page__table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.type || "--"}</td>
                    <td>
                      <span className="seller-wallet-page__badge">
                        {item.status || "--"}
                      </span>
                    </td>
                    <td>{item.description || "--"}</td>
                    <td>
                      <strong>{formatCurrencyVN(item.amount || 0)}</strong>
                    </td>
                    <td>
                      {item.createdAtUtc
                        ? new Date(item.createdAtUtc).toLocaleString("en-US")
                        : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="seller-wallet-page__pagination">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            Page {page} of {pagination.totalPages || 1}
          </span>
          <button
            type="button"
            disabled={page >= pagination.totalPages || loading}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {openWithDraw && (
          <div
            className="withdraw-modal"
            onClick={() => setOpenWithDraw(false)}
          >
            <div
              className="withdraw-modal__content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="withdraw-modal__close"
                onClick={() => setOpenWithDraw(false)}
              >
                ✕
              </button>

              <FormWithDraw
                bankAccount={bankAccount}
                onManageBankAccount={() => {
                  setOpenWithDraw(false);
                  navigate("/seller/settings");
                }}
                onSuccess={() => {
                  setOpenWithDraw(false);
                  loadWallet();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
