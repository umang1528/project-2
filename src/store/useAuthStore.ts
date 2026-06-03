import { create } from 'zustand';
import { authApi } from '../api/auth.api';
import { setStoredToken } from '../api/axios';

interface AuthState {
  user: null | { id: string; name: string; email: string; role: string; avatar?: string };
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const initialToken = typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null;

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: initialToken,
  isAuthenticated: Boolean(initialToken),
  login: async (email, password) => {
    const response = await authApi.login(email, password);
    const payload = response?.data ?? {};
    set({
      user: payload.user ?? null,
      accessToken: payload.accessToken ?? null,
      isAuthenticated: Boolean(payload.accessToken),
    });
  },
  logout: async () => {
    await authApi.logout();
    setStoredToken(null);
    set({ user: null, accessToken: null, isAuthenticated: false });
  },
  refreshAuth: async () => {
    const response = await authApi.refresh();
    const token = response.data?.accessToken ?? response.data?.data?.accessToken;
    if (token) {
      setStoredToken(token);
      set({ accessToken: token, isAuthenticated: true });
    }
  },
}));
