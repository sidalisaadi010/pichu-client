import { create } from "zustand";

import { api } from "@/lib/api";

import * as jose from "jose";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  accessToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<LoginAndSignUpResponse>(
        "/auth/signin",
        credentials
      );
      const user = jose.decodeJwt<User>(response.data.accessToken);
      set({
        user,
        accessToken: response.data.accessToken,
        error: null,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Login failed",
        user: null,
        accessToken: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await api.get("/auth/logout");
      set({ user: null, accessToken: null });
    } catch (err) {
      console.error("Logout error:", err);
    }
  },
  signup: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const response = await api.post<LoginAndSignUpResponse>(
        "/auth/signup",
        credentials
      );
      const user = jose.decodeJwt<User>(response.data.accessToken);
      set({
        user,
        accessToken: response.data.accessToken,
        error: null,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Signup failed",
        user: null,
        accessToken: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

const setupAxiosInterceptors = () => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't tried to refresh token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Check if the current request is the refresh token request
          if (originalRequest.url !== "/auth/refresh") {
            // Try to refresh the token
            const response = await api.get("/auth/refresh");
            const { accessToken } = response.data;

            useAuthStore.getState().setAccessToken(accessToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          } else {
            // If the current request is the refresh token request, logout the user
            useAuthStore.getState().logout();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // If refresh token fails, logout user
          useAuthStore.getState().logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Initialize axios interceptors
setupAxiosInterceptors();

export const useAuth = () => {
  const { user, isLoading, error, login, logout, signup } = useAuthStore();

  return {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    api, // Expose the pre-configured axios instance
  };
};
