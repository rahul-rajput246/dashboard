import api from "../api/axios";
import type { AuthResponse, User } from "../types/auth";

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const register = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get<{ user: User }>("/auth/me");
  return data.user;
};
