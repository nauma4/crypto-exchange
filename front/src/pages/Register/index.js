import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import TextInput from "components/TextInput";
import Button from "components/Button";
import { useAlert } from "components/Alert";

import { register } from "api/authorization";

import styles from "./register.module.css";

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export default function RegisterPage() {
	const router = useRouter();
	const { showAlert } = useAlert();
	const [cookies, setCookie] = useCookies();

	const [isLoading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [rePassword, setRePassword] = React.useState("");

	const handleSubmit = async () => {
		setLoading(true);
		if (!validateEmail(email) || password !== rePassword || password.length < 6)
			return null;

		const referal = window.localStorage.getItem('referal') || null;

		const response = await register(email, password, referal);
		if (!response.status) {
			showAlert("Ошибка", response.message);
		} else {
			setCookie("email", response.result.email);
			setCookie("token", response.result.token);
			router.push("/");
		}
		setLoading(false);
	};

	React.useEffect(() => {
		if (cookies.token && cookies.token !== 'undefined') router.push("/");
	}, [cookies]);

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.block}>
					<div className={styles.content}>
						<span className={styles.title}>Регистрация</span>
						<TextInput
							placeholder="Email"
							value={email}
							onChange={setEmail}
							errorMessage={"Неверный формат"}
							showError={(email.length && !validateEmail(email)) || false}
						/>
						<TextInput
							placeholder="Пароль"
							type="password"
							value={password}
							onChange={setPassword}
							errorMessage={"Пароль должен быть не меньше 6 символов"}
							showError={(password.length && password.length < 6) || false}
						/>
						<TextInput
							placeholder="Повторите пароль"
							type="password"
							value={rePassword}
							onChange={setRePassword}
							errorMessage={"Пароли не совпадают"}
							showError={
								(password.length &&
									rePassword.length &&
									password !== rePassword) ||
								false
							}
						/>
					</div>
					<div className={styles.footer}>
						<Button color="red" onClick={handleSubmit} disabled={isLoading}>
							{isLoading ? "Загрузка..." : "Зарегестрироватся"}
						</Button>
						<span className={styles.label}>
							Уже есть аккаунт? &nbsp; <Link href="/login">Войти</Link>
						</span>
					</div>
				</div>
				<div className={styles.cover}>
					<div className={styles.logo}></div>
					<span className={styles.title}>Доступные функции в аккаунте:</span>
					<span className={styles.description}>
						- история обменов <br />
						- бонусная программа <br />
						- проверка криптовалюты <br />
						- настройки моментальных обменов <br />
					</span>
					<span className={styles.caption}>
						С авторизацией обмены станут удобными и выгодными
					</span>
				</div>
			</div>
		</div>
	);
}
