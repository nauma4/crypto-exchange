import clsx from "clsx";

import styles from "./spinner.module.css";

export default function Spinner({ className }) {
	return <div className={clsx(styles.spinner, className)}>&nbsp;</div>;
}
