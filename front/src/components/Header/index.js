import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

import Button from "../Button";

import styles from "./header.module.css";

const Header = ({ toggleSidebar }) => {
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
		<div className={styles.header}>
			<div className={styles.burder} onClick={toggleSidebar}></div>
			<div className={styles.header__top}>
				<Link className={styles.logo} href="/"></Link>
				<div className={styles.info}>
					<span className={styles.automate}>Автоматический обмен</span>
					<span className={styles.i24_7}>Тех. поддержка</span>
				</div>
				{isAuth ? (
					<div className={styles.menu}>
						<Button color="red" onClick={() => router.push("/profile")}>
							{isAuth.email.split("@")[0].toUpperCase() || "User"}
						</Button>
					</div>
				) : (
					<div className={styles.menu}>
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
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
