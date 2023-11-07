import React from "react";

import styles from './footer.module.css'

export default function Footer() {
	const mail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@exchange.com'

	return (
		<div className={styles.footer}>
			<p>
      Copyright &copy; 2020-2023, FIRE EXCHANGE E-Currency Exchange Service
      <br />
      <br />
			<a href={'mailto:'+ mail}>{mail}</a>
      </p>
		</div>
	);
}
