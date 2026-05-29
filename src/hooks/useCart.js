import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addCartItem,
  updateCartItemQuantity,
  applyCartVoucher,
  calculateCheckoutSummary,
} from "../redux/slice/cartSlice";

/**
 * Hook exposing cart state and actions.
 * It automatically fetches the cart when the user is authenticated.
 * The returned object also includes a `refetch` method for manual refresh
 * (used by the header dropdown) and all cart‑related thunks for the Cart page.
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);

  // Initial fetch when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  // Manual refresh – useful for dropdown open event
  const refetch = () => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  };

  // Expose action creators for cart page
  const addItem = (payload) => dispatch(addCartItem(payload));
  const updateQuantity = (cartItemId, quantity) =>
    dispatch(updateCartItemQuantity({ cartItemId, quantity }));
  const applyVoucher = (code) => dispatch(applyCartVoucher(code));
  const calculateCheckout = () => dispatch(calculateCheckoutSummary());

  const {
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

  return {
    items,
    loading,
    error,
    voucherCode,
    subtotal,
    discountAmount,
    finalTotal,
    checkoutSummary,
    actionLoading,
    refetch,
    // Cart page helpers
    addItem,
    updateQuantity,
    applyVoucher,
    calculateCheckout,
  };
};
