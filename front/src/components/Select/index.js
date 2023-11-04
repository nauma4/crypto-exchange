import React from "react";

import styles from "./select.module.css";
import clsx from "clsx";
import { useOnClickOutside } from "helpers/useOnClickOutside";

export default function Select({
	className,
	value,
	list,
	onChange = () => {},
}) {
	const selectRef = React.useRef();
	const [isOpen, setOpen] = React.useState(false);

	const toggleDropdown = () => setOpen((value) => !value);

	useOnClickOutside([selectRef], () => {
		setOpen(false);
	});

	const handleSelectItem = (item) => {
		return () => {
			onChange(item);
			setOpen(false);
		};
	};

	return (
		<div
			className={clsx(
				styles.select,
				{
					[styles.open]: isOpen,
					[styles.close]: !isOpen,
				},
				className
			)}
			ref={selectRef}
		>
			<div className={styles.input} onClick={toggleDropdown}>
				<div className={styles.value}>
					<div className={styles.image}>
						<img src={value.image} />
					</div>
					<span className={styles.text}>{value.name}</span>
				</div>
				<div className={clsx(styles.switch, styles.open)} />
			</div>

			<div className={styles.dropdown}>
				<div className={styles.list}>
					{list.map((item, index) => (
						<div
							className={clsx(styles.option, {
								[styles.disabled]: item.disabled,
							})}
							key={index}
							onClick={handleSelectItem(item)}
						>
							<div className={styles.image}>
								<img src={item.image} />
							</div>
							<span className={styles.text}>{item.name}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
