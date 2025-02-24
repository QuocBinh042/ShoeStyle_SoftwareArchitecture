import { useAuth } from "../context/AuthContext";

export const useAuthToken = () => {
  const { user, loading } = useAuth();
  return { user, loading };
};
