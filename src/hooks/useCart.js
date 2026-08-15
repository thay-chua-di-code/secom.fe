import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  updateCartItemQuantity,
  applyCartVoucher,
  removeCartVoucher,
  calculateCheckoutSummary,
} from "../redux/slice/cartSlice";

/**
 * Hook exposing cart state and actions.
 * No automatic fetch - callers decide when to load.
 * Returns: items, loading, error, and action creators.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  const {
    cart,
    items,
    loading,
    error,
    voucherCode,
    subtotal,
    discountAmount,
    finalTotal,
    checkoutSummary,
    actionLoading,
  } = cartState;

  // Action creators - caller can invoke when needed
  const addItem = (payload) => dispatch(addCartItem(payload));
  const updateQuantity = (cartItemId, quantity) =>
    dispatch(updateCartItemQuantity({ cartItemId, quantity }));
  const applyVoucher = (code) => dispatch(applyCartVoucher(code));
  const removeVoucher = () => dispatch(removeCartVoucher());
  const calculateCheckout = (cartItemIds) =>
    dispatch(calculateCheckoutSummary({ cartItemIds }));

  return {
    // State
    cart,
    items,
    loading,
    error,
    voucherCode,
    subtotal,
    discountAmount,
    finalTotal,
    checkoutSummary,
    actionLoading,
    // Actions
    addItem,
    updateQuantity,
    applyVoucher,
    removeVoucher,
    calculateCheckout,
  };
};
