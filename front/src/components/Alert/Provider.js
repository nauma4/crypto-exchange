import React from "react";

import { Alert } from "./Alert";

export const AlertContext = React.createContext({
	isOpen: false,
	title: null,
	description: null,
	showAlert: (title, description) => {},
	onClose: () => {},
});

export const useAlert = () => React.useContext(AlertContext)

export const AlertProvider = ({ children }) => {
	const [isOpen, setOpen] = React.useState(false);
	const [data, setData] = React.useState({ title: '', description: '' });

	const showAlert = (title, description) => {
		setData({ title, description });
		setOpen(true);
	};

	const onClose = () => setOpen(false);

	return (
		<AlertContext.Provider
			value={{
				isOpen,
				title: data.title,
				description: data.description,
				showAlert,
				onClose,
			}}
		>
			{children}
			<Alert
				isOpen={isOpen}
				title={data.title}
				description={data.description}
				onClose={onClose}
			/>
		</AlertContext.Provider>
	);
};
