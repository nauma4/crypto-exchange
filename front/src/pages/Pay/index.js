import React from "react";
import { useRouter } from "next/router";

import Input from "components/Input";
import { getTransaction } from "api/transactions";

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
						<p className={styles.status}>
							Статус: <span>Ожидает оплаты</span>
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
