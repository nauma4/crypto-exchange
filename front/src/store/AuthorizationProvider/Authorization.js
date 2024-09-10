import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "./Context";
import { login, register } from '@/api/authorization'
import { getProfile } from '@/api/profile'

export const AuthorizationProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies();

  const [isLogin, setLogin] = useState(false);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const requestLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.status) {
      const token = response.result.token
      setCookie("token", token);
      setToken(token)
      setLogin(true)
    }
    return response
  };

	const requestRegister = async (email, password, referal) => {
    const response = await register(email, password, referal);
    if (response.status) {
      const token = response.result.token
      setCookie("token", token);
      setToken(token)
      setLogin(true)
    }
    return response
  };

	const updateUser = async () => {
    const response = await getProfile(token);
    setUser(response.general);
    return response
  };

  useEffect(() => {
    updateUser()
  }, [token])

  useEffect(() => {
    if (cookies.token && cookies.token.length) {
      setToken(cookies.token);
      setLogin(true)
    } else {
      setLogin(false)
    }
  }, [cookies])

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
