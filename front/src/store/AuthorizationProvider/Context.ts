import { createContext, useContext } from "react";

export type AuthUserTypes = {
  email: string;
  fullName: string;
  login: string;
};

export type AuthContextTypes = {
  isLogin: boolean;
  token: string | null;
  user: AuthUserTypes | null;
  requestLogin: (email: string, password: string) => Promise<void>;
  requestRegister: (email: string, password: string) => Promise<void>;
  updateUser: () => void;
};

export const AuthContext = createContext<AuthContextTypes>({
  isLogin: false,
  token: null,
  user: null,
  requestLogin: Promise.resolve,
  requestRegister: Promise.resolve,
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
