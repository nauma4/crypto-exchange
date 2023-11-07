import { createContext, useContext, useState, useEffect } from "react";

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

export const FormProvider = ({ children }) => {
	const [isValid, setValid] = useState(true);

	const [valuteList, setValuteList] = useState(null);
	const [giveValute, setGiveValute] = useState(null);
	const [giveCount, setGiveCount] = useState("");
	const [email, setEmail] = useState("");

	const [getValute, setGetValute] = useState(null);
	const [getCount, setGetCount] = useState("");
	const [getValuteForms, setGetValuteForms] = useState([]);
	const [getValuteData, setGetValuteData] = useState({});

	const onChangeData = (name) => {
		return (value) => {
			setGetValuteData((data) => {
				return {
					...data,
					[name]: value,
				};
			});
		};
	};

	const calculateCount = (count, giveValute, getValute) => {
		if (!giveValute || !getValute) return null;

		// GENERAL COURSE
		let course = giveValute.course * 1.05
		// end
		let summGiveCount = +count * course;
		let summMinGiveCourse = course * giveValute.min_give
		
		let summGetCount = summGiveCount / getValute.course;
		let summMaxGetCourse = getValute.course * getValute.max_get
		let summMinGetCourse = getValute.course * getValute.min_give


		setGetCount(+summGetCount.toFixed(9));

		// console.log("------START--------");
		// console.log({ summGiveCount, giveValute });
		// console.log({ summGetCount, getValute });
		// console.log({ isValid });

		// console.log(summGiveCount < summMinGiveCourse, summGetCount > summMaxGetCourse, summGetCount < summMinGetCourse, summGetCount,  summMinGetCourse)

		if (summGiveCount < summMinGiveCourse || summGetCount > summMaxGetCourse || summGetCount > summMinGetCourse) {
			setValid(false);
		} else {
			setValid(true)
		}
	};

	useEffect(() => {
		calculateCount(giveCount, giveValute, getValute);
	}, [giveCount, giveValute, getValute]);


	return (
		<FormContext.Provider
			value={{
				valuteList,
				setValuteList,

				give: {
					count: giveCount,
					setCount: setGiveCount,
					valute: giveValute,
					setValute: setGiveValute,
					email: email,
					setEmail,
				},
				get: {
					count: getCount,
					setCount: setGetCount,
					valute: getValute,
					setValute: setGetValute,
					forms: getValuteForms,
					setForms: setGetValuteForms,
					data: getValuteData,
					onChangeData,
				},
				isValid,
				setValid,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export const useForms = () => useContext(FormContext);
