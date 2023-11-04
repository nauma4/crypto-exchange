import React from "react";
import { useRouter } from "next/router";

import styles from "./confirmation.module.css";

import Button from "components/Button";
import TextInput from "components/TextInput";
import Spinner from "components/Spinner";

import { getTransaction } from "api/transactions";


export default function ConfirmationPage() {
  const router = useRouter();

	const [isLoading, setLoading] = React.useState(true);
	const [transaction, setTransaction] = React.useState(null);

	const loadData = async (id) => {
    if (!id) return null;
    setLoading(true)
    const request = await getTransaction(id)
    setTransaction(request.result)
    setLoading(false)
  };

  const handleSubmit = () => {
    router.push(`/pay/${transaction.id}`)
  }

  React.useEffect(() => {
      loadData(router.query.id)
  }, [router.query])

  if (!transaction && isLoading) return <Spinner className={styles.loading} />;

  const t = transaction

	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<div className={styles.title}>
					<span className={styles.order}>Заявка #{transaction.order_id}</span>
					<span className={styles.message}>
						Курс фиксируется на 35 минут с момента оформления заявки.
					</span>
				</div>

				<div className={styles.trade}>
					<div className={styles.item}>
						<img
							src={t.give.image}
							className={styles.image}
						/>
						<span className={styles.count}>{t.give.count}</span>
						<span className={styles.valute}>{t.give.key}</span>
					</div>
					<div className={styles.icon}></div>
					<div className={styles.item}>
						<img
							src={t.get.image}
							className={styles.image}
						/>
						<span className={styles.count}>{t.get.course}</span>
						<span className={styles.valute}>{t.get.key}</span>
					</div>
				</div>

				<span className={styles.course}>1 {t.give.key} = {t.give.course} RUB</span>

				<div className={styles.props}>
					<div className={styles.item}>
						<span className={styles.label}>Реквизиты отправителя</span>
						<TextInput label="Email" value="romka.nauma@gmail.com" />
					</div>
					<div className={styles.item}>
						<span className={styles.label}>Реквизиты получателя</span>
						{t.get.forms.map(form => (
              <TextInput label={form.title} value={form.text} />
            ))}
					</div>
				</div>
			</div>
			<Button className={styles.submit} color='red' onClick={handleSubmit}>Перейти к оплате</Button>
		</div>
	);
}
