import clsx from "clsx";

import styles from "./button.module.css";

export default function Button({ className, children, icon = undefined, color, onClick, ...props }) {
	return (
		<button
			className={clsx(styles.button, {
				[styles.red]: color === "red",
				[styles.light]: color === "light",
				[styles.none]: color === "none",
			}, className)}
			onClick={onClick}
			{...props}
		>
			{!!icon && <div className={styles.icon}>{icon}</div>}
			<span>{children}</span>
		</button>
	);
}
