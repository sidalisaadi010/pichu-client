import axios from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const ACCESS_TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});
