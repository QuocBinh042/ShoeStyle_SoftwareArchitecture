import { Navigate, Outlet } from "react-router-dom";
import { useAuthToken } from "../../hooks/useAuthToken";

function PrivateRoutes() {
  const { user, loading } = useAuthToken();
  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
