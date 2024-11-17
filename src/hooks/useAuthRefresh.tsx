import { ACCESS_TOKEN_REFRESH_INTERVAL } from "@/lib/api";
import { api, useAuthStore } from "@/stores/user-store";
import { useEffect } from "react";
import * as jose from "jose";

export const useAuthRefresh = () => {
  useEffect(() => {
    const refreshTokenAndUser = async () => {
      const { setLoading, setUser, setAccessToken, setError } =
        useAuthStore.getState();

      try {
        setLoading(true);
        const response = await api.get<LoginAndSignUpResponse>("/auth/refresh");
        const { accessToken } = response.data;

        setAccessToken(accessToken);

        const user = jose.decodeJwt<User>(accessToken);
        setUser(user);
        setError(null);
      } catch (err) {
        setError("Session expired");
        setUser(null);
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial refresh
    refreshTokenAndUser();

    // Set up periodic refresh
    const intervalId = setInterval(
      refreshTokenAndUser,
      1000 * ACCESS_TOKEN_REFRESH_INTERVAL
    );

    return () => clearInterval(intervalId);
  }, []);
};
