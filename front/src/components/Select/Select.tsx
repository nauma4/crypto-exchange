import React from "react";
import clsx from "clsx";

import styles from "./select.module.scss";

import { useOnClickOutside } from "@/helpers/useOnClickOutside";

export interface SelectItemPropTypes {
  image?: string;
  name: string;
  disabled?: boolean;
}

export interface SelectPropTypes {
  className?: string;
  value: SelectItemPropTypes;
  list: Array<SelectItemPropTypes>;
  onChange?: (item: SelectItemPropTypes) => void;
}

export const SelectComponent: React.FC<SelectPropTypes> = ({
  className,
  value,
  list,
  onChange,
}) => {
  const selectRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  const toggleDropdown = () => setOpen((value) => !value);

  useOnClickOutside([selectRef], () => {
    setOpen(false);
  });

  const handleSelectItem = (item: SelectItemPropTypes) => {
    return () => {
      onChange?.(item);
      setOpen(false);
    };
  };

  return (
    <div
      className={clsx(
        styles.select,
        {
          [styles.open]: isOpen,
          [styles.close]: !isOpen,
        },
        className
      )}
      ref={selectRef}
    >
      <div className={styles.input} onClick={toggleDropdown}>
        <div className={styles.value}>
          <div className={styles.image}>
            <img src={value.image} />
          </div>
          <span className={styles.text}>{value.name}</span>
        </div>
        <div className={clsx(styles.switch, styles.open)} />
      </div>

      <div className={styles.dropdown}>
        <div className={styles.list}>
          {list.map((item: SelectItemPropTypes, index: number) => (
            <div
              className={clsx(styles.option, {
                [styles.disabled]: item.disabled,
              })}
              key={index}
              onClick={handleSelectItem(item)}
            >
              <div className={styles.image}>
                <img src={item.image} />
              </div>
              <span className={styles.text}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};