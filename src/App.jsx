import { useSelector } from "react-redux";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { setAuthToken } from "./api/axiosClient";
function App() {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);
  return <AppRoutes />;
}

export default App;


