import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addCartItem,
  updateCartItemQuantity,
  applyCartVoucher,
  calculateCheckoutSummary,
} from "../redux/slice/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const addItem = (payload) => dispatch(addCartItem(payload));
  const updateQuantity = (cartItemId, quantity) =>
    dispatch(updateCartItemQuantity({ cartItemId, quantity }));
  const applyVoucher = (code) => dispatch(applyCartVoucher(code));
  const calculateCheckout = () => dispatch(calculateCheckoutSummary());

  return {
    ...cartState,
    addItem,
    updateQuantity,
    applyVoucher,
    calculateCheckout,
  };
};
