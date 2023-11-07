import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAlert } from "components/Alert";
import TextInput from "components/TextInput";
import Button from "components/Button";
import { useAuth } from "store/AuthorizationProvider";
import { validateEmail } from "helpers/email";

import styles from "./login.module.css";

export default function LoginPage() {
	const router = useRouter();
	const { showAlert } = useAlert();
	const { isLogin, requestLogin } = useAuth();

	const [isLoading, setLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = async () => {
		setLoading(true);
		if (!validateEmail(email) || password.length < 6) return null;

		const response = await requestLogin(email, password);
		if (!response.status) {
			showAlert("Ошибка", response.message);
		} else {
			router.push("/");
		}
		setLoading(false);
	};

	React.useEffect(() => {
		if (isLogin) router.push("/");
	}, [isLogin]);

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.block}>
					<div className={styles.content}>
						<span className={styles.title}>Вход</span>
						<TextInput placeholder="Email" value={email} onChange={setEmail} />
						<TextInput
							placeholder="Пароль"
							type="password"
							value={password}
							onChange={setPassword}
						/>
					</div>
					<div className={styles.footer}>
						<Button color="red" onClick={handleSubmit} disabled={isLoading}>
							{isLoading ? "Загрузка..." : "Войти"}
						</Button>
						<span className={styles.label}>
							Нет аккаунта? &nbsp;{" "}
							<Link href="/register">Зарегестрироватся</Link>
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
