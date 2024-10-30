interface User {
  id: number;
  email: string;
  username: string;
  role: string;
  activated_at: Date | null;
  token_version: number;
  createdAt: Date;
  updatedAt: Date;
  iat: number;
  exp: number;
}

interface LoginCredentialsBase {
  password: string;
}

type LoginCredentials = (
  | {
      email: string;
    }
  | {
      username: string;
    }
) &
  LoginCredentialsBase;

type SignupCredentials = {
  email: string;
  userName: string;
  password: string;
};

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  accessToken: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

interface LoginAndSignUpResponse {
  accessToken: string;
  refreshToken: string;
}
