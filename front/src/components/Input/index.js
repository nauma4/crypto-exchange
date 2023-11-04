import React from "react";

import styles from './input.module.css'

export default function Input ({ label, value, iconEnd }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <div className={styles.block}>
        <input className={styles.input} value={value} />
        <div className={styles.icon}></div>
      </div>
    </div>
  )
}