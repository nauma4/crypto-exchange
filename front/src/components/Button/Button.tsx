import clsx from "clsx";

import styles from "./button.module.scss";

export enum ButtonColors {
  red = 'red',
  light = 'light',
  none = 'none',
}

export interface ButtonPropTypes {
  className?: string
  children?: string | React.ReactNode | React.ReactElement
  icon?: React.ReactNode
  color?: ButtonColors
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const ButtonComponent: React.FC<ButtonPropTypes> = ({ className, children, icon = undefined, color, onClick, ...props }) => {
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
};
