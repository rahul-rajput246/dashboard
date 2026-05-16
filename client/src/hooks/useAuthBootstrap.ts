import { useCallback } from "react";
import { getCurrentUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export const useAuthBootstrap = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const markHydrated = useAuthStore((state) => state.markHydrated);

  return useCallback(async () => {
    if (!token) {
      markHydrated();
      return;
    }

    try {
      const user = await getCurrentUser();
      setUser(user);
    } catch {
      logout();
    } finally {
      markHydrated();
    }
  }, [logout, markHydrated, setUser, token]);
};
