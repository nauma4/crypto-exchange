import React from "react";

import { getValuteReserve } from "@/api/valutes";
import Spinner from "components/Spinner";

import styles from "./reserve.module.css";

export default function ReservePage() {
  const [isLoading, setLoading] = React.useState(false);
  const [valutes, setValutes] = React.useState(null);

  const loadData = async () => {
    setLoading(true);
    const request = await getValuteReserve();
    setValutes(request.result);
    setLoading(false);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  if (isLoading || !valutes) return <Spinner className={styles.loading} />;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.title}>Резервы</p>
        </div>
        <div className={styles.body}>
          {valutes.map((index, item) => (
            <div className={styles.valute} key={item._id}>
              <img src={item.image} className={styles.image} alt={item.name} />
              <span className={styles.value}>
                {item.reserve} {item.key}
              </span>
              <span className={styles.name}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
