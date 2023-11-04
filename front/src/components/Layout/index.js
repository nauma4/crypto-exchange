import React from "react";
import Head from "next/head";
import { CookiesProvider } from 'react-cookie';
import { AlertProvider } from "../Alert";

import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import styles from "./layout.module.css";

export default function Layout({
	metadata = { title: "Fire Exchange", description: "" },
	children,
}) {
	const [isOpen, setOpen] = React.useState(false)

	const toggleSidebar = () => setOpen((value) => !value)

	return (
		<CookiesProvider>
			<AlertProvider>
				<div className={styles.layout}>
					<Head>
						<title>{metadata.title}</title>
						<link rel="icon" href="/meta/bitcoin.png" type="image/x-icon"/>
					</Head>
					<Header toggleSidebar={toggleSidebar} />
					<div className={styles.content}>
						<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
						<div className={styles.block}>{children}</div>
					</div>
					<Footer />
				</div>
			</AlertProvider>
		</CookiesProvider>
	);
}
