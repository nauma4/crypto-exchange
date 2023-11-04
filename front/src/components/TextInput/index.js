import React from "react";

import styles from "./textinput.module.css";
import clsx from "clsx";

export default function TextInput({
	className,
	type = "text",
	placeholder,
	label,
	labelEnd,
	errorMessage,
	showError,
	value,
	onChange = () => {},
}) {
	const [isFocus, setFocus] = React.useState(false);

	const onFocus = () => setFocus(true);
	const abortFocus = () => setFocus(false);

	const onChangeText = (e) => {
		const value = e.target.value;

		onChange(value);
	};

	return (
		<div
			className={clsx(
				styles.input,
				{ [styles.isError]: showError, [styles.isFocus]: isFocus },
				className
			)}
		>
			<div className={styles.container}>
				{label && <span className={styles.label}>{label}</span>}
				<input
					type={type}
					placeholder={placeholder}
					className={styles.tag}
					onFocus={onFocus}
					onBlur={abortFocus}
					value={value}
					onChange={onChangeText}
				/>
				{labelEnd && <span className={styles.label}>{labelEnd}</span>}
			</div>
			{showError && <span className={styles.errorMessage}>{errorMessage}</span>}
		</div>
	);
}
