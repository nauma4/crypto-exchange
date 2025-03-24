import React from "react";
import clsx from 'clsx';
import { useRouter } from "next/router";

import Input from "components/Input";
import { getTransaction } from "@/api/transactions";

import styles from "./pay.module.css";

export default function PayPage() {
	const router = useRouter();

	const [isLoading, setLoading] = React.useState(true);
	const [transaction, setTransaction] = React.useState(null);

	const loadData = async (id) => {
		if (!id) return null;
		setLoading(true);
		const request = await getTransaction(id);
		setTransaction(request.result);
		setLoading(false);
	};

	const getStatusText = status => {
		if (status === 0) return 'Ожидает оплаты'
		if (status === 1) return 'Выполнена'
		if (status === 2) return 'В процессе выплаты'
		if (status === 3) return 'Что-то не так'
		if (status === 4) return 'Закрыта'
		return 'Ошибка'
	}

	React.useEffect(() => {
		loadData(router.query.id);
	}, [router.query]);

	if (!transaction && isLoading) return <p>Loading...</p>;

	const t = transaction;
	

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.header}>
					<div className={styles.data}>
						<p className={styles.title}>Заявка #{t.order_id}</p>
						<p className={clsx(styles.status, {
							[styles.red]: t.status === 0 || t.status === 3 || t.status === 4,
							[styles.blue]: t.status === 1 || t.status === 2,
						})}>
							Статус: <span>{getStatusText(t.status)}</span>
						</p>
						{/* <p className={styles.datetime}>
							Врем зафиксированного курса: <b>1:25</b>
						</p> */}
					</div>
					<div className={styles.image}>
						<img src={t.get.image} />
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.message}>
						<div className={styles.icon}></div>
						<span className={styles.text}>
							Обмен происходит автоматически, сообщать об оплате не нужно
						</span>
					</div>

					<span className={styles.send_message}>
						Отправьте <b>{t.give.key}</b> на указанный адрес{" "}
						<b>или отсканируйте QR-код</b>
					</span>

					<Input
						label="Сумма:"
						value={`${t.give.count} ${t.give.key}`}
						copypaste
					/>
					{t.wallet.map((wallet) => (
						<Input label={wallet.name + ':'} value={wallet.text} copypaste />
					))}
				</div>
			</div>
		</div>
	);
}
