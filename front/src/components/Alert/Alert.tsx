import React from "react";
import clsx from "clsx";

import { useOnClickOutside } from "@/helpers/useOnClickOutside";
import { AlertContextPropTypes } from "./Provider";

import styles from "./alert.module.scss";

export const Alert: React.FC<AlertContextPropTypes> = ({
  isOpen,
  title,
  description,
  onClose,
}): React.ReactNode => {
  const ref: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();

  useOnClickOutside(ref, onClose);

  return (
    <div className={clsx(styles.alert, { [styles.show]: isOpen })}>
      <div className={styles.modal} ref={ref}>
        <div className={styles.close} onClick={onClose}>
          &#x2715;
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
    </div>
  );
};
