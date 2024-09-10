import React from "react";
import Head from "next/head";

import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";

import styles from "./layout.module.scss";

export interface LayoutMetadataProps {
	title?: string
	description?: string
}

export interface LayoutComponentPropTypes {
	metadata?: LayoutMetadataProps
	children?: React.ReactElement | React.ReactNode
}

export const LayoutComponent: React.FC<LayoutComponentPropTypes> = ({
	metadata = { title: "Fire Exchange", description: "" },
	children,
}): React.ReactElement => {
	const [isOpen, setOpen] = React.useState<boolean>(false);

	const toggleSidebar = () => setOpen((value) => !value);

	return (
		<div className={styles.layout}>
			<Head>
				<title>{metadata.title}</title>
				<link rel="icon" href="/meta/bitcoin.png" type="image/x-icon" />
			</Head>
			<Header toggleSidebar={toggleSidebar} />
			<div className={styles.content}>
				<Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
				<div className={styles.block}>{children}</div>
			</div>
			<Footer />
		</div>
	);
}

