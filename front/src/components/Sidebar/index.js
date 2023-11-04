import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Button from "../Button";

import styles from "./sidebar.module.css";

export default function SidebarMenu({ isOpen, toggleSidebar }) {
	const [cookies, setCookies] = useCookies();
	const [isAuth, setAuth] = React.useState(false);
	const router = useRouter();

	React.useEffect(() => {
		if (!!cookies.token && cookies.token !== "undefined") setAuth({
			email: cookies.email
		});
		else setAuth(false)
	}, [cookies]);

	return (
		<div className={clsx(styles.sidebar, { [styles.open]: isOpen })}>
			<div className={styles.close} onClick={toggleSidebar}>
				&#x2715;
			</div>
			<div className={styles.content}>
				<div className={styles.menu}>
					<Link
						href="/"
						className={clsx(styles.item, {
							[styles.active]: router.pathname === "/",
						})}
					>
						Обменять
					</Link>
					<Link
						href="/reserve"
						className={clsx(styles.item, {
							[styles.active]: router.pathname === "/reserve",
						})}
					>
						Резерв
					</Link>
					<Link
						href="/parthners"
						className={clsx(styles.item, {
							[styles.active]: router.pathname === "/parthners",
						})}
					>
						Партнерам
					</Link>
					<Link
						href="/faq"
						className={clsx(styles.item, {
							[styles.active]: router.pathname === "/faq",
						})}
					>
						FAQ
					</Link>
				</div>
				<div className={styles.account}>
					{isAuth ? (
						<Button color="red" onClick={() => router.push("/profile")}>
							{isAuth.email.split("@")[0].toUpperCase() || "User"}
						</Button>
					) : (
						<>
							<Button
								color="red"
								icon={<img src="/images/header/reg.svg" />}
								onClick={() => router.push("/register")}
							>
								Регистрация
							</Button>
							<Button
								color="light"
								icon={<img src="/images/header/login.svg" />}
								onClick={() => router.push("/login")}
							>
								Вход
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
