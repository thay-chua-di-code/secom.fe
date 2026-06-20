import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import homeReducer from "./slice/homeSlice";
import notificationReducer from "./slice/notificationSlice";
import orderReducer from "./slice/orderSlice";
import voucherReducer from "./slice/voucherSlice";
// [ADMIN] Import
import {
  dashboardReducer,
  userAdminReducer,
  productAdminReducer,
  orderAdminReducer,
} from "./slice/admin";
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },

    setItem(_key, value) {
      return Promise.resolve(value);
    },

    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  // [AUTH]
  auth: authReducer,
  // [USER]
  user: userReducer,
  cart: cartReducer,
  home: homeReducer,
  order: orderReducer,
  notification: notificationReducer,
  voucher: voucherReducer,
  // [ADMIN]
  dashboardAdmin: dashboardReducer,
  usersAdmin: userAdminReducer,
  productsAdmin: productAdminReducer,
  ordersAdmin: orderAdminReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
