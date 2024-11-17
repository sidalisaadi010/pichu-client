import { useAuthStore } from "@/stores/user-store";
import axios from "axios";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const ACCESS_TOKEN_REFRESH_INTERVAL = 10 * 60 * 1000;
