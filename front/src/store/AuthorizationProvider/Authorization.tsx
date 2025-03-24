import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext, AuthUserTypes } from "./Context";
import { login, register } from "@/api/authorization";
import { getProfile } from "@/api/profile";

type AuthorizationProviderPropTypes = {
  children: React.ReactNode;
};

export const AuthorizationProvider: React.FC<
  AuthorizationProviderPropTypes
> = ({ children }) => {
  const [cookies, setCookie] = useCookies();

  const [isLogin, setLogin] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserTypes | null>(null);

  const requestLogin = async (email: string, password: string) => {
    const response = await login(email, password);
    if (response.status) {
      const token = response.result.token;
      setCookie("token", token);
      setToken(token);
      setLogin(true);
    }
    return response;
  };

  const requestRegister = async (email: string, password: string) => {
    const response = await register(email, password);
    if (response.status) {
      const token = response.result.token;
      setCookie("token", token);
      setToken(token);
      setLogin(true);
    }
    return response;
  };

  const updateUser = async () => {
    const response = await getProfile(token);
    setUser(response.general);
    return response;
  };

  useEffect(() => {
    updateUser();
  }, [token]);

  useEffect(() => {
    if (cookies.token && cookies.token.length) {
      setToken(cookies.token);
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [cookies]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        token,
        user,
        requestLogin,
        requestRegister,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
