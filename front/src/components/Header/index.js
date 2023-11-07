import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../Button";
import { useAuth } from 'store/AuthorizationProvider'

import styles from "./header.module.css";

const Header = ({ toggleSidebar }) => {
	const router = useRouter();
	const { isLogin, user } = useAuth()

	return (
		<div className={styles.header}>
			<div className={styles.burder} onClick={toggleSidebar}></div>
			<div className={styles.header__top}>
				<Link className={styles.logo} href="/"></Link>
				<div className={styles.info}>
					<span className={styles.automate}>Автоматический обмен</span>
					<span className={styles.i24_7}>Тех. поддержка</span>
				</div>
				{isLogin ? (
					<div className={styles.menu}>
						<Button color="red" onClick={() => router.push("/profile")}>
							{user?.fullName || user?.login || user?.email || 'Загрузка...'}
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
