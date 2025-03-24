import { createContext, useContext } from "react";

export const FormContext = createContext({
	valuteList: { give: [], get: [] },
	setValuteList: () => {},

	give: {
		setValutes: () => {},
		count: "",
		setCount: () => {},
		valute: null,
		setValute: () => {},
		email: null,
		setEmail: () => {},
	},
	get: {
		setValutes: () => {},
		count: "",
		setCount: () => {},
		valute: null,
		setValute: () => {},
		forms: [],
		setForms: () => {},
		data: {},
		onChangeData: () => {},
	},
	isValid: true,
	setValid: () => {},
});

export const useForms = () => useContext(FormContext);