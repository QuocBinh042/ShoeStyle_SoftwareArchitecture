import { useAuth } from "../context/AuthContext";

export const useAuthToken = () => {
  const { user } = useAuth();
  return user;
};
