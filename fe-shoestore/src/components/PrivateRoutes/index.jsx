import { Navigate, Outlet } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";

function PrivateRoutes() {
  const  user = useAuthToken();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
