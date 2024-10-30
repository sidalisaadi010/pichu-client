'use client'
import { ACCESS_TOKEN_REFRESH_INTERVAL, api } from "@/lib/api";
import {  useAuthStore } from "@/stores/user-store";
import { useEffect } from "react";
import * as jose from "jose";



export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  useAuthRefresh(); // This sets up automatic token refresh
  return <>{children}</>;
}

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
        ACCESS_TOKEN_REFRESH_INTERVAL
      );
  
      return () => clearInterval(intervalId);
    }, []);
  };