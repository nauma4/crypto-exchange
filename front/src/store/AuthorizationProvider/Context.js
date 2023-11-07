import { createContext, useContext } from "react";

export const AuthContext = createContext({
	isLogin: false,
	token: null,
	user: null,
	requestLogin: () => {},
	requestRegister: () => {},
	updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
