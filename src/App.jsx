import { useSelector, useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { setAuthToken, setLogoutHandler } from "./api/axiosClient";
import { logout } from "./redux/slice/authSlice";
import { resetSellerStatus } from "./redux/slice/sellerStatusSlice";
import { clearUserInfo, getMyInfoThunk } from "./redux/slice/userSlice";
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

  return <AppRoutes />;
}

export default App;
