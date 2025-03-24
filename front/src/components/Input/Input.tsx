import React from "react";

import styles from "./input.module.css";

export interface InputPropTypes {
  label?: string;
  value?: string;
}

export const InputComponent: React.FC<InputPropTypes> = ({
  label,
  value,
}): React.ReactElement => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.block}>
        <input className={styles.input} value={value} />
        <div className={styles.icon}></div>
      </div>
    </div>
  );
};
