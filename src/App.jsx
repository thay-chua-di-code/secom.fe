import { useSelector, useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { setAuthToken, setLogoutHandler } from "./api/axiosClient";
import { logout } from "./redux/slice/authSlice";
function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setLogoutHandler(() => {
      dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  return <AppRoutes />;
}

export default App;
