import clsx from "clsx";

import styles from "./spinner.module.scss";

export interface SpinnerPropTypes {
	className?: string
}

export default function Spinner({ className }: SpinnerPropTypes) {
	return <div className={clsx(styles.spinner, className)}>&nbsp;</div>;
}
