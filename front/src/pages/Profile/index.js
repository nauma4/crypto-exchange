import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import TextInput from "components/TextInput";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { useAlert } from "components/Alert";
import { getProfile, editProfile, editPassword } from "api/profile";

import styles from "./profile.module.css";

export default function ProfilePage() {
	const router = useRouter();
	const [cookies, removeCookies] = useCookies();
	const [isAuth, setAuth] = React.useState(false);
	const [navigation, setNavigation] = React.useState("edit");

	const menuClassName = (name) => {
		return clsx(styles.item, { [styles.active]: navigation === name });
	};

	const menuChange = (name) => {
		return () => {
			setNavigation(name);
		};
	};

	const menuLogout = () => {
		removeCookies("email");
		removeCookies("token");
		router.push("/");
	};

	React.useEffect(() => {
		if (cookies.token && cookies.token !== 'undefined') setAuth(true);
		else if (cookies.token && cookies.token === 'undefined') router.push('/')
	}, [cookies])

	if (!isAuth) return <Spinner className={styles.loading} />;

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.navigation}>
					<div className={styles.menu}>
						<span
							className={menuClassName("edit")}
							onClick={menuChange("edit")}
						>
							Редактирование профиля
						</span>
						<span
							className={menuClassName("security")}
							onClick={menuChange("security")}
						>
							Безопасность
						</span>
						<span
							className={menuClassName("transactions")}
							onClick={menuChange("transactions")}
						>
							История транзакций
						</span>
					</div>
					<span
						className={clsx(styles.item, styles.active)}
						onClick={menuLogout}
					>
						Выйти
					</span>
				</div>
				{navigation === "edit" && (
					<EditProfileContainer token={cookies.token} />
				)}
				{navigation === "security" && (
					<SecurityContainer token={cookies.token} />
				)}
				{navigation === "transactions" && (
					<TransactionsContainer token={cookies.token} />
				)}
			</div>
		</div>
	);
}

const EditProfileContainer = ({ token }) => {
	const { showAlert } = useAlert();
	const [isLoading, setLoading] = React.useState(true);
	const [login, setLogin] = React.useState("");
	const [fullName, setFullName] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [data, setData] = React.useState(null);

	const onLoad = async () => {
		setLoading(true);
		const result = await getProfile(token);
		setData(result);
		setFullName(result.general.fullName ?? "");
		setLogin(result.general.login ?? "");
		setPhoneNumber(result.general.phone_number ?? "");

		setLoading(false);
	};

	React.useEffect(() => {
		onLoad();
	}, []);

	const handleChange = async () => {
		setLoading(true);

		const payload = {
			login,
			mobile_number: phoneNumber,
			fullName,
		};
		const result = await editProfile(token, payload);
		if (!result.status) showAlert("Ошибка!", result?.message || result?.error);
		else showAlert("Успех!", "Данные успешно изменены!");
		setLoading(false);
	};

	if (!data) return <Spinner className={styles.loading} />;

	return (
		<div className={styles.body}>
			<TextInput
				placeholder="Полное имя"
				value={fullName}
				onChange={setFullName}
			/>
			<TextInput placeholder="Логин" value={login} onChange={setLogin} />
			<TextInput placeholder="Email" value={data.general.email} disabled />
			<TextInput
				placeholder="Номер телефона: +7"
				value={phoneNumber}
				onChange={setPhoneNumber}
			/>
			<TextInput
				label="Ваша реферальная ссылка:"
				value={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/?referal_id=${data.referal_link}`}
			/>
			<Button disabled={isLoading} onClick={handleChange}>
				Сохранить
			</Button>
		</div>
	);
};

const SecurityContainer = ({ token }) => {
	const { showAlert } = useAlert();
	const [isLoading, setLoading] = React.useState(false);
	const [newPass, setNewPass] = React.useState("");
	const [rNewPass, setRNewPass] = React.useState("");

	const handleSubmit = async () => {
		setLoading(true);
		if (newPass.length < 6 || rNewPass.length < 6)
			return showAlert("Ошибка!", "Пароль должен быть не менее 6 символов");
		if (newPass !== rNewPass)
			return showAlert("Ошибка!", "Пароли не совпадают");

		const result = await editPassword(token, { password: newPass })
		if (!result.status) showAlert("Ошибка!", result.message);
		else showAlert("Успех!", "Пароль успешно изменен!");

		setLoading(false);
	};

	return (
		<div className={styles.body}>
			<TextInput
				placeholder="Новый пароль"
				type="password"
				value={newPass}
				onChange={setNewPass}
			/>
			<TextInput
				placeholder="Повторите пароль"
				type="password"
				value={rNewPass}
				onChange={setRNewPass}
				showError={
					(newPass.length && rNewPass.length && newPass !== rNewPass) || null
				}
				errorMessage={"Пароли не совпадают"}
			/>
			<Button disabled={isLoading} onClick={handleSubmit}>
				{isLoading ? "Загрузка..." : "Сохранить"}
			</Button>
		</div>
	);
};

const TransactionsContainer = () => {
	const [isLoading, setLoading] = React.useState(true);
	const [data, setData] = React.useState([]);

	const onLoad = async () => {
		setLoading(true);

		setLoading(false);
	};

	React.useEffect(() => {
		onLoad();
	}, []);

	return <div className={styles.body}>
		<p>Список транзакций пуст...</p>
	</div>;
};
