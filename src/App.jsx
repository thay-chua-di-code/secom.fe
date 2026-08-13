import { useSelector, useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { setAuthToken, setLogoutHandler } from "./api/axiosClient";
import { logout } from "./redux/slice/authSlice";
import { resetSellerStatus } from "./redux/slice/sellerStatusSlice";
import { clearUserInfo, getMyInfoThunk } from "./redux/slice/userSlice";
import signalrService from "./service/signalrService";
import {
  addNotificationLocal,
  deleteNotificationRealtime,
  markAllNotificationsReadRealtime,
  markNotificationReadRealtime,
} from "./redux/slice/notificationSlice";
import {
  productCreatedRealtime,
  productDeletedRealtime,
  productStockUpdatedRealtime,
  productUpdatedRealtime,
} from "./redux/slice/seller/product/sellerProduct";

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    setLogoutHandler(() => {
      dispatch(clearUserInfo());
      dispatch(resetSellerStatus());
      dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setAuthToken(token);

      if (!userInfo?.userId && !userInfo?.id) {
        dispatch(getMyInfoThunk());
      }
    }
  }, [dispatch, token, userInfo?.id, userInfo?.userId]);

  useEffect(() => {
    if (!token) {
      signalrService.stopConnection().catch(() => {});
      return;
    }

    let disposed = false;

    const connect = async () => {
      try {
        await signalrService.startConnection(() =>
          localStorage.getItem("token") || token || "",
        );

        if (disposed) return;

        signalrService.on("NotificationCreated", (payload) => {
          dispatch(addNotificationLocal(payload));
        });

        signalrService.on("NotificationRead", (payload) => {
          dispatch(markNotificationReadRealtime(payload?.notificationId));
        });

        signalrService.on("NotificationsReadAll", () => {
          dispatch(markAllNotificationsReadRealtime());
        });

        signalrService.on("NotificationDeleted", (payload) => {
          dispatch(deleteNotificationRealtime(payload?.notificationId));
        });

        signalrService.on("ProductCreated", (payload) => {
          dispatch(productCreatedRealtime(payload));
        });

        signalrService.on("ProductUpdated", (payload) => {
          dispatch(productUpdatedRealtime(payload));
        });

        signalrService.on("ProductDeleted", (payload) => {
          dispatch(productDeletedRealtime(payload));
        });

        signalrService.on("ProductStockUpdated", (payload) => {
          dispatch(productStockUpdatedRealtime(payload));
        });
      } catch {
        // keep REST flows working when SignalR is unavailable
      }
    };

    connect();

    return () => {
      disposed = true;
      signalrService.stopConnection().catch(() => {});
    };
  }, [dispatch, token]);

  return <AppRoutes />;
}

export default App;
