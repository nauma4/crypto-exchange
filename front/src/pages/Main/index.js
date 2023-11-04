import React from "react";
import { useCookies } from "react-cookie";

import Select from "components/Select";
import TextInput from "components/TextInput";
import Button from "components/Button";
import Spinner from "components/Spinner";
import { useAlert } from "components/Alert";
import { moneyMask } from "helpers/displayCoinPrice";

import { getValuteList, getValuteForms } from "api/valutes";
import { addTransaction } from "api/transactions";

import { useForms, FormProvider } from "./Form";

import styles from "./main.module.css";
import { useRouter } from "next/router";

export default function MainPage() {
	return (
		<FormProvider>
			<Main />
		</FormProvider>
	);
}

function Main() {
	const router = useRouter();
	const { showAlert } = useAlert();
	const [isLoading, setLoading] = React.useState(true);
	const { valuteList, setValuteList, give, get } = useForms();
	useReferal(router);

	React.useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		setLoading(true);
		const data = await getValuteList();
		setValuteList(data.result);
		setLoading(false);
	};

	const handleSubmit = async () => {
		setLoading(true);
		const payload = {
			give: {
				valute_id: give.valute.id,
				forms: {
					count: give.count,
				},
			},
			get: {
				valute_id: get.valute.id,
				forms: get.data,
			},
		};

		const response = await addTransaction(payload);
		setLoading(false);

		if (!response.status && response.error) {
			showAlert("Ошибка", response.message);
		} else {
			router.push(`/transactions/${response.result.id}`);
		}
	};

	if (!!isLoading && !valuteList) return <Spinner className={styles.loading} />;

	return (
		<div className={styles.main}>
			<div className={styles.inBlock}>
				<GiveTradeBlock data={valuteList.give} />
			</div>
			<div className={styles.outBlock}>
				{give.valute && (
					<GetTradeBlock
						data={valuteList.get}
						onSubmit={handleSubmit}
						isLoading={isLoading}
					/>
				)}
			</div>
		</div>
	);
}

const useReferal = (router) => {
	const referal_id = router.query?.referal_id;

	if (!referal_id || !window) return null;

	window.localStorage.setItem("referal", referal_id);
	router.push("/");
};

const GiveTradeBlock = ({ data }) => {
	const {
		give,
		give: { setValute, count, setCount, email, setEmail },
		get,
	} = useForms();

	const selectValute = React.useCallback(
		(item) => {
			if (item.id === get.valute.id) return null;
			setValute(item);
		},
		[get.valute]
	);

	React.useEffect(() => {
		setValute(data[0]);
	}, [data]);

	if (!give.valute) return <p>Loading...</p>;

	const filteredData = data.map((item) => ({
		...item,
		disabled: item.id === get.valute?.id,
	}));

	return (
		<div className={styles.tradeBlock}>
			<span className={styles.title}>Отдаю</span>
			<Select
				className={styles.select}
				value={give.valute}
				list={filteredData}
				onChange={selectValute}
			/>
			<TextInput
				labelEnd={give.valute.key}
				showError={false}
				errorMessage={"Number is invalid"}
				className={styles.address}
				value={count}
				onChange={setCount}
				type={"number"}
			/>
			<div className={styles.info}>
				<span className={styles.text}>
					От {give.valute.min_give} {give.valute.key}
				</span>
				<span className={styles.text}>
					Курс: 1 {give.valute.key} = {moneyMask(give.valute.course)} RUB
				</span>
			</div>
			<TextInput placeholder="Email" value={email} onChange={setEmail} />
		</div>
	);
};

function GetTradeBlock({ data, onSubmit, isLoading }) {
	const {
		give,
		get: {
			valute,
			setValute,
			count,
			setCount,
			forms,
			setForms,
			data: _data,
			onChangeData,
		},
		isValid,
	} = useForms();

	const loadForms = async () => {
		if (!valute) return null;
		const forms = await getValuteForms(valute.id, "get");
		setForms(forms.result);
	};

	const selectRandomValute = (data) => {
		if (!give.valute) return null;

		const selectedGiveValute = give.valute.id;
		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			if (item.id !== selectedGiveValute) {
				return setValute(item);
			}
		}
	};

	const selectValute = React.useCallback(
		(item) => {
			if (item.id === give.valute.id) return null;
			setValute(item);
		},
		[give.valute]
	);

	React.useEffect(() => {
		loadForms();
	}, [valute]);

	React.useEffect(() => {
		selectRandomValute(data);
	}, [data]);

	if (!valute) return <p>Loading...</p>;

	const filteredData = data.map((item) => ({
		...item,
		disabled: item.id === give.valute.id,
	}));

	return (
		<div className={styles.tradeBlock}>
			<span className={styles.title}>Получаю</span>
			<Select
				className={styles.select}
				value={valute}
				list={filteredData}
				onChange={selectValute}
			/>
			<TextInput
				labelEnd={valute.key}
				showError={false}
				errorMessage={"Number is invalid"}
				className={styles.address}
				value={count}
				disabled
				type={"number"}
			/>
			<div className={styles.info}>
				<span className={styles.text}>
					От {valute.min_give} до {valute.max_get}
				</span>
				<span className={styles.text}>
					Курс: 1 {valute.key} = {moneyMask(valute.course)} RUB
				</span>
			</div>
			{forms.map((input, index) => (
				<TextInput
					key={index}
					placeholder={input.title}
					value={_data[input.name]}
					onChange={onChangeData(input.name)}
				/>
			))}
			<span className={styles.accept}>
				При нажатии на кнопку "Обменять" Вы соглашаетесь c пользовательским
				соглашением и Политикой AML/KYC и KYT нашего ресурса
			</span>
			<Button
				color="red"
				onClick={!isLoading ? onSubmit : () => {}}
				disabled={!isValid}
			>
				{isLoading ? "Загрузка..." : "Обменять"}
			</Button>
		</div>
	);
}
